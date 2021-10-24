<script context="module">
	export async function load({ session }) {
		console.log('session in layout', session);
		if (session) {
			return {
				props: {
					userName: JSON.parse(session.userToken).userName
				}
			};
		}
		return {};
	}
</script>

<script>
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
	export let userName;
</script>

<Header {userName} />

<main>
	<slot />
</main>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
