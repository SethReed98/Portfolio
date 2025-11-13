<section id="about" class="about">
	<div class="container">
		<div class="content">
			<div class="intro">
				<h1>Hi, I'm <span class="highlight">Seth Reed</span></h1>
				<h2 class="subtitle">Software Engineer</h2>
				<p class="description">
					I'm a passionate software engineer who loves building intuitive and performant applications.
					I specialize in full-stack development with a focus on creating seamless user experiences
					and scalable backend solutions.
				</p>
				<p class="description">
					I enjoy working with modern technologies and constantly learning new skills to stay at
					the forefront of web development. When I'm not coding, you can find me contributing to
					open source projects or exploring new frameworks and tools.
				</p>
			</div>

			<div class="contact-info">
				<h3>Get in Touch</h3>
				<div class="contact-items">
					<div class="contact-item">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
							<polyline points="22,6 12,13 2,6"></polyline>
						</svg>
						<a href="mailto:sethreed8886@gmail.com">sethreed8886@gmail.com</a>
					</div>
					<div class="contact-item">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
							<circle cx="12" cy="10" r="3"></circle>
						</svg>
						<span>Flint, Michigan, USA</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.about {
		padding: var(--spacing-2xl) var(--spacing-md);
		min-height: calc(100vh - 70px);
		display: flex;
		align-items: center;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
	}

	.content {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--spacing-xl);
	}

	.intro h1 {
		margin-bottom: var(--spacing-sm);
		font-size: 3rem;
	}

	.highlight {
		color: var(--color-primary);
		position: relative;
	}

	.subtitle {
		color: var(--color-text-secondary);
		font-weight: 600;
		margin-bottom: var(--spacing-lg);
		font-size: 1.5rem;
	}

	.description {
		font-size: 1.1rem;
		color: var(--color-text-secondary);
		max-width: 700px;
		line-height: 1.8;
	}

	.contact-info {
		padding: var(--spacing-lg);
		background-color: var(--color-surface);
		border-radius: 12px;
		border: 1px solid var(--color-border);
	}

	.contact-info h3 {
		margin-bottom: var(--spacing-md);
		color: var(--color-text);
	}

	.contact-items {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.contact-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		color: var(--color-text-secondary);
	}

	.contact-item svg {
		flex-shrink: 0;
		color: var(--color-primary);
	}

	.contact-item a {
		color: var(--color-text);
		transition: color var(--transition-fast);
	}

	.contact-item a:hover {
		color: var(--color-primary);
	}

	@media (max-width: 768px) {
		.about {
			padding: var(--spacing-xl) var(--spacing-md);
			min-height: auto;
		}

		.intro h1 {
			font-size: 2rem;
		}

		.subtitle {
			font-size: 1.25rem;
		}

		.description {
			font-size: 1rem;
		}
	}
</style>
