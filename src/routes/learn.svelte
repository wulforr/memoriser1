<script context="module">
	export async function load({ fetch, session }) {
		console.log('session in learn', session);
		if (session) {
			// const BASE_URL = 'https://memoriser-strapi.herokuapp.com';
			const BASE_URL = 'https://memoriser-strapi.herokuapp.com';

			const userName = JSON.parse(session.userToken).userName;
			const sentenceApiCall = fetch(`${BASE_URL}/sentences?userRef.username=${userName}`);
			const wordsApiCall = fetch(`${BASE_URL}/words?userRef.username=${userName}`);
			const response = await Promise.all([sentenceApiCall, wordsApiCall]);
			const data = await Promise.all(response.map((r) => r.json()));
			return {
				props: {
					data
				}
			};
		} else
			return {
				status: 302,
				redirect: '/auth'
			};
	}
</script>

<script>
	import { getRandom, getOptions } from '../utils/random.js';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 500,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});
	export let data;
	let sentence = null;
	let wordsInSentence = null;
	let ans = [];
	let isChecked = false;
	let isCorrect = false;
	let allSentences = null;
	let allWords = null;
	if (data && data[0].length && data[1].length) {
		[allSentences, allWords] = data;
		sentence = getRandom(allSentences);
		wordsInSentence = getOptions(sentence, allWords);
	}

	const handleOptionsWordClick = (word) => {
		ans = [...ans, word];
		wordsInSentence = wordsInSentence.filter((ele) => ele !== word);
	};
	const handleAnsWordClick = (word) => {
		ans = ans.filter((ele) => ele !== word);
		wordsInSentence = [...wordsInSentence, word];
	};
	const checkAns = () => {
		let ansString = ans.map((ele) => ele.name).join(' ');
		if (ansString.toLowerCase() === sentence.secondSentence.toLowerCase()) {
			isCorrect = true;
		}
		isChecked = true;
	};

	const handleNext = () => {
		sentence = getRandom(allSentences, allSentences.indexOf(sentence));
		wordsInSentence = getOptions(sentence, allWords);
		ans = [];
		isCorrect = false;
		isChecked = false;
	};
</script>

{#if data}
	{#if data[0].length && data[1].length}
		<section>
			<h2>{sentence.firstSentence}</h2>
			<div class="selected">
				{#each ans as wordObj (wordObj.id)}
					<div
						in:receive|local={{ key: wordObj.id }}
						out:send|local={{ key: wordObj.id }}
						animate:flip={{ duration: 200 }}
						on:click={() => handleAnsWordClick(wordObj)}
					>
						{wordObj.name}
					</div>
				{/each}
			</div>
			<div class="options">
				{#each wordsInSentence as wordObj (wordObj.id)}
					<div
						in:receive|local={{ key: wordObj.id }}
						out:send|local={{ key: wordObj.id }}
						animate:flip={{ duration: 200 }}
						on:click={() => handleOptionsWordClick(wordObj)}
					>
						{wordObj.name}
					</div>
				{/each}
			</div>
			{#if isChecked}
				{#if isCorrect}
					<div class="correctAns">Congratulations! Correct Answer</div>
				{:else}
					<div class="wrongAns">
						Oops Wrong Answer, The correct answer is - {sentence.secondSentence}
					</div>
				{/if}
				<button on:click={handleNext}>Next</button>
			{:else}
				<button on:click={checkAns}>Check</button>
			{/if}
		</section>
	{:else}
		<section>Please add words and sentences</section>
	{/if}
{:else}
	<section>Please login</section>
{/if}

<style>
	section {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	h2 {
		font-size: 2rem;
		color: #333;
		font-weight: bold;
	}
	.selected {
		display: flex;
		flex-wrap: wrap;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		height: 68px;
		box-sizing: border-box;
		width: 80%;
	}
	.options {
		display: flex;
		flex-wrap: wrap;
	}
	.selected > div,
	.options > div {
		padding: 0.75rem;
		background-color: #333;
		color: #fff;
		margin: 0.75rem;
		border-radius: 4px;
	}
	.correctAns {
		color: green;
		font-size: 1.25rem;
		margin-top: 1rem;
	}
	.wrongAns {
		color: red;
		font-size: 1.25rem;
		margin-top: 1rem;
	}
	button {
		padding: 0.75rem 1.5rem;
		border-radius: 4px;
		margin-top: 1rem;
		background-color: transparent;
		border: 2px solid #333;
		cursor: pointer;
	}
	button:hover {
		background-color: rgb(105, 128, 243);
		color: #fff;
		border: 2px solid rgb(105, 128, 243);
	}
</style>
