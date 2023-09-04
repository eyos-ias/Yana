<script>


    import {collection, getDocs, doc, addDoc, setDoc, query, where, getDoc} from "firebase/firestore";
    import {db} from "$lib/firebase/firebase.js";
    import { page } from '$app/stores'
    import {onMount} from "svelte";
    import {v4 as uuid} from "uuid";
    import {generateQuestions} from "../../api/AI.js";
    import pdfMake from 'pdfmake/build/pdfmake';
	//import {pdfFonts} from 'pdfmake/build/vfs_fonts';

    let listOfChapters = []
    let courseName = $page.params.name
    let newChapter = "";
    let dataLoading = true;
    let exportButtonText = "Export with Quiz"
    async function getChaptersList(){
        
        try {
            // Reference to the user's document in the "users" collection

            const email = localStorage.getItem('email');
            const userDocRef = doc(db, 'users', email);
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
            dataLoading = false;
            return listOfChapters;

        } catch (error) {
            console.error('Error fetching sub-collection documents:', error);
            throw error;
        }
    }

    onMount(()=>{
        getChaptersList();
        //pdfMake.vfs = pdfFonts.pdfMake.vfs;
    })

    async function createChapter(chapterName){
        try {
                // Reference to the user's document in the "users" collection
                const email = localStorage.getItem('email');
                const userDocRef = doc(db, 'users', email);
                // Reference to the "courses" subcollection within the user's document
                const coursesCollectionRef = collection(userDocRef, 'courses');
                // Query for the specific course document based on the "name" field
                const courseQuery = query(coursesCollectionRef, where('name', '==', courseName));

                // Get the query snapshot (should contain only one document)
                const courseQuerySnapshot = await getDocs(courseQuery);
                if (!courseQuerySnapshot.empty) {
                    // Get the reference to the specific course document
                    const courseDocRef = courseQuerySnapshot.docs[0].ref;

                    // Reference to the "chapters" subcollection within the course document
                    const chaptersCollectionRef = collection(courseDocRef, 'chapters');

                    // Loop through the chapters and add them to the "chapters" subcollection
                        const chapterData = {
                            name: newChapter,
                            blocks: [],
                        };
                        await setDoc(doc(chaptersCollectionRef, newChapter), chapterData);
                    // Return the ID of the newly created course
                    //return courseId;
                } else {
                    // Handle the case where the specific course document wasn't found
                    console.error('Specific course document not found.');
                    return null;
                }
            } catch (error) {
                console.error('Error creating a new course with chapters:', error);
                throw error;
            }
        getChaptersList();
        }


    async function getNote(courseName, chapterName) {
        let blocks = [];
        try {
            // Reference to the user's document in the "users" collection
            const email = localStorage.getItem('email');
            const userDocRef = doc(db, 'users', email);
            // Reference to the "courses" subcollection within the user's document
            const coursesCollectionRef = collection(userDocRef, 'courses');
            // Reference to the specific course document within the "courses" subcollection
            const courseDocRef = doc(coursesCollectionRef, courseName);
            // Reference to the "chapters" subcollection within the course document
            const chaptersCollectionRef = collection(courseDocRef, 'chapters');
            // Fetching document with chapter name
            const docRef = doc(chaptersCollectionRef, chapterName);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                blocks = data.blocks;
                return blocks;
            }
        } catch (error) {
            console.error('Error fetching sub-collection documents:', error);
            throw error;
        }
    }

    function printPdf(quizData, notes) {
		const docDefintion = {
			content: [],
			footer:{
				text: 'Y.A.N.A',
				fontSize: 8,
				bold: true,
				alignment: 'center'
			}
		};
        const questions = quizData;
		docDefintion.content.push({
			text: 'Notes',
			fontSize: 28,
			bold: true,
			margin:[0, 10, 0, 20]
		})
      
        for (let note in notes){
         docDefintion.content.push({
			text: notes[note],
			//pageBreak: 'after'
		})   
        }
		

		docDefintion.content.push({
			text: 'Quiz',
			fontSize: 28,
			bold: true,
			margin:[0, 10, 0, 20]
		})
		questions.forEach((q, index) => {
			docDefintion.content.push(
				{ text: `Question ${index + 1}: ${q.question}`, bold: true },
				{   type: 'lower-alpha',
					ol: q.options.map((opt, optIndex) => {
						return {
							text: `${opt}`,
							margin: [20, 0, 0, 0]
						};
					})
				},
				//{ text: `Correct Answer: ${q.answer}\n\n` }
			);
		});

        docDefintion.content.push({ text: '', pageBreak: 'after' });

        docDefintion.content.push(
      { text: 'Answer Key', bold: true },
      {
        ul: questions.map((q, index) => {
          return {
            text: `Question ${index + 1}: ${q.answer}`,
            margin: [20, 0, 0, 0],
          };
        }),
      }
    );
		pdfMake.createPdf(docDefintion).download("quiz");
	}

    async function exportWithQuiz(idx){
        let blocks = await getNote(courseName, listOfChapters[idx]);
        console.log(blocks)
        let notes = blocks.map((ele) => {
            if (ele.tag === 'p') return ele.html;
         });
         let questionSet = await generateQuestions(notes);
        const dataWithoutBackticks = questionSet.candidates[0].output.replace(/^```json|```$/g, '');
        console.log(JSON.parse(dataWithoutBackticks));
        //:TODO update here
        
        

        printPdf(JSON.parse(dataWithoutBackticks), notes);
        



    }




$:{
 console.log(listOfChapters);
}


</script>

<section>

    {#if (listOfChapters.length <= 0 && dataLoading)}
    <span class="loading loading-dots loading-lg"></span>
    {:else}
    <div class="alert alert-info" >
        <span>{courseName}</span>
    </div>
    <div class = "mygrid">
        {#each listOfChapters as chapter, idx }
        <div class="block my-2">
            <div class="card w-96 bg-base-100 shadow-xl ">
                <button class="btn btn-neutral btn-xs w-fit self-end mt-2 mr-2" on:click={async ()=>{
                        exportButtonText = "Loading...";
                        await exportWithQuiz(idx);
                        exportButtonText = "Export With Quiz";


                }}>{exportButtonText}</button>
                <a href="../write/{courseName}/{chapter}">
                <div>
                    <div class="card-body py-2 px-6" >
                        <div class="badge badge-success gap-2">
                            Template
                        </div>
                        <h2 class="card-title"><img alt="chapter icon" src="/bookmark.png" width="40px">{chapter}</h2>
                        <p >{chapter}</p>
                    </div>
                </div>
            </a>
            </div>

        </div>


        {/each}

        <div class="card w-full bg-base-100 shadow-xl " onclick="my_modal_3.showModal()" >
            <div class="card-body">
                <img alt="course icon" src="/add.png" width="30px">
                <h3 class="card-title text-lg" >Add chapter</h3>
            </div>
        </div>

    </div>
    {/if}

</section>


<dialog id="my_modal_3" class="modal">
    <form method="dialog" class="modal-box">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <p class="py-4">Press ESC key or click on <code>✕</code> button to close</p>
        <div class="modalForm flex flex-col gap-2">
            <label for="courseName">Chapter Name</label>
            <input type="text" id="courseName" placeholder="Type here" class="input input-bordered w-full" bind:value={newChapter} />
            </div>
        <button class="btn btn-accent  m-3" on:click={()=>{
          createChapter(newChapter);
      }}>Add Chapter</button>
    </form>
</dialog>


<style>
    section{
        width: fit-content;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    a:hover{
        text-decoration: none;
    }
    .card:hover{
        background-color: #f2f2f29f;
        transition: 0.2s;
    }

</style>