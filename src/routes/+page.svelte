<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$lib/Header.svelte';
	import About from '$lib/About.svelte';
	import Skills from '$lib/Skills.svelte';
	import Projects from '$lib/Projects.svelte';
	import Footer from '$lib/Footer.svelte';

	let theme = $state('light');

	onMount(() => {
		// Load theme from localStorage
		const savedTheme = localStorage.getItem('theme') || 'light';
		theme = savedTheme;
		document.documentElement.setAttribute('data-theme', theme);
	});

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}
</script>

<div class="page">
	<Header {theme} {toggleTheme} />
	<main>
		<About />
		<Skills />
		<Projects />
	</main>
	<Footer />
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
	}
</style>
