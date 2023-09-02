<script>
	import {authStore} from "../stores/authStore"
    import {onMount} from "svelte"
    import {auth} from "../lib/firebase/firebase";
	 import { browser } from "$app/environment"

	import '../app.postcss';
	import './Navbar.svelte'
	import Navbar from './Navbar.svelte';
	import './styles.css';
	import "../app.css";
	import Sidebar from './Sidebar.svelte';

	onMount(async () =>{
        const unsubscribe =  auth.onAuthStateChanged(user =>{
			if (user){
				authStore.update( curr =>{
                return {
                    ...curr,
                    isLoading:false,
                    currentUser:user
                }

            })
			if (browser){
					if (window.location.pathname === "/auth"){
						window.location.href = "/dashboard"
					}
				}
			} else{
				if (browser){
					if (window.location.pathname === "/write"){
						window.location.href = "/auth"
					}
				}
			}
           
        })
		return unsubscribe
    })
	let showmenu = false;
	let pos = { x: 0, y: 0 };
	function rightclicked (e){
		showmenu = true;
		pos = { x: e.clientX, y: e.clientY };
	}
    function onPageClick(e){
		showmenu=false;
	}

	console.log($authStore.currentUser)
</script>

<div class="app">

<Navbar/>

	<main>

		<slot />
		
	</main>


</div>

<Sidebar/>

{#if showmenu}
<div style="position: absolute; top:{pos.y}px; left:{pos.x}px;     display: inline-flex;
border: 1px #999 solid;
width: 170px;
background-color: #fff;
border-radius: 10px;
overflow: hidden;
flex-direction: column;">
	<ul style="margin: 6px;">
	<li><button>custom</button></li>
	<li><button>right</button></li>
    <li><button>click</button></li>
    <li><button>menu</button></li>
	</ul>
</div>
{/if}
<svelte:body on:contextmenu|preventDefault= {rightclicked} on:click={onPageClick}/>
<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
		align-items: center;
	}
	ul li{
        display: block;
        list-style-type: none;
        width: 1fr;
    }
    ul li button{
        font-size: 1rem;
        color: #222;
        width: 100%;
        height: 30px;
        text-align: left;
        border: 0px;
        background-color: #fff;
    }
    ul li button:hover{
        color: #000;
        text-align: left;
        border-radius: 5px;
        background-color: #eee;
    }

</style>
