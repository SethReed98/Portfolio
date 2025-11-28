<script lang="ts">
	let name = '';
	let email = '';
	let message = '';
	let status: 'idle' | 'sending' | 'success' | 'error' = 'idle';
	let errorMessage = '';

	async function handleSubmit(e: Event) {
		e.preventDefault();
		status = 'sending';
		errorMessage = '';

		try {
			// Using Formspree - user will need to replace with their own form ID
			// or can use mailto as fallback
			const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name, email, message })
			});

			if (response.ok) {
				status = 'success';
				name = '';
				email = '';
				message = '';
				setTimeout(() => {
					status = 'idle';
				}, 5000);
			} else {
				throw new Error('Failed to send message');
			}
		} catch (error) {
			status = 'error';
			errorMessage = 'Failed to send message. Please try again or email me directly.';
		}
	}
</script>

<section id="contact" class="contact">
	<div class="container">
		<h2>Get In Touch</h2>
		<p class="contact-intro">
			Have a project in mind or want to chat about opportunities? Drop me a message and I'll get
			back to you as soon as I can.
		</p>

		<form on:submit={handleSubmit} class="contact-form">
			<div class="form-group">
				<label for="name">Name</label>
				<input
					type="text"
					id="name"
					bind:value={name}
					required
					placeholder="Your name"
					disabled={status === 'sending'}
				/>
			</div>

			<div class="form-group">
				<label for="email">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					required
					placeholder="your.email@example.com"
					disabled={status === 'sending'}
				/>
			</div>

			<div class="form-group">
				<label for="message">Message</label>
				<textarea
					id="message"
					bind:value={message}
					required
					placeholder="Tell me about your project or opportunity..."
					rows="6"
					disabled={status === 'sending'}
				></textarea>
			</div>

			{#if status === 'success'}
				<div class="alert alert-success">
					Thanks for reaching out! I'll get back to you soon.
				</div>
			{/if}

			{#if status === 'error'}
				<div class="alert alert-error">
					{errorMessage}
				</div>
			{/if}

			<button type="submit" class="btn-primary" disabled={status === 'sending'}>
				{status === 'sending' ? 'Sending...' : 'Send Message'}
			</button>
		</form>

		<div class="contact-note">
			<p>
				<strong>Note:</strong> You can also reach me directly via email or LinkedIn using the links in
				the header.
			</p>
		</div>
	</div>
</section>

<style>
	.contact {
		padding: 4rem 0;
	}

	.contact-intro {
		text-align: center;
		max-width: 600px;
		margin: 1rem auto 3rem;
		color: var(--text-secondary);
		font-size: 1.1rem;
	}

	.contact-form {
		max-width: 600px;
		margin: 0 auto;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		color: var(--text-primary);
	}

	input,
	textarea {
		width: 100%;
		padding: 0.75rem;
		border: 2px solid var(--border-color);
		border-radius: 8px;
		background: var(--bg-secondary);
		color: var(--text-primary);
		font-size: 16px; /* prevents iOS zoom */
		font-family: inherit;
		transition: border-color 0.3s ease;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--primary-color);
	}

	input:disabled,
	textarea:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	textarea {
		resize: vertical;
		min-height: 120px;
	}

	.btn-primary {
		width: 100%;
		padding: 1rem 2rem;
		background: var(--primary-color);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.btn-primary:hover:not(:disabled) {
		background: var(--primary-dark);
		transform: translateY(-2px);
	}

	.btn-primary:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		transform: none;
	}

	.alert {
		padding: 1rem;
		border-radius: 8px;
		margin-bottom: 1rem;
		text-align: center;
	}

	.alert-success {
		background: #d4edda;
		color: #155724;
		border: 1px solid #c3e6cb;
	}

	.alert-error {
		background: #f8d7da;
		color: #721c24;
		border: 1px solid #f5c6cb;
	}

	:global([data-theme='dark']) .alert-success {
		background: #1e4620;
		color: #9fdf9f;
		border-color: #2d5f2e;
	}

	:global([data-theme='dark']) .alert-error {
		background: #4a1e1e;
		color: #f5a3a3;
		border-color: #6b2c2c;
	}

	.contact-note {
		margin-top: 2rem;
		text-align: center;
		color: var(--text-secondary);
		font-size: 0.9rem;
	}

	@media (max-width: 768px) {
		.contact {
			padding: 3rem 0;
		}

		.contact-intro {
			font-size: 1rem;
			margin-bottom: 2rem;
		}

		.form-group {
			margin-bottom: 1.25rem;
		}
	}
</style>
