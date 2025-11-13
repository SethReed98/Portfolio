<script lang="ts">
	const skills = [
		{
			category: 'Frontend',
			items: [
				{ name: 'JavaScript', icon: '🟨' },
				{ name: 'TypeScript', icon: '🔷' },
				{ name: 'React', icon: '⚛️' }
			]
		},
		{
			category: 'Backend',
			items: [
				{ name: 'Python', icon: '🐍' },
				{ name: 'PHP', icon: '🐘' },
				{ name: 'SQL', icon: '🗄️' }
			]
		},
		{
			category: 'Mobile Development',
			items: [
				{ name: 'Responsive Design', icon: '📱' },
				{ name: 'Touch Events', icon: '👆' },
				{ name: 'Mobile-First CSS', icon: '🎨' }
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
								<span class="skill-name">{skill.name}</span>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<div class="additional-skills">
			<h3>Other Technologies</h3>
			<div class="tags">
				<span class="tag">Git</span>
				<span class="tag">REST APIs</span>
				<span class="tag">Databases</span>
				<span class="tag">PWA</span>
				<span class="tag">Web Audio API</span>
				<span class="tag">LocalStorage</span>
				<span class="tag">Agile</span>
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
	}

	.skill-name {
		font-weight: 600;
		color: var(--color-text);
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
