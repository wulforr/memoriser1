<script>
	import { setCookie } from '../utils/cookie.js';
	import axios from 'axios';
	export let toggleShowLogin;
	let email = '';
	let password = '';
	let error = '';

	const handleLogin = async () => {
		if (email.length === 0) {
			error = 'email must not be empty';
			return;
		} else if (password.length === 0) {
			error = 'Password must not be empty';
			return;
		} else if (password.length < 4) {
			error = 'Password must be greater than 4 characters';
			return;
		}
		try {
			error = '';
			const { data } = await axios({
				url: 'https://memoriser-strapi.herokuapp.com/auth/local',
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				data: JSON.stringify({
					identifier: email,
					password
				})
			});
			setCookie(
				'userToken',
				{ jwt: data.jwt, userId: data.user.id, userName: data.user.username },
				30
			);
			console.log('login successfull', data.user.username);
			window.location = '/';
			// }
		} catch (err) {
			error = 'Username or password is incorrect';
		}
	};
</script>

<div>
	<h1>Login</h1>
	<input type="email" bind:value={email} placeholder="Enter your email" />
	<input type="password" bind:value={password} placeholder="Enter your password" />
	<p class="error">{error}</p>
	<button on:click={handleLogin}>Login</button>
	<p>Dont have an account? <span on:click={() => toggleShowLogin()}>register</span></p>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
	}

	h1 {
		text-align: center;
	}

	input {
		padding: 0.5rem;
		margin: 1rem 0;
		border-radius: 4px;
	}
	button {
		padding: 0.5rem;
		background-color: var(--button-background);
		margin: 1.25rem 0 0.5rem;
		color: #fff;
		border: 1px solid var(--button-background);
	}
	p {
		text-align: center;
	}
	span {
		color: var(--accent-color);
	}
	.error {
		color: red;
	}
</style>
