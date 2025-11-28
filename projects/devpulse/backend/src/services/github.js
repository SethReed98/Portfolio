const axios = require('axios');
const { getCache, setCache } = require('../utils/redis');

class GitHubService {
  constructor() {
    this.baseURL = 'https://api.github.com';
    this.apiVersion = '2022-11-28';
  }

  /**
   * Get user's GitHub activity with smart caching
   * Cache contribution graph for 24 hours, recent activity for 1 hour
   */
  async getUserActivity(username, accessToken) {
    const cacheKey = `github:activity:${username}`;

    // Check cache first
    const cached = await getCache(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    try {
      // Fetch multiple endpoints in parallel
      const [commits, pullRequests, issues, profile] = await Promise.all([
        this.getRecentCommits(username, accessToken),
        this.getPullRequests(username, accessToken),
        this.getIssues(username, accessToken),
        this.getUserProfile(username, accessToken)
      ]);

      const activity = {
        commits: commits.total,
        pullRequests: pullRequests.total,
        issues: issues.total,
        repositories: profile.public_repos,
        followers: profile.followers,
        following: profile.following,
        contributionGraph: await this.getContributionGraph(username, accessToken),
        recentActivity: this.combineRecentActivity(commits.items, pullRequests.items, issues.items),
        topLanguages: await this.getTopLanguages(username, accessToken)
      };

      // Cache for 1 hour (3600 seconds)
      await setCache(cacheKey, JSON.stringify(activity), 3600);

      return activity;
    } catch (error) {
      console.error('GitHub API error:', error.response?.data || error.message);
      throw new Error('Failed to fetch GitHub activity');
    }
  }

  async getRecentCommits(username, accessToken) {
    // Get commits from the last 30 days
    const since = new Date();
    since.setDate(since.getDate() - 30);

    const response = await axios.get(`${this.baseURL}/search/commits`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': this.apiVersion
      },
      params: {
        q: `author:${username} committer-date:>${since.toISOString()}`,
        per_page: 100,
        sort: 'committer-date',
        order: 'desc'
      }
    });

    return {
      total: response.data.total_count,
      items: response.data.items.slice(0, 20) // Last 20 commits
    };
  }

  async getPullRequests(username, accessToken) {
    const response = await axios.get(`${this.baseURL}/search/issues`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': this.apiVersion
      },
      params: {
        q: `author:${username} type:pr`,
        per_page: 100,
        sort: 'created',
        order: 'desc'
      }
    });

    return {
      total: response.data.total_count,
      items: response.data.items.slice(0, 20)
    };
  }

  async getIssues(username, accessToken) {
    const response = await axios.get(`${this.baseURL}/search/issues`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': this.apiVersion
      },
      params: {
        q: `author:${username} type:issue`,
        per_page: 100,
        sort: 'created',
        order: 'desc'
      }
    });

    return {
      total: response.data.total_count,
      items: response.data.items.slice(0, 20)
    };
  }

  async getUserProfile(username, accessToken) {
    const response = await axios.get(`${this.baseURL}/users/${username}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': this.apiVersion
      }
    });

    return response.data;
  }

  /**
   * Get contribution graph data (commits by day)
   * This would typically use GitHub's GraphQL API for better data
   */
  async getContributionGraph(username, accessToken) {
    const cacheKey = `github:contributions:${username}`;

    // Cache contribution graph for 24 hours since it doesn't change often
    const cached = await getCache(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // GraphQL query for contribution graph
    const query = `
      query($userName:String!) {
        user(login: $userName){
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    const response = await axios.post(
      'https://api.github.com/graphql',
      {
        query,
        variables: { userName: username }
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const contributions = response.data.data.user.contributionsCollection.contributionCalendar;

    // Cache for 24 hours
    await setCache(cacheKey, JSON.stringify(contributions), 86400);

    return contributions;
  }

  async getTopLanguages(username, accessToken) {
    // Get user's repositories
    const response = await axios.get(`${this.baseURL}/users/${username}/repos`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': this.apiVersion
      },
      params: {
        per_page: 100,
        sort: 'updated',
        direction: 'desc'
      }
    });

    // Count languages across all repos
    const languageCounts = {};
    response.data.forEach(repo => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
    });

    // Sort by count and return top 5
    return Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([language, count]) => ({ language, count }));
  }

  /**
   * Combine and sort recent activity from all sources
   */
  combineRecentActivity(commits, pullRequests, issues) {
    const activities = [];

    commits.forEach(commit => {
      activities.push({
        type: 'commit',
        date: commit.commit.committer.date,
        message: commit.commit.message,
        url: commit.html_url,
        repo: commit.repository?.full_name
      });
    });

    pullRequests.forEach(pr => {
      activities.push({
        type: 'pull_request',
        date: pr.created_at,
        title: pr.title,
        url: pr.html_url,
        state: pr.state
      });
    });

    issues.forEach(issue => {
      activities.push({
        type: 'issue',
        date: issue.created_at,
        title: issue.title,
        url: issue.html_url,
        state: issue.state
      });
    });

    // Sort by date (most recent first) and return top 20
    return activities
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 20);
  }

  /**
   * Check rate limit status to avoid hitting limits
   */
  async checkRateLimit(accessToken) {
    const response = await axios.get(`${this.baseURL}/rate_limit`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github+json'
      }
    });

    return response.data.rate;
  }
}

module.exports = new GitHubService();
