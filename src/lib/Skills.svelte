<script lang="ts">
	const skills = [
		{
			category: 'Frontend Development',
			items: [
				{ name: 'JavaScript (ES6+)', icon: '🟨', level: 'Advanced' },
				{ name: 'TypeScript', icon: '🔷', level: 'Intermediate' },
				{ name: 'React', icon: '⚛️', level: 'Intermediate' },
				{ name: 'Svelte/SvelteKit', icon: '🔥', level: 'Intermediate' },
				{ name: 'HTML5 & CSS3', icon: '🎨', level: 'Advanced' }
			]
		},
		{
			category: 'Backend & Database',
			items: [
				{ name: 'Python', icon: '🐍', level: 'Intermediate' },
				{ name: 'PHP', icon: '🐘', level: 'Intermediate' },
				{ name: 'SQL (PostgreSQL/MySQL)', icon: '🗄️', level: 'Intermediate' },
				{ name: 'Node.js', icon: '💚', level: 'Intermediate' },
				{ name: 'RESTful APIs', icon: '🔌', level: 'Intermediate' }
			]
		},
		{
			category: 'Mobile & Modern Web',
			items: [
				{ name: 'Responsive Design', icon: '📱', level: 'Advanced' },
				{ name: 'Touch Events & Gestures', icon: '👆', level: 'Advanced' },
				{ name: 'Progressive Web Apps', icon: '⚡', level: 'Intermediate' },
				{ name: 'Web Audio API', icon: '🔊', level: 'Intermediate' },
				{ name: 'Performance Optimization', icon: '🚀', level: 'Intermediate' }
			]
		},
		{
			category: 'Tools & Workflow',
			items: [
				{ name: 'Git & GitHub', icon: '📦', level: 'Advanced' },
				{ name: 'VS Code', icon: '💻', level: 'Advanced' },
				{ name: 'Chrome DevTools', icon: '🔍', level: 'Advanced' },
				{ name: 'NPM/Package Managers', icon: '📦', level: 'Intermediate' },
				{ name: 'GitHub Actions/CI-CD', icon: '⚙️', level: 'Beginner' }
			]
		}
	];
</script>

<section id="skills" class="skills">
	<div class="container">
		<h2>Skills & Technologies</h2>
		<div class="skills-grid">
			{#each skills as category}
				<div class="category">
					<h3 class="category-title">{category.category}</h3>
					<div class="skills-list">
						{#each category.items as skill}
							<div class="skill-card">
								<span class="skill-icon">{skill.icon}</span>
								<div class="skill-info">
									<span class="skill-name">{skill.name}</span>
									<span class="skill-level {skill.level.toLowerCase()}">{skill.level}</span>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<div class="additional-skills">
			<h3>Additional Experience</h3>
			<div class="tags">
				<span class="tag">Vitest/Jest Testing</span>
				<span class="tag">Vite Build Tool</span>
				<span class="tag">Webpack</span>
				<span class="tag">Sass/SCSS</span>
				<span class="tag">Tailwind CSS</span>
				<span class="tag">Figma</span>
				<span class="tag">Postman/API Testing</span>
				<span class="tag">Agile/Scrum</span>
				<span class="tag">Accessibility (WCAG)</span>
				<span class="tag">SEO Optimization</span>
			</div>
		</div>
	</div>
</section>

<style>
	.skills {
		padding: var(--spacing-2xl) var(--spacing-md);
		background-color: var(--color-surface);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	h2 {
		text-align: center;
		margin-bottom: var(--spacing-xl);
	}

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-xl);
	}

	.category {
		background-color: var(--color-card-bg);
		border: 1px solid var(--color-border);
		border-radius: 12px;
		padding: var(--spacing-lg);
		transition: transform var(--transition-base), box-shadow var(--transition-base);
	}

	.category:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 16px var(--color-shadow);
	}

	.category-title {
		margin-bottom: var(--spacing-md);
		color: var(--color-primary);
		font-size: 1.25rem;
	}

	.skills-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.skill-card {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm);
		background-color: var(--color-surface);
		border-radius: 8px;
		transition: background-color var(--transition-fast);
	}

	.skill-card:hover {
		background-color: var(--color-border);
	}

	.skill-icon {
		font-size: 1.5rem;
		flex-shrink: 0;
	}

	.skill-info {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.skill-name {
		font-weight: 600;
		color: var(--color-text);
	}

	.skill-level {
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
		border-radius: 12px;
		font-weight: 500;
		white-space: nowrap;
	}

	.skill-level.advanced {
		background-color: #d4edda;
		color: #155724;
	}

	.skill-level.intermediate {
		background-color: #d1ecf1;
		color: #0c5460;
	}

	.skill-level.beginner {
		background-color: #fff3cd;
		color: #856404;
	}

	:global([data-theme='dark']) .skill-level.advanced {
		background-color: #1e4620;
		color: #9fdf9f;
	}

	:global([data-theme='dark']) .skill-level.intermediate {
		background-color: #1a4d5c;
		color: #9fdfee;
	}

	:global([data-theme='dark']) .skill-level.beginner {
		background-color: #5c4a1a;
		color: #ffe69f;
	}

	.additional-skills {
		text-align: center;
	}

	.additional-skills h3 {
		margin-bottom: var(--spacing-md);
		color: var(--color-text);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
		justify-content: center;
	}

	.tag {
		padding: 0.5rem 1rem;
		background-color: var(--color-card-bg);
		border: 1px solid var(--color-border);
		border-radius: 20px;
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--color-text-secondary);
		transition: all var(--transition-fast);
	}

	.tag:hover {
		background-color: var(--color-primary);
		color: white;
		border-color: var(--color-primary);
		transform: scale(1.05);
	}

	@media (max-width: 768px) {
		.skills {
			padding: var(--spacing-xl) var(--spacing-md);
		}

		.skills-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
