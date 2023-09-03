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
	<div class="hero min-h-screen bg-base-100 h-max" style="background: transparent; width:1200px ">
		<div class="hero-content flex-col lg:flex-row-reverse">
		  <img src="/penguy.png" class="max-w-2xl rounded-lg " alt="logo" />
		  <div>
			
			<h1 class="text-5xl font-bold"><b>YANA</b></h1>
			<p class="py-6"  style="font-size:18px;" >Empowering <b class="africa">A</b>fr<b class="africa">i</b>ca one note & one question at a time.<br><br>Making education tailored for everyone and empowering students all over the world with the power of <u>AI</u>.</p>
			<a href="/auth" class="btn btn-primary btn-wide btn-lg hover:decoration-0">
				Get Started
			</a>
		  </div>
		</div>
	  </div>
	
	

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
	a
	{
		text-decoration: none;
	}
	h1,p
	{
		font-family:monospace;
	}
	b{
		color:hsl(var(--p));
		font-size: 150px;
	}
	.africa
	{
		color:hsl(var(--p));
		font-size: 30px;
	}


</style>
