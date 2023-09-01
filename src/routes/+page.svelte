<script>
	import Sidebar from "./Sidebar.svelte";

	let showmenu = false;
	let pos = { x: 0, y: 0 };
	function rightclicked (e){
		showmenu = true;
		pos = { x: e.clientX, y: e.clientY };
		console.log(pos)
	}
    function onPageClick(e){
		showmenu=false;
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />

</svelte:head>

<section>
	
<h1 >hello
</h1>

</section>


<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}


</style>
