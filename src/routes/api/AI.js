async function logMovies() {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=AIzaSyDGn08OgvqZ2FveNxv65dqldkgQ85YNV7E', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: '{"prompt": {"text": "Write a story about a magic backpack."},"temperature": 1.0,"candidateCount": 2}',
    body: JSON.stringify({
      'prompt': {
        'text': 'Write a story about a magic backpack.'
      },
      'temperature': 1,
      'candidateCount': 2
    })
  });
    const movies = await response.json();
    console.log(movies);
}