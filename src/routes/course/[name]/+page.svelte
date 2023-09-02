<script>
    import {collection, getDocs, doc} from "firebase/firestore";
    import {db} from "$lib/firebase/firebase.js";
    import { page } from '$app/stores'


    let listOfChapters = []

    async function getChaptersList(){
        let courseName = $page.params.name
        try {
            // Reference to the user's document in the "users" collection
            const userDocRef = doc(db, 'users', 'nf.naol9@gmail.com');
            // Reference to the "courses" subcollection within the user's document
            const coursesCollectionRef = collection(userDocRef, 'courses');
            // Reference to the specific course document within the "courses" subcollection
            const courseDocRef = doc(coursesCollectionRef, courseName);
            // Reference to the "chapters" subcollection within the course document
            const chaptersCollectionRef = collection(courseDocRef, 'chapters');
            // Fetch all documents in the "chapters" subcollection
            const querySnapshot = await getDocs(chaptersCollectionRef);
            // Extract the data from each document in the subcollection
            listOfChapters = querySnapshot.docs.map((doc) => doc.data().name);
            console.log(listOfChapters)
            return listOfChapters;
        } catch (error) {
            console.error('Error fetching sub-collection documents:', error);
            throw error;
        }
    }
    getChaptersList();



</script>
<section>
    {#if (listOfChapters.length <= 0)}
    <span class="loading loading-dots loading-lg"></span>
    {:else}
        {listOfChapters}
    {/if}
</section>