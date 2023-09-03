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


async function summarizeNotes(notes) {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=AIzaSyDGn08OgvqZ2FveNxv65dqldkgQ85YNV7E', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'prompt': {
                'text': notes +
                    'summarize into one paragraph'
            },
            'temperature': 1,
            'candidateCount': 2
        })
    });
    const summary = await response.json();
    return summary;
}

async function AskNotes(notes,userquestion) {
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=AIzaSyDGn08OgvqZ2FveNxv65dqldkgQ85YNV7E', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          'prompt': {
              'text': notes +
                  userquestion + " based on the above text"
          },
          'temperature': 1,
          'candidateCount': 2
      })
  });
  const answer = await response.json();
  return answer;
}
async function ExplandNotes(paragraph) {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=AIzaSyDGn08OgvqZ2FveNxv65dqldkgQ85YNV7E', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'prompt': {
                'text': paragraph +
                 " expand on this paragraph, respond in text no markup."
            },
            'temperature': 1,
            'candidateCount': 2
        })
    });
    const answer = await response.json();
    return answer;
  }
  

export { generateQuestions, summarizeNotes,AskNotes,ExplandNotes };