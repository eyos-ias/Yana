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
        {#if (block.tag) === "h1"}
            <h1 contenteditable="true"
                class="text-4xl"
                id={block.id}
                on:input={(e)=>handleInput(e,idx)}
                on:keydown={(e)=> handleKeydown(e,idx)}
            >{block.html}</h1>
        {:else if (block.tag) === "p"}
            <p contenteditable="true"
               id={block.id}
               on:input={(e)=> handleInput(e,idx)}
               on:keydown={(e)=> handleKeydown(e,idx)}
            >{block.html}</p>
        {:else if (block.tag) === "q"}
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
        {/if}
    {/each}

    <div>


    </div>






<!--    <h1 contenteditable="true"> I am editable by the user </h1>-->
<!--    <p contenteditable="true">This is a Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, cumque dolores-->
<!--        enim est hic iure maiores praesentium quam sunt ullam?</p>-->





</section>
<button on:click={()=>{console.log(blocks)}}>All</button>

<style>
    *{
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
        max-width: 1000px;
        min-width: 400px;

        background: whitesmoke;

    }
    section *{
        width: 100%;
        border: none;
        background: transparent;

    }
    section h1{
        text-transform: capitalize;
        text-align: start;
        color: black;
        padding: 2px;
        margin: 14px 0 2px;
        border-radius: 2px;
        background: rgba(112, 128, 144, 0.19);
    }
    section p{
        text-align: start;
        color: black;
        padding: 2px;
        margin: 2px;
        width: 100%;
        overflow: clip;
        overflow-wrap: normal;
    }

    section blockquote{
        text-align: start;
        padding: 2px;
        margin: 7px 0;

        display: flex;
        flex-direction: row;
        align-items: center;

        border-left: solid 4px black;

    }
    section blockquote #pushpin{
        font-size: large;
        font-weight: bold;
        color: black;

        width: fit-content;
        margin: 0.5em;

        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
    }
    section blockquote #callouttext{
        padding: 4px;
    }
    section *:hover:not(span):not(:focus){
        background: rgba(58, 58, 250, 0.1);
        outline: solid 0.2px rgba(58, 58, 250, 0.3);
    }

    section *:focus{
        background: rgba(58, 58, 250, 0.2);
    }

    section *:active{
        background: rgba(58, 58, 250, 0.2);
    }





</style>
