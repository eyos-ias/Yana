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
        Loading...
    {:else}
        {listOfCourses}
    {/if}


</section>