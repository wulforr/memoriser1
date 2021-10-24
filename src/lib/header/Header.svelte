<script>
	import { page } from '$app/stores';
	export let userName;
</script>

<header>
	<div class="corner">
		<a href="/">
			<img src="Memoriser.png" alt="Memoriser" />
		</a>
	</div>

	<nav>
		<ul>
			<li class:active={$page.path === '/'}><a sveltekit:prefetch href="/">Home</a></li>
			<li class:active={$page.path === '/learn'}><a sveltekit:prefetch href="/learn">Learn</a></li>
			{#if userName}
				<li class:active={$page.path === '/profile'}>
					<a sveltekit:prefetch href="/profile">{userName}</a>
				</li>
			{:else}
				<li class:active={$page.path === '/auth'}><a sveltekit:prefetch href="/auth">Login</a></li>
			{/if}
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		background: rgba(255, 255, 255);
	}

	.corner {
		width: 3rem;
		height: 3rem;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: var(--heading-color);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 10%;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	li.active a {
		color: var(--accent-color);
		border-bottom: 2px solid var(--accent-color);
	}

	a:hover {
		color: var(--accent-color);
	}
</style>
