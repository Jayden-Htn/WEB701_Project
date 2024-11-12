const { generate } = require("../services/ollama.service.js");
const config = require("../config/chat.config");

let context = config.context;

exports.startModel = async (req, res) => {
  console.log("Starting setup (pre-prompting)");

  try {
    generate(config.preprompt, context)
      .then((response) => {
        context = response.context; // Overwrite context if desired
        return res.status(200).json(response.response);
      }).catch((err) => {
        throw new Error(err);
      });
  }
  catch (err) {
    console.log("Setup error:", err);
    return res.status(500).json({ message: `Error starting client model, ${err}` });
  }
}

exports.generateResponse = async (req, res) => {
  console.log("Generating chat response");

  // Handle input prompt
  const prompt = req.body.message; 
  // req.query.message for API test with query param
  if (!prompt) {
    console.log("Error 400: No prompt");
    return res.status(400).json({ message: 'Prompt is required' });
  }

  // Generate response
  try {
    generate(prompt, context = config.context)
      .then((response) => {
        return res.status(200).json(response.response);
      }).catch((err) => {
        throw new Error(err);
      });
  }
  catch (err) {
    console.log("Generate error:", err);
    return res.status(500).json({ message: `Error generating response, ${err}` });
  }
}