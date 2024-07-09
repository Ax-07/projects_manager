require('dotenv').config();
const OpenAI = require("openai");
const fs = require('fs');
const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION,
    project: process.env.OPENAI_PROJECT
});
const specbuilderId = "asst_aROZ6OEzz6rh9VY5PGGXADxA";

async function main() {
  try {
    const myAssistant = await openai.beta.assistants.retrieve(specbuilderId);
    console.log("Assistant retrieved:", myAssistant.id);

    const thread = await openai.beta.threads.create();
    console.log("Thread created:", thread.id);

    const message = await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: "fait la specification technique pour le site web d'une entreprise de plomberie. Réponds en utilisant le format json."
    });
    console.log("Message sent to thread:", message.id);

    // Exécuter le run pour obtenir la réponse
    const run = await openai.beta.threads.runs.create(thread.id, { assistant_id: myAssistant.id });
    console.log("Run started:", run);

    // Attendre la fin du run
    // const result = await openai.beta.threads.runs.stream(thread.id, { assistant_id: myAssistant.id });
    // Collecter la réponse en utilisant le stream
    let completeResponse = '';
    await new Promise((resolve, reject) => {
      openai.beta.threads.runs.stream(run.id, { assistant_id: myAssistant.id })
        .on('textDelta', (textDelta, snapshot) => {
          process.stdout.write(textDelta.value);
          completeResponse += textDelta.value;
        })
        .on('end', () => {
          resolve();
        })
        .on('error', (error) => {
          reject(error);
        });
    });

    // Sauvegarder la réponse au format JSON
    fs.writeFileSync('response.json', JSON.stringify({ response: completeResponse }, null, 2), 'utf8');
    console.log("Response saved as JSON.");
    
    console.log("Run completed:", result);
    // Sauvegarder la réponse au format JSON
    // fs.writeFileSync('response.json', JSON.stringify(result, null, 2), 'utf8');
    // console.log("Response saved as JSON.");

  } catch (error) {
    if (error.code === 'insufficient_quota') {
      console.error('You have exceeded your quota. Please check your plan and billing details.');
    } else if (error.code === 'invalid_api_key') {
      console.error('The provided API key is invalid. Please check your API key.');
    } else {
      console.error('An error occurred:', error.message);
    }
  }
}

main();
