
<script>
  import {authHandlers} from "../stores/authStore"

  const handleLogout = async() =>{
    try {
      await authHandlers.logOut()
      window.location.href = "/auth"
    } catch (error) {
      console.log(error)
    }
  }
</script>
<div class="navbar bg-base-100">
  <div class="flex-none">
    <button class="btn btn-square btn-ghost" >
      <label for="my-drawer" class="btn  drawer-button">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
  </label> </button>
  </div>
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl" href="/" style="text-decoration:none;">YANA</a>
    </div>
    
      
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg" />
          </div>
        </label>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <a href="https://www.youtube.com/" class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li on:click={handleLogout} ><a>Logout</a></li>
        </ul>
      </div>
    </div>
  <!-- </div> -->

