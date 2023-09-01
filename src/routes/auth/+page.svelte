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

<div class=" w-[50%] mx-auto p-4 bg-white rounded shadow-md">
    <h1 class="text-2xl font-bold mb-4">{register ? "Register" : "Login"}</h1>
    <form class="flex flex-col">
      <input type="email" bind:value={email} placeholder="Email" class="border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <input type="password" bind:value={password} placeholder="Password" class="border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
      {#if register}
      <input type="password" bind:value={confirmPassword} placeholder="Confirm Password" class="border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
      {/if}
      <button on:click={handleSubmit} class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">Submit</button>
    </form>
    {#if register}
    <p class=" text-center pt-5" >Already have an account? <span on:click={() => register=false} class="font-bold cursor-pointer text-blue-500">Login</span></p>
    {:else}
    <p class="text-center pt-5">Don't have an account? <span on:click={() => register=true} class="font-bold cursor-pointer text-blue-500">Register</span></p>
    {/if}
    <p class="text-red-500 mt-2">{error}</p>
  </div>


