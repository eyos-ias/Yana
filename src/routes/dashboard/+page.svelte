<script>
    import { db } from '$lib/firebase/firebase.js';
    import { collection, getDoc, doc, getDocs } from "firebase/firestore";
    import {onMount} from "svelte";

    let listOfCourses = [];

    async function getCoursesList(){
        //const users_ref = collection(db, 'users');
        try {
        // Get a reference to the sub-collection
        const users_ref = collection(db, 'users','nf.naol9@gmail.com', 'courses');
        // Fetch all documents in the sub-collection
        const querySnapshot = await getDocs(users_ref);
        // Extract the data from each document

         listOfCourses =querySnapshot.docs.map((doc) => {
            return doc.data();
        });

    } catch (error) {
        console.error('Error fetching sub-collection documents:', error);
        throw error;
    }
    }

    getCoursesList();


</script>

<section class="flex flex-col">
    <div class="alert alert-info">
        <span>Welcome back <strong><u>Brook</u></strong></span>
    </div>
    <div class="flex flex-col min-h-fit">
        {#if (listOfCourses.length <= 0)}
            <span class="loading loading-spinner loading-lg"></span>
        {:else}
            <div class="container flex flex-col">
                {#each listOfCourses as course}

                        <a href="./course/{course.name}">
                            <div class="card w-96 bg-base-100 shadow-xl ">
                                <div class="card-body">
                                    {#if course.name.startsWith("CS")}
                                        <div class="badge badge-primary">Main course</div>
                                    {:else if course.name.startsWith("CC")}
                                        <div class="badge badge-accent">Common Course</div>
                                    {/if}

                                    <h2 class="card-title"><img alt="course icon" src="open-book.png" width="40px">{course.name}</h2>
                                    <p >{course.description}n</p>
                                </div>
                            </div>
                        </a>

                {/each}
                    <button onclick="my_modal_3.showModal()" class="btn">
                    <div class="card w-96 bg-base-100 shadow-xl ">
                        <div class="card-body">
                            <img alt="course icon" src="add.png" width="35px">
                            <h2 class="card-title text-lg" >Add Course</h2>
                        </div>
                    </div>
                </button>
            </div>

        {/if}
    </div>
<!-- You can open the modal using ID.showModal() method -->
<dialog id="my_modal_3" class="modal">
  <form method="dialog" class="modal-box">
    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    <p class="py-4">Press ESC key or click on ✕ button to close</p>
    <input style="margin:70px; margin-bottom:0px; margin-top:30px;" type="text" placeholder="Course Name" class="input input-bordered input-info w-full max-w-xs" />
    <input style="margin:70px;margin-top:30px; "type="text" placeholder="Couse Descrption" class="input input-bordered input-info w-full max-w-xs" />
    
  </form>
</dialog>

</section>




<style>
    .btn{
        padding: 0px;
        background: transparent;
        border: 0px;
    }
    .card{
        margin:20px;
    }
    .card:hover{
        background-color: #f2f2f29f;
        transition: 0.2s;
    }
    a:hover{
        text-decoration: none;
    }


</style>