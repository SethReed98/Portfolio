<script lang="ts">
	import '../app.css';
</script>

<svelte:head>
	<title>Portfolio | Software Engineer</title>
	<meta name="description" content="Software engineer portfolio showcasing projects in JavaScript, TypeScript, React, Python, and more." />
</svelte:head>

<div class="app">
	<slot />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
