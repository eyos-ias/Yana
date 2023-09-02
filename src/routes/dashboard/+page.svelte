<script>
    import { db } from '$lib/firebase/firebase.js';
    import { collection, getDoc, doc, getDocs, addDoc, setDoc } from "firebase/firestore";
    import {authStore} from "../../stores/authStore.js"
    import {onMount} from "svelte";


    let listOfCourses = [];

    let newCourseName = "";
    let newCourseDescription = "";

    let dataLoading = true;

    async function getCoursesList(){
        //const users_ref = collection(db, 'users');
        try {
        // Get a reference to the sub-collection

        const email = localStorage.getItem('email');

        const users_ref = collection(db, 'users',email, 'courses');
        // Fetch all documents in the sub-collection
        const querySnapshot = await getDocs(users_ref);
        // Extract the data from each document

         listOfCourses =querySnapshot.docs.map((doc) => {
            return doc.data();
        });
         console.log("sdlfkgjsdflgkj",listOfCourses)
        dataLoading = false;

    } catch (error) {
        console.error('Error fetching sub-collection documents:', error);
        throw error;
    }
    }


    onMount(()=>{
        getCoursesList();
    })



    async function createCourse(courseName, courseDescription){
            try {
                // Reference to the user's document in the "users" collection
                const email = localStorage.getItem('email');
                const userDocRef = doc(db, 'users', email);
                // Reference to the "courses" subcollection within the user's document
                const coursesCollectionRef = collection(userDocRef, 'courses');

                // Add a new course document with the provided data
                //const newCourseRef = await addDoc(coursesCollectionRef, );
                const courseDocRef = doc(coursesCollectionRef, courseName);
                await setDoc(courseDocRef, {name: courseName, description: courseDescription});
                getCoursesList()
            } catch (error) {
                console.error('Error creating a new course with chapters:', error);
                throw error;
            }
        }




</script>

<section class="flex flex-col">
    <div class="alert alert-info">
        <span>Welcome back</span>
    </div>
    <div class="flex flex-col min-h-fit">
        {#if (listOfCourses.length <= 0 && dataLoading)}
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

                    <div class="card w-96 bg-base-100 shadow-xl " onclick="my_modal_3.showModal()" >
                        <div class="card-body">
                            <img alt="course icon" src="add.png" width="35px">
                            <h2 class="card-title text-lg" >Add Course</h2>
                        </div>
                    </div>




            </div>

        {/if}
    </div>


<!-- You can open the modal using ID.showModal() method -->
<dialog id="my_modal_3" class="modal">
  <form method="dialog" class="modal-box">
    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      <p class="py-4">Press ESC key or click on <code>✕</code> button to close</p>
      <div class="modalForm flex flex-col gap-2">
          <label for="courseName">Course Name</label>
          <input type="text" id="courseName" placeholder="Type here" class="input input-bordered w-full" bind:value={newCourseName} />
          <label for="courseDesc">Course description:</label>
          <textarea id="courseDesc" class="textarea textarea-bordered w-full" placeholder="Bio" bind:value={newCourseDescription}></textarea>
      </div>
      <button class="btn btn-accent  m-3" on:click={()=>{
          createCourse(newCourseName,newCourseDescription);
      }}>Add Course</button>
  </form>
</dialog>

</section>




<style>

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