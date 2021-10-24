<script context="module">
	export async function load({ session }) {
		console.log('session in auth', session);
		if (session) {
			return {
				status: 302,
				redirect: '/'
			};
		}
		return {};
	}
</script>

<script>
	import Login from '$lib/Login.svelte';
	import Signup from '$lib/Signup.svelte';
	let showLogin = true;
	const toggleShowLogin = () => {
		showLogin = !showLogin;
	};
</script>

<div>
	{#if showLogin}
		<Login {toggleShowLogin} />
	{:else}
		<Signup {toggleShowLogin} />
	{/if}
</div>
