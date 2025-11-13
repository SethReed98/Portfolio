<footer>
	<div class="container">
		<div class="footer-content">
			<p class="copyright">
				© {new Date().getFullYear()} Seth Reed. All rights reserved.
			</p>
			<p class="built-with">
				Built with <span class="heart">♥</span> using <a href="https://kit.svelte.dev" target="_blank" rel="noopener noreferrer">SvelteKit</a>
			</p>
		</div>
	</div>
</footer>

<style>
	footer {
		background-color: var(--color-surface);
		border-top: 1px solid var(--color-border);
		padding: var(--spacing-lg) var(--spacing-md);
		margin-top: auto;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.footer-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
	}

	p {
		margin: 0;
		color: var(--color-text-secondary);
		font-size: 0.9rem;
	}

	.heart {
		color: #e25555;
		animation: heartbeat 1.5s ease-in-out infinite;
	}

	@keyframes heartbeat {
		0%, 100% {
			transform: scale(1);
		}
		10%, 30% {
			transform: scale(1.1);
		}
		20%, 40% {
			transform: scale(1);
		}
	}

	.built-with a {
		color: var(--color-primary);
		font-weight: 600;
	}

	@media (max-width: 768px) {
		.footer-content {
			flex-direction: column;
			text-align: center;
		}
	}
</style>
