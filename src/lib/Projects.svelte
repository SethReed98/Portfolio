<script lang="ts">
	const projects = [
		{
			title: 'Color Memory Game',
			description: 'An interactive browser-based memory game inspired by Simon Says. Fully optimized for mobile with touch events, haptic feedback, and responsive design. Features progressive difficulty, sound effects using Web Audio API, and high score tracking with localStorage. Works seamlessly on all devices.',
			tags: ['JavaScript', 'Mobile-First', 'Web Audio API', 'Touch Events'],
			github: 'https://github.com/SethReed98/Portfolio/tree/main/projects/color-memory-game',
			demo: './projects/color-memory-game/index.html',
			isPlaceholder: false
		},
		{
			title: 'DevNotes - Markdown Editor',
			description: 'A lightweight, browser-based markdown editor with live preview. Mobile-optimized with touch-friendly interface and adaptive layout. Create, edit, and manage multiple notes with real-time markdown rendering. Features local storage persistence, markdown export, and works perfectly on mobile devices.',
			tags: ['JavaScript', 'LocalStorage API', 'Responsive', 'PWA-Ready'],
			github: 'https://github.com/SethReed98/Portfolio/tree/main/projects/devnotes',
			demo: './projects/devnotes/index.html',
			isPlaceholder: false
		},
		{
			title: 'WeatherNow Dashboard',
			description: 'A modern weather dashboard displaying current conditions and 5-day forecasts. Fully responsive with mobile-first design and touch-optimized controls. Built to demonstrate API integration skills and cross-platform compatibility. Currently runs in demo mode with sample data for popular cities worldwide.',
			tags: ['JavaScript', 'API Integration', 'Mobile-First', 'Responsive'],
			github: 'https://github.com/SethReed98/Portfolio/tree/main/projects/weather-dashboard',
			demo: './projects/weather-dashboard/index.html',
			isPlaceholder: false
		}
	];
</script>

<section id="projects" class="projects">
	<div class="container">
		<h2>Projects</h2>
		<p class="section-description">
			A collection of projects I've worked on, including web applications, games, and tools.
		</p>

		{#if projects.length === 0 || projects[0].isPlaceholder}
			<div class="coming-soon">
				<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
				</svg>
				<h3>Projects Coming Soon</h3>
				<p>I'm currently working on some exciting projects. Check back soon to see what I've been building!</p>
			</div>
		{/if}

		<div class="projects-grid">
			{#each projects as project}
				<article class="project-card">
					<div class="project-content">
						<h3 class="project-title">{project.title}</h3>
						<p class="project-description">{project.description}</p>

						<div class="project-tags">
							{#each project.tags as tag}
								<span class="tag">{tag}</span>
							{/each}
						</div>
					</div>

					<div class="project-links">
						<a href={project.github} target="_blank" rel="noopener noreferrer" class="project-link">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
							</svg>
							<span>Code</span>
						</a>

						{#if project.demo}
							<a href={project.demo} target="_blank" rel="noopener noreferrer" class="project-link primary">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
									<polyline points="15 3 21 3 21 9"></polyline>
									<line x1="10" y1="14" x2="21" y2="3"></line>
								</svg>
								<span>Live Demo</span>
							</a>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.projects {
		padding: var(--spacing-2xl) var(--spacing-md);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	h2 {
		text-align: center;
		margin-bottom: var(--spacing-sm);
	}

	.section-description {
		text-align: center;
		color: var(--color-text-secondary);
		margin-bottom: var(--spacing-xl);
		font-size: 1.1rem;
	}

	.coming-soon {
		text-align: center;
		padding: var(--spacing-2xl);
		background-color: var(--color-surface);
		border-radius: 12px;
		border: 2px dashed var(--color-border);
		margin-bottom: var(--spacing-xl);
	}

	.coming-soon svg {
		color: var(--color-primary);
		margin-bottom: var(--spacing-md);
	}

	.coming-soon h3 {
		color: var(--color-text);
		margin-bottom: var(--spacing-sm);
	}

	.coming-soon p {
		color: var(--color-text-secondary);
		margin-bottom: 0;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: var(--spacing-lg);
	}

	.project-card {
		background-color: var(--color-card-bg);
		border: 1px solid var(--color-border);
		border-radius: 12px;
		padding: var(--spacing-lg);
		display: flex;
		flex-direction: column;
		transition: transform var(--transition-base), box-shadow var(--transition-base);
	}

	.project-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 16px var(--color-shadow);
	}

	.project-content {
		flex: 1;
	}

	.project-title {
		margin-bottom: var(--spacing-sm);
		color: var(--color-text);
	}

	.project-description {
		color: var(--color-text-secondary);
		margin-bottom: var(--spacing-md);
		line-height: 1.6;
	}

	.project-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-xs);
		margin-bottom: var(--spacing-md);
	}

	.tag {
		padding: 0.25rem 0.75rem;
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 12px;
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--color-text-secondary);
	}

	.project-links {
		display: flex;
		gap: var(--spacing-sm);
		padding-top: var(--spacing-sm);
		border-top: 1px solid var(--color-border);
	}

	.project-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		border: 1px solid var(--color-border);
		border-radius: 6px;
		font-weight: 500;
		color: var(--color-text);
		transition: all var(--transition-fast);
	}

	.project-link:hover {
		background-color: var(--color-surface);
		transform: translateY(-2px);
	}

	.project-link.primary {
		background-color: var(--color-primary);
		color: white;
		border-color: var(--color-primary);
	}

	.project-link.primary:hover {
		background-color: var(--color-primary-hover);
		border-color: var(--color-primary-hover);
	}

	@media (max-width: 768px) {
		.projects {
			padding: var(--spacing-xl) var(--spacing-md);
		}

		.projects-grid {
			grid-template-columns: 1fr;
		}

		.project-links {
			flex-direction: column;
		}
	}
</style>
