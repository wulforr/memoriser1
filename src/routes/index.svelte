<script context="module">
	export const prerender = true;
</script>

<script>
	import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>Memoriser</h1>
	<h2>An app to help you learn and remember german language by repititive learning.</h2>
	<button on:click={() => goto('learn')}>Let's get started</button>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
		font-size: 4rem;
	}
	button {
		padding: 0.75rem 1rem;
		border-radius: 4px;
	}
</style>
