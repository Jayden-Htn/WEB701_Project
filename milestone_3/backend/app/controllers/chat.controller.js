const { Ollama, ollama } = require('ollama');

let client;
let conversationHistory = [];

exports.startModel = async (req, res) => {
  console.log("Starting setup");

  const setupPrompt = `You are Chip, chatbot for Re:Tech, a New Zealand-based charity 
  providing refurbished technology to those in need. Re:Tech collects and refurbishes old devices to bridge the digital 
  divide, offering essential technology for education, work, and personal growth. Supported by donations and volunteers, 
  Re:Tech ensures access to affordable tech for those lacking resources. Located at 114 Recycle Lane, Tahunanui, Nelson, 
  Re:Tech is led by a Board of Trustees: Emily Patterson (Chairperson), David Wright (Vice-Chairperson), Sarah Lee 
  (Secretary), Anna Green (Treasurer), and many volunteers. 

  How it works: Community members and businesses donate old devices and funds. Re:Tech professionally refurbishes these 
  items, providing individuals in need with tokens redeemable for technology that suits their needs.

  Tone: Friendly, empathetic. Write as concise and short responses as you can. Do not include links. Don't introduce yourself.
  
  Key Responsibilities: Answer questions about Re:Tech's mission, donation process, and how to apply for technology.
  Direct users to the contact page for further support when needed.

  Email: email@retech.com
  Phone: 123456789 (8am-5pm Mon-Fri)

  Stats: 357 devices donated to our community, 287 people benefited through Re:Tech, 3 years of supporting Nelson/Tasman`

  try {
    client = await new Ollama();
    // Pre-prompt model with Re:Tech info
    const response = await client.chat({
      model: 'gemma2',
      messages: [{ role: 'system', content: setupPrompt }]
    });
    conversationHistory.push({ role: 'system', content: setupPrompt });
    console.log("Started client model");
    return res.status(200).json({ message: "Client model started" });
  }
  catch (err) {
    console.log("Setup error:", err);
    return res.status(500).json({ message: `Error starting client model, ${err}` });
  }
}

exports.generateResponse = async (req, res) => {
  // Handle input prompt
  const prompt = req.body.message; //req.query.message for API test with query param
  if (!prompt) {
    console.log("Error 400: No prompt");
    return res.status(400).json({ message: 'Prompt is required' });
  }
  conversationHistory.push({ role: 'assistant', content: prompt });

  // Check client
  if (client == null) {
    console.log("Error 500: No client model");
    return res.status(500).json({ message: 'Please initialise a client model' });
  }

  // Generate response
  try {
    console.log("Generating response");

    const response = await client.chat({
      model: 'gemma2',
      messages: conversationHistory
    });
    conversationHistory.push({ role: 'assistant', content: response.message.content });
    console.log(response);
    return res.status(200).json({ message: response });
  } catch (error) {
    console.log("Error 500: Fail to generate response", error);
    return res.status(500).json({ message: 'Failed to generate response' });
  }
}