<script context="module">
	export async function load({ session, fetch }) {
		if (session) {
			const userName = JSON.parse(session.userToken).userName;
			const BASE_URL = 'https://memoriser-strapi.herokuapp.com';
			const sentenceApiCall = fetch(`${BASE_URL}/sentences?userRef.username=${userName}`);
			const wordsApiCall = fetch(`${BASE_URL}/words?userRef.username=${userName}`);
			const response = await Promise.all([sentenceApiCall, wordsApiCall]);
			const data = await Promise.all(response.map((r) => r.json()));
			return {
				props: {
					userName,
					data
				}
			};
		}
		return {};
	}
</script>

<script>
	import Accordion from '$lib/Accordion.svelte';
	import { deleteCookie } from '../utils/cookie';
	export let userName;
	export let data;
	let [allSentences, allWords] = data;
	const handleLogout = () => {
		deleteCookie('userToken');
		window.location = '/';
	};
	const refreshWords = async () => {
		const BASE_URL = 'https://memoriser-strapi.herokuapp.com';
		const wordsApiCall = await fetch(`${BASE_URL}/words?userRef.username=${userName}`);
		allWords = await wordsApiCall.json();
	};
	const refreshSentences = async () => {
		const BASE_URL = 'https://memoriser-strapi.herokuapp.com';
		const sentenceApiCall = fetch(`${BASE_URL}/sentences?userRef.username=${userName}`);
		allSentences = await sentenceApiCall.json();
	};
</script>

<div>
	<h2>Profile Info</h2>
	<button on:click={handleLogout}>Logout</button>
	<p>Username = {userName}</p>
	<Accordion data={allSentences} header="All Sentences" {refreshWords} {refreshSentences} />
	<Accordion data={allWords} header="All Words" {refreshWords} {refreshSentences} />
</div>
