<script>
	import { v4 as uuid } from 'uuid';
	import { afterUpdate, onMount } from 'svelte';
	//import {onMount} from "svelte"
	import { page } from '$app/stores';
	import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase/firebase.js';
	import { AskNotes, generateQuestions, summarizeNotes, ExplandNotes } from '../../../api/AI.js';
	//import {printChapterPdf} from '../../../../lib/server/pdf/generateChapterPdf.js';
	import pdfMake from 'pdfmake/build/pdfmake';
	import pdfFonts from 'pdfmake/build/vfs_fonts';

	let focusElementId;
	let autoFocus = false;
	afterUpdate(() => {
		if (autoFocus) {
			let focusElement = document.getElementById(focusElementId);
			focusElement && focusElement.focus();
			autoFocus = false;
		}
	});

	let showOptions = null;
	let buttonText = 'Generate Quiz';
	let summarizeButtonText = 'Summarize';
	$: Theusersquestion = "";
	let Asktext = 'Ask question';

	let blocks = [{ id: 654684, html: 'Loading notes...', tag: 'h1' }];
	$: {
		if (blocks.length <= 0) blocks = [{ id: uuid(), html: 'Start writing', tag: 'p' }];
	}

	async function getNote() {
		let courseName = $page.params.course;
		let chapterName = $page.params.chapter;
		try {
			// Reference to the user's document in the "users" collection
			const email = localStorage.getItem('email');
			const userDocRef = doc(db, 'users', email);
			// Reference to the "courses" subcollection within the user's document
			const coursesCollectionRef = collection(userDocRef, 'courses');
			// Reference to the specific course document within the "courses" subcollection
			const courseDocRef = doc(coursesCollectionRef, courseName);
			// Reference to the "chapters" subcollection within the course document
			const chaptersCollectionRef = collection(courseDocRef, 'chapters');
			// Fetching document with chapter name
			const docRef = doc(chaptersCollectionRef, chapterName);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const data = docSnap.data();
				if (data.blocks.length <= 0) blocks = [{ id: uuid(), html: 'Start writing', tag: 'p' }];
				else blocks = data.blocks;
			}
		} catch (error) {
			console.error('Error fetching sub-collection documents:', error);
			throw error;
		}
	}

	onMount(() => {
		getNote();
		pdfMake.vfs = pdfFonts.pdfMake.vfs;
	});

	async function saveNote() {
		let courseName = $page.params.course;
		let chapterName = $page.params.chapter;
		try {
			// Reference to the user's document in the "users" collection
			const email = localStorage.getItem('email');
			const userDocRef = doc(db, 'users', email);
			// Reference to the "courses" subcollection within the user's document
			const coursesCollectionRef = collection(userDocRef, 'courses');
			// Reference to the specific course document within the "courses" subcollection
			const courseDocRef = doc(coursesCollectionRef, courseName);
			// Reference to the "chapters" subcollection within the course document
			const chaptersCollectionRef = collection(courseDocRef, 'chapters');
			// Fetching document with chapter name
			const docRef = doc(chaptersCollectionRef, chapterName);
			await updateDoc(docRef, { blocks });
		} catch (error) {
			console.error('Error fetching sub-collection documents:', error);
			throw error;
		}
	}

	function handleKeydown(e, idx) {
		if (e.key === 'Backspace' && blocks[idx].html.length === 0) {
			blocks.splice(idx, 1);
			blocks = blocks;
			focusElementId = e.target.previousElementSibling.id;
			autoFocus = true;
		} else if (e.key === 'Enter') {
			e.preventDefault();
			focusElementId = uuid();
			blocks.splice(idx + 1, 0, { id: focusElementId, html: '', tag: 'p' });
			blocks = blocks;
			autoFocus = true;
		}
	}
	function handleInput(e, idx) {
		blocks[idx].html = e.target.textContent;
	}

	function changeTag(preferedTag, index) {
		if (preferedTag === 'Paragraph') blocks[index].tag = 'p';
		else if (preferedTag === 'Heading') blocks[index].tag = 'h1';
		else if (preferedTag === 'Quote') blocks[index].tag = 'q';
	}

	function printPdf(quizData) {
		const docDefintion = {
			content: []
		};
        const questions = quizData;

		questions.forEach((q, index) => {
			docDefintion.content.push(
				{ text: `Question ${index + 1}: ${q.question}`, bold: true },
				{   type: 'lower-alpha',
					ol: q.options.map((opt, optIndex) => {
						return {
							text: `${opt}`,
							margin: [20, 0, 0, 0]
						};
					})
				},
				//{ text: `Correct Answer: ${q.answer}\n\n` }
			);
		});

        docDefintion.content.push({ text: '', pageBreak: 'after' });

        docDefintion.content.push(
      { text: 'Answer Key', bold: true },
      {
        ul: questions.map((q, index) => {
          return {
            text: `Question ${index + 1}: ${q.answer}`,
            margin: [20, 0, 0, 0],
          };
        }),
      }
    );
		pdfMake.createPdf(docDefintion).download("quiz");
	}
</script>

<svelte:head>
	<title>Write</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="max-w-prose lg:text-lg prose prose-slate mx-auto mt-8 lg:prose-lg">
	<h2>
		<strong>Write your note</strong>
	</h2>

	{#each blocks as block, idx (block.id)}
		<div class="container">
			{#if block.tag === 'h1'}
				<div
					class="hContainer textBlock"
					on:mouseenter={() => (showOptions = idx)}
					on:mouseleave={() => (showOptions = null)}
				>
					<span class="options" class:visible={showOptions === idx}>
						<svg width="20" height="20" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
							<path
								fill="#000000"
								d="M108 60a16 16 0 1 1-16-16a16 16 0 0 1 16 16Zm56 16a16 16 0 1 0-16-16a16 16 0 0 0 16 16Zm-72 36a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm-72 68a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z"
							/>
						</svg>
						<span class="dropdown">
							<button on:click={(e) => changeTag(e.target.textContent, idx)}>Paragraph</button>
							<button on:click={(e) => changeTag(e.target.textContent, idx)}>Quote</button>
						</span>
					</span>
					<h1
						contenteditable="true"
						class="text-4xl"
						id={block.id}
						on:input={(e) => handleInput(e, idx)}
						on:keydown={(e) => handleKeydown(e, idx)}
					>
						{block.html}
					</h1>
				</div>
			{:else if block.tag === 'p'}
				<div
					class="pContainer textBlock"
					on:mouseenter={() => (showOptions = idx)}
					on:mouseleave={() => (showOptions = null)}
				>
					<span class="options" class:visible={showOptions === idx}>
						<svg width="20" height="20" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
							<path
								fill="#000000"
								d="M108 60a16 16 0 1 1-16-16a16 16 0 0 1 16 16Zm56 16a16 16 0 1 0-16-16a16 16 0 0 0 16 16Zm-72 36a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm-72 68a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z"
							/>
						</svg>
						<ul class="dropdown">
							<button on:click={(e) => changeTag(e.target.textContent, idx)}>Heading</button>
							<button on:click={(e) => changeTag(e.target.textContent, idx)}>Quote</button>
							<button on:click={async () => {
								let reserve = blocks[idx].html;
								blocks[idx].html = "Loading...";
								let expandedNote;
								try{
									expandedNote = await ExplandNotes(reserve);
									blocks[idx].html = expandedNote.candidates[0].output.replace(/\*/g, '');
								}catch (e) {
								  blocks[idx].html = reserve;
								}

							}}>AI Expand</button>
						</ul>
					</span>
					<p
						contenteditable="true"
						id={block.id}
						on:input={(e) => handleInput(e, idx)}
						on:keydown={(e) => handleKeydown(e, idx)}
					>
						{block.html}
					</p>
				</div>
			{:else if block.tag === 'q'}
				<div
					class="qContainer textBlock"
					on:mouseenter={() => (showOptions = idx)}
					on:mouseleave={() => (showOptions = null)}
				>
					<span class="options" class:visible={showOptions === idx}>
						<svg width="20" height="20" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
							<path
								fill="#000000"
								d="M108 60a16 16 0 1 1-16-16a16 16 0 0 1 16 16Zm56 16a16 16 0 1 0-16-16a16 16 0 0 0 16 16Zm-72 36a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm-72 68a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z"
							/>
						</svg>
						<ul class="dropdown">
							<button on:click={(e) => changeTag(e.target.textContent, idx)}>Heading</button>
							<button on:click={(e) => changeTag(e.target.textContent, idx)}>Paragraph</button>
						</ul>
					</span>
					<blockquote id={block.id} class="text-slate-700 italic">
						<span id="pushpin">📌</span>
						<span
							contenteditable="true"
							id="callouttext"
							on:input={(e) => handleInput(e, idx)}
							on:keydown={(e) => handleKeydown(e, idx)}>{block.html}</span
						>
					</blockquote>
				</div>
			{/if}
		</div>
	{/each}
	<div />
</section>

<div class="flex flex-row my-2 w-fit">
	<button
		class="btn btn-primary"
		on:click={() => {
			saveNote();
			getNote();
		}}>Save</button
	>

	<button
		class="btn btn-accent mx-2"
		on:click={async () => {
			buttonText = 'Loading...';
			let notes = blocks.map((ele) => {
				if (ele.tag === 'p') return ele.html;
			});
			let questionSet1 = await generateQuestions(notes);
			
			//console.log(typeof questionSet1.candidates[0].output);
            const dataWithoutBackticks = questionSet1.candidates[0].output.replace(/^```json|```$/g, '');			//console.log(JSON.parse(dataWithoutBackticks));
			buttonText = 'Generate Quiz';
			printPdf(JSON.parse(dataWithoutBackticks));
			//printPdf(questionSet1.candidates[0]);
		}}>{buttonText}</button
	>

	<button
		class="btn btn-neutral"
		on:click={async () => {
			summarizeButtonText = 'Loading...';
			let notes = blocks.map((ele) => {
				if (ele.tag === 'p') return ele.html;
			});
			let questionSet1 = await summarizeNotes(notes);
			blocks = [
				...blocks,
				{ id: uuid(), tag: 'h1', html: 'Summary' },
				{ id: uuid(), tag: 'p', html: questionSet1.candidates[0].output }
			];
			summarizeButtonText = 'Summarize';
		}}>{summarizeButtonText}</button>
</div>
<div class="join">
	<input class="input input-bordered join-item" placeholder="Question" bind:value={Theusersquestion}/>
	<button class="btn join-item  btn-secondary"
	on:click={async () => {
		Asktext = 'Loading...';
		let notes = blocks.map((ele) => {
			if (ele.tag === 'p') return ele.html;
		});
		let questionSet1 = await AskNotes(notes,Theusersquestion);
		blocks = [
			...blocks,
			{ id: uuid(), tag: 'h1', html: 'Question' },
			{	id : uuid() , tag : 'p' , html : Theusersquestion},
			{ id: uuid(), tag: 'h1', html: 'Answer' },
			{ id: uuid(), tag: 'p', html: questionSet1.candidates[0].output }
		];
		Asktext = 'Ask Question';
		Theusersquestion= "";
	}}>{Asktext}</button>
  </div>

<style>
	/** {*/
	/*    padding: 0;*/
	/*    margin: 0;*/
	/*    box-sizing: border-box;*/
	/*}*/

	section {
		display: flex;
		flex-direction: column;
		/*justify-content: center;*/
		align-items: center;
		flex: 0.6;
		padding: 20px 10px;
		border: solid red 2px;
		max-width: 600px;
		min-width: 400px;
		background: white;
	}

	.container {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	section *:not(span) {
		width: 100%;
		border: none;
		background: transparent;
	}

	section h1,
	section p {
		text-align: justify;
		color: black;
		padding: 4px;
		width: 100%;
		overflow-wrap: normal;
	}

	section h1 {
		text-align: start;
		text-transform: capitalize;
		border-radius: 2px;
		background: rgba(81, 93, 104, 0.06);
		height: 100%;
	}

	section blockquote {
		text-align: start;
		padding: 2px;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-left: solid 4px black;
	}

	section blockquote #pushpin {
		font-size: large;
		font-weight: bold;
		color: black;
		width: fit-content;
		margin: 0.5em;
		user-select: none;
	}

	section blockquote #callouttext {
		padding: 4px;
	}

	.hContainer,
	.qContainer,
	.pContainer {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.hContainer {
		margin: 14px 0 2px;
	}

	.qContainer {
		margin: 7px 0;
	}

	.pContainer {
		margin: 4px 2px;
	}

	section h1:hover:not(:focus) {
		background: rgba(58, 58, 250, 0.1);
		outline: solid 0.2px rgba(58, 58, 250, 0.3);
	}
	section p:hover:not(:focus) {
		background: rgba(58, 58, 250, 0.1);
		outline: solid 0.2px rgba(58, 58, 250, 0.3);
	}
	section blockquote:hover:not(:focus) {
		background: rgba(58, 58, 250, 0.1);
		outline: solid 0.2px rgba(58, 58, 250, 0.3);
	}

	section *:focus:not(div),
	section *:active:not(div) {
		background: rgba(58, 58, 250, 0.2);
	}

	.options {
		visibility: hidden;
		margin: 0 2px;
		cursor: pointer;
	}
	.options.visible {
		visibility: visible;
	}
	.options:hover > span {
		display: block;
	}

	.options:hover {
		background: rgba(112, 128, 144, 0.37);
		width: fit-content;
		border-radius: 2px;
	}

	.dropdown {
		display: none;
		position: absolute;
		width: fit-content;

		background-color: #d3d3d3;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		color: black;
		border-radius: 3px;
		z-index: 1;
	}
	.dropdown button {
		border-radius: 3px;

		user-select: none;
	}

	/* Show the dropdown when the container is hovered over */
	.options:hover .dropdown {
		display: block;
	}
	.dropdown button:hover {
		background: slategray;
		color: whitesmoke;
	}
</style>
