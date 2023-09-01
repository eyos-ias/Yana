<script>
    import { v4 as uuid } from "uuid"
    import {afterUpdate} from 'svelte';

    let focusElementId;
    let autoFocus = false;
    afterUpdate(() => {
        if(autoFocus){
            let focusElement = document.getElementById(focusElementId);
            focusElement && focusElement.focus();
            autoFocus = false;
        }
    });

    let showOptions = null;



    let blocks = [
        { id: 654684, html: "this is the", tag: "h1" },
        { id: 5674567, html: "this is the beauty of it all his is the bea uty of it all his is the be auty of i t all", tag: "p" },
        { id: 2432435, html: "beauty of it all", tag: "h1" },
        { id: 98765, html: "beauty of it all Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, sunt! Lorem ipsum dolor sit amet, " +
                "consectetur adipisicing elit. Adipisci alias aliquid architecto, dolore fugit impedit maxime nam quasi veniam voluptas?", tag: "q" },
        { id: 565467876, html: "this is the beauty of it all his is the beauty of it al lh is is the beauty of it all his is the beauty of it all", tag: "p" },
        { id: 9567547, html: "this is the beauty of it all his is the beauty of it al lh is is the beauty of it all his is the beauty of it all", tag: "q" },
    ];

    function handleKeydown(e, idx){
        if(e.key === "Backspace" && blocks[idx].html.length === 0){
            blocks.splice(idx,1);
            blocks = blocks;
            focusElementId = e.target.previousElementSibling.id;
            autoFocus = true;
        }else if(e.key === "Enter"){
            e.preventDefault();
            focusElementId = uuid();
            blocks.splice(idx + 1, 0,  { id: focusElementId, html: "", tag: "p" });
            blocks = blocks;
            autoFocus = true;
        }
    }
    function handleInput(e, idx){
            blocks[idx].html = e.target.textContent;
    }

    function changeTag(preferedTag, index){
        if(preferedTag === "Paragraph")
            blocks[index].tag = 'p'
        else if(preferedTag === "Heading")
            blocks[index].tag = 'h1'
        else if(preferedTag === "Quote")
            blocks[index].tag = 'q'
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


            {#if (block.tag) === "h1"}

                <div class="hContainer textBlock" on:mouseenter={() => showOptions = idx} on:mouseleave={() => showOptions = null}>
                <span class="options" class:visible={showOptions === idx}>
        <svg width="20" height="20" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <path fill="#000000" d="M108 60a16 16 0 1 1-16-16a16 16 0 0 1 16 16Zm56 16a16 16 0 1 0-16-16a16 16 0 0 0 16 16Zm-72 36a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm-72 68a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z"/>
        </svg>
                        <span class="dropdown">
                            <button on:click={e=> changeTag(e.target.textContent, idx)}>Paragraph</button>
                            <button on:click={e=> changeTag(e.target.textContent, idx)}>Quote</button>
                        </span>
        </span>
                    <h1 contenteditable="true"
                        class="text-4xl"
                        id={block.id}
                        on:input={(e)=>handleInput(e,idx)}
                        on:keydown={(e)=> handleKeydown(e,idx)}
                    >
                        {block.html}</h1>
                </div>

            {:else if (block.tag) === "p"}

                <div class="pContainer textBlock" on:mouseenter={() => showOptions = idx} on:mouseleave={() => showOptions = null}>
                     <span class="options" class:visible={showOptions === idx}>
        <svg width="20" height="20" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <path fill="#000000" d="M108 60a16 16 0 1 1-16-16a16 16 0 0 1 16 16Zm56 16a16 16 0 1 0-16-16a16 16 0 0 0 16 16Zm-72 36a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm-72 68a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z"/>
        </svg>
                         <ul class="dropdown">
                            <button on:click={e=> changeTag(e.target.textContent, idx)}>Heading</button>
                            <button on:click={e=> changeTag(e.target.textContent, idx)}>Quote</button>
                        </ul>
        </span>
                    <p contenteditable="true"
                       id={block.id}
                       on:input={(e)=> handleInput(e,idx)}
                       on:keydown={(e)=> handleKeydown(e,idx)}
                    >{block.html}</p>
                </div>

            {:else if (block.tag) === "q"}
                <div class="qContainer textBlock" on:mouseenter={() => showOptions = idx} on:mouseleave={() => showOptions = null}>
                    <span class="options" class:visible={showOptions === idx}>
        <svg width="20" height="20" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <path fill="#000000" d="M108 60a16 16 0 1 1-16-16a16 16 0 0 1 16 16Zm56 16a16 16 0 1 0-16-16a16 16 0 0 0 16 16Zm-72 36a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm-72 68a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm72 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z"/>
        </svg>
                        <ul class="dropdown">
                            <button on:click={e=> changeTag(e.target.textContent, idx)}>Heading</button>
                            <button on:click={e=> changeTag(e.target.textContent, idx)}>Paragraph</button>
                        </ul>

        </span>
                    <blockquote
                            id={block.id}
                            class="text-slate-700 italic"
                    >
                        <span id="pushpin">📌</span>
                        <span contenteditable="true"
                              id="callouttext"
                              on:input={(e)=> handleInput(e,idx)}
                              on:keydown={(e)=> handleKeydown(e,idx)}
                        >{block.html}</span>
                    </blockquote>
                </div>

            {/if}
        </div>
    {/each}
    <div>
    </div>
</section>
<button on:click={()=>{console.log(blocks)}}>All</button>


<style>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
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
    .options:hover > span{
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
    .dropdown button{
        border-radius: 3px;

        user-select: none;
    }

    /* Show the dropdown when the container is hovered over */
    .options:hover .dropdown{
        display: block;
    }
    .dropdown button:hover{
        background: slategray;
        color: whitesmoke;

    }

</style>
