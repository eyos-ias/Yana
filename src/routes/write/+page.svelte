<script>
    import { v4 as uuid } from "uuid"
    import {afterUpdate} from 'svelte';

    let focusElementId;
    let autoFocus = false;
    afterUpdate(() => {
        if(autoFocus){
            console.log(focusElementId)
            let focusElement = document.getElementById(focusElementId);
            focusElement && focusElement.focus();
            autoFocus = false;
        }

    });



    let blocks = [
        { id: 654684, html: "this is the", tag: "h1" },
        { id: 5674567, html: "this is the beauty of it all his is the bea uty of it all his is the be auty of i t all", tag: "p" },
        { id: 2432435, html: "beauty of it all", tag: "h1" },
        { id: 9567547, html: "this is the beauty of it all his is the beauty of it al lh is is the beauty of it all his is the beauty of it all", tag: "p" }
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

<section>
    <h2>
        <strong>Write your note</strong>
    </h2>

    {#each blocks as block, idx (block.id)}
        {#if (block.tag) === "h1"}
            <h1 contenteditable="true"
                id={block.id}
                on:input={(e)=>handleInput(e,idx)}
                on:keydown={(e)=> handleKeydown(e,idx)}
            >{block.html}</h1>
        {:else}
            <p contenteditable="true"
               id={block.id}
               on:input={(e)=> handleInput(e,idx)}
               on:keydown={(e)=> handleKeydown(e,idx)}
            >{block.html}</p>
        {/if}
    {/each}



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
        width: 1000px;

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

    section *:focus{
        background: rgba(58, 58, 250, 0.2);
    }




</style>
