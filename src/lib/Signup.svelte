<script>
	import { setCookie } from '../utils/cookie.js';
	import axios from 'axios';
	export let toggleShowLogin;
	let username = '';
	let email = '';
	let password = '';
	let error = '';
	let signUpBtnText = 'Signup';

	const handleSignUp = async () => {
		if (username.length === 0) {
			error = 'Username must not be empty';
			return;
		} else if (email.length === 0) {
			error = 'Email must not be empty';
			return;
		}
		try {
			signUpBtnText = 'Signing Up';
			const { data } = await axios({
				url: 'https://memoriser-strapi.herokuapp.com/auth/local/register',
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				data: JSON.stringify({
					username,
					email,
					password
				})
			});
			setCookie(
				'userToken',
				{ jwt: data.jwt, userId: data.user.id, userName: data.user.username },
				30
			);
			window.location = '/';
		} catch (err) {
			signUpBtnText = 'Signup';
			console.error(err);
			error = 'There was an error signing up';
		}
	};
</script>

<div>
	<h1>Signup</h1>
	<input type="text" bind:value={username} placeholder="Enter your username" />
	<input type="email" bind:value={email} placeholder="Enter your email" />
	<input type="password" bind:value={password} placeholder="Enter your password" />
	<p class="error">{error}</p>
	<button on:click={handleSignUp}>{signUpBtnText}</button>
	<p>Already have an account? <span on:click={() => toggleShowLogin()}>Login</span></p>
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
