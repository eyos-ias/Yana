<script>
    import {authHandlers, authStore} from "../../stores/authStore"
    import {onMount} from "svelte"
    import {auth} from "../../lib/firebase/firebase"

    onMount(() =>{
        const unsubscribe = auth.onAuthStateChanged(user =>{
            console.log(user)
            authStore.update( curr =>{
                return {
                    ...curr,
                    isLoading:false,
                    currentUser:user
                }
            })
        })
    })
    let register = true
    let email = ''
    let password = ''
    let confirmPassword = ''
    let error = ""


    const showError = (text) =>{
        error = text
    }

    const handleSubmit = async() =>{
        console.log("hell ya")
        if (!email || !password || (register && !confirmPassword)){
            error = "Please fill all fields correctly"
            return 
        }

        if (register && password  === confirmPassword){
            try {
                await authHandlers.signUp(email, password)
            } catch (error) {
                showError(error.message)
                console.log(error)
            }
        } else{
            try {
                await authHandlers.login(email, password)
            } catch (error) {
                showError(error.message)
            }
        }

        if ($authStore.currentUser){
            window.location.href = "/write"
        }
    }
</script>

<div >
    <h1>{ register ? "Register" : "Login" }</h1>
    <form >
        <input type="email" bind:value={email} placeholder="email">
        <input type="password" bind:value={password} placeholder="password">
        {#if register}
        <input type="password" bind:value={confirmPassword} placeholder="Confirm password">
        {/if}
        <button on:click={handleSubmit}>submit</button>
    </form>
    {#if register }
     <p>Already have a account? <span on:click={() => register=false} class="bold">Login</span> </p>
    {:else}
    <p>Don't have an account? <span on:click={() => register=true} class="bold">Register</span> </p>
    {/if}
    <p class="error">{error}</p>
</div>


<style>

    .bold{
        font-weight: bolder;
        cursor: pointer;
    }
    div{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    form{
        display:flex;
        flex-direction: column;
        width: 50%;
    }
    input{
        margin: 10px 0;
        padding: 10px;
    }
    button{
        padding: 10px;
        cursor: pointer;
    }
</style>