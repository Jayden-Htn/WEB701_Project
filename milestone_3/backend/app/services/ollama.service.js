const generate = (prompt) => {
  return new Promise(function (resolve, reject) {

  // Make data
  const postData = {
    model: "gemma2",
    prompt: prompt,
    stream: false,
  };
  
  // POST request options
  const requestOptions = {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  };
  
  // Make the POST request
  fetch("http://localhost:11434/api/generate", requestOptions)
    .then(response => {
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Parse the JSON response
      return response.json();
    })
    .then(data => {
      // Handle the data returned from the server
      console.log('Post request response:', data);
      resolve(data);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error);
      reject(Error(error));
    });
  });
};

exports.generate = generate;