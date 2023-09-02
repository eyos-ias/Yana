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
            return doc.data();
        });

    } catch (error) {
        console.error('Error fetching sub-collection documents:', error);
        throw error;
    }
    }

    getCoursesList();


</script>
<section >
    {#if (listOfCourses.length <= 0)}
    <span class="loading loading-spinner loading-lg"></span>
    {:else}
        <div class="container flex flex-col lg:flex-row md:flex-col">
            {#each listOfCourses as course}
                <button class="btn m-20"><a href="./course/{course.name}">    <div class="card w-96 bg-base-100 shadow-xl hover:no-underline">
                    <div class="card-body">
                        {#if course.name.startsWith('CS')}
                            <div class="badge badge-primary">Main couse</div>
                        {:else if course.name.startsWith('CC')}
                            <div class="badge badge-accent">Common Course</div>
                        {/if}
                        <h2 class="card-title"><img alt="course icon" src="open-book.png" width="40px">{course.name}</h2>
                        <p >{course.description}</p>
                    </div>
                </div>
                </a>
                </button>
            {/each}
        </div>

        
    {/if}


</section>

<style>

    .btn{
        padding: 0px;
        background: transparent;
        border: 0px;
    }

    .card:hover{
        background-color: rgba(242, 242, 242, 0.68);
        transition: 0.2s;
    }
    a:hover{
        text-decoration: none;
        text-align: center;
    }
</style>