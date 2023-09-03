<script>
    import MCQComponent from "./MCQComponent.svelte";
    import {onMount} from "svelte";


    let quizData = [];
    onMount(()=>{
        quizData = localStorage.getItem("quizData");
        quizData = JSON.parse(quizData)
    })

</script>

<section>
    {#each quizData as question, idx (idx)}
        <MCQComponent question={question} idx={idx}/>
    {/each}
</section>









<style>
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 0.6;
        padding: 20px 15px 20px 5px;
        border: solid black 2px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        max-width: 600px;
        min-width: 500px;
        background: white;
    }

</style>