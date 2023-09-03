<script>

        let isCorrect = "";
        let tried = false;

        export let question;
        export let idx;
        let answerChoice = "";
        let correctAnswer = question.answer;


</script>


<div class={isCorrect ? 'correct' : (isCorrect === false ? 'wrong' : '')}>
    <h2 class="bold text-lg">{idx+1}. {question.question}</h2>
    <ul>
        {#each question.options as option}
        <li class="m-1">
            <input type="radio"
                   name={idx}
                   class="radio radio-neutral radio-xs"
                   value={option}
                   on:change={(event) => {
                        answerChoice = event.target.value;
                    }
                 }
        >
            {option}</li>
        {/each}
    </ul>
    <span class={tried ? 'showAnswer' : ''}>
        <b>Correct answer:</b>
        {question.answer}
    </span>
        <button class="btn btn-accent btn-xs btn-wide"
         disabled={(answerChoice.length === 0)}
        on:click={()=>{
            if(answerChoice.toLowerCase() === correctAnswer.toLowerCase()){
                isCorrect = true;
            }
            else{
                isCorrect = false;
            }
            tried = true;
        }}
        >Check</button>
</div>

<style>
    div{
        border-radius: 5px;
        width: 100%;
        padding: 30px;
        margin: 20px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    }
    .wrong{
        background: rgba(255, 0, 0, 0.32);
    }
    .correct{
        background: rgba(173, 255, 47, 0.36);
    }
    .showAnswer{
        display: block;
    }
    span{
        display: none;
    }
</style>