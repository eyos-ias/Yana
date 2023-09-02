async function generateQuestions(notes) {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=AIzaSyDGn08OgvqZ2FveNxv65dqldkgQ85YNV7E', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'prompt': {
        'text': notes +
            'Generate 5 multiple choice questions on the above text in json format`'
      },
      'temperature': 1,
      'candidateCount': 2
    })
  });
    const movies = await response.json();
    return movies;
}

export default generateQuestions;