<script>
    import {collection, getDocs, doc} from "firebase/firestore";
    import {db} from "$lib/firebase/firebase.js";
    import { page } from '$app/stores'

    let listOfChapters = []
    let courseName = $page.params.name
    async function getChaptersList(){
        
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
    <div class="alert alert-info" style="margin-bottom: 30px;">
        <span>{courseName}</span>
    </div>
    <div class = "mygrid">
        {#each listOfChapters as chapter }

        <a href="../write/{courseName}/{chapter}">
            <div class="card w-96 bg-base-100 shadow-xl ">
                <div class="card-body" >
                     <!-- if chapter.status="Completed" -->
                        <div class="badge badge-success gap-2">
                         Completed
                        </div>
                    <!-- {:else if chapter.status = "ongoing"}
                    <div class="badge badge-warning gap-2">
                        On-going
                    </div>
                    {:else}
                    <div class="badge badge-error gap-2">
                        Not started
                    </div>
                    {/if}   -->
                    <h2 class="card-title"><img alt="chapter icon" src="/bookmark.png" width="40px">{chapter}</h2>
                    <p >{chapter}</p>
                </div>
            </div>
        </a>
        
        {/each}
                     <button onclick="my_modal_3.showModal()" class="btn">
                    <div class="card w-96 bg-base-100 shadow-xl ">
                        <div class="card-body">
                            <img alt="course icon" src="/add.png" width="60px">
                            <h2 class="card-title text-lg" >Add chapter</h2>
                        </div>
                    </div>
                </button>
    </div>
    {/if}
</section>
<dialog id="my_modal_3" class="modal">
    <form method="dialog" class="modal-box">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      <p class="py-4">Press ESC key or click on ✕ button to close</p>
      <input style="margin:70px; margin-bottom:0px; margin-top:30px;" type="text" placeholder="chapter number" class="input input-bordered input-info w-full max-w-xs" />
      <input style="margin:70px;margin-top:30px; "type="text" placeholder="chapter name" class="input input-bordered input-info w-full max-w-xs" />
      
    </form>
  </dialog>
<style>
    .mygrid
    {
        display: grid;
        grid-template-columns: auto auto auto auto;
        row-gap: 50px;
        column-gap: 50px;
    }
    a{
        text-decoration: none;
    }
    .card:hover{
        background-color: #f2f2f29f;
        transition: 0.2s;
    }
    .btn{
        padding: 0px;
        background: transparent;
        border: 0px;
    }
</style>