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

         listOfCourses = querySnapshot.docs.map((doc) => {
            return doc.data().name;
        });

    } catch (error) {
        console.error('Error fetching sub-collection documents:', error);
        throw error;
    }
    }

    getCoursesList();


</script>
<section>
    {#if (listOfCourses.length <= 0)}
    <span class="loading loading-spinner loading-lg"></span>
    {:else}
    {#each listOfCourses as course}
    <button class="btn">
        <a href="./course/{course}">   
         <div class="card w-96 bg-base-100 shadow-xl ">
        <div class="card-body">
            {#if course[1] == 's' || course[1] == 'S'}
            <div class="badge badge-primary">Main course</div>
            {:else if course[1] == 'c' || course[1] == 'C'}
            <div class="badge badge-accent">Common Course</div>
            
            {/if}

          <h2 class="card-title"><img alt="course icon" src="open-book.png" width="40px">{course}</h2>
          <p >course descripton</p>
        </div>
      </div>
    </a>
    </button>
    {/each}
        
    {/if}


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
    a{
        text-decoration: none;
    }
</style>