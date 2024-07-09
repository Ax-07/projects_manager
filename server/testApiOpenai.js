// Charger les variables d'environnement à partir d'un fichier .env
require('dotenv').config();
const fs = require('fs');

const specbuilderId = "asst_aROZ6OEzz6rh9VY5PGGXADxA";
const specFeatures = "asst_t2MkJK5Entk84NcDbWV7AiJ8"

// Importer et initialiser le client OpenAI avec les clés API et l'organisation
const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Clé API pour accéder aux services OpenAI
    organization: process.env.OPENAI_ORGANIZATION, // ID de l'organisation
    project: process.env.OPENAI_PROJECT // ID du projet
});


// ID de l'assistant que nous allons utiliser
const assistantId = "asst_aROZ6OEzz6rh9VY5PGGXADxA";

// Fonction principale asynchrone
async function main() {
    try {
        // Récupérer les détails de l'assistant spécifique par son ID
        const myAssistant = await openai.beta.assistants.retrieve(assistantId);
        console.log("Assistant retrieved:", myAssistant.id); // Afficher l'ID de l'assistant récupéré

        // Créer un nouveau thread (conversation)
        const thread = await openai.beta.threads.create();
        console.log("Thread created:", thread.id); // Afficher l'ID du thread créé

        // Envoyer un message initial dans le thread
        const message = await openai.beta.threads.messages.create(thread.id, {
            role: "user", // Le rôle de l'expéditeur (ici, l'utilisateur)
            content: "fait la specification technique pour le site web d'une entreprise de plomberie. Réponds en utilisant le format json." // Contenu du message
        });
        console.log("Message sent to thread:", message.id); // Afficher l'ID du message envoyé

        // Commencer le streaming de la réponse de l'assistant
        const response = await openai.beta.threads.runs.stream(thread.id, { assistant_id: myAssistant.id })
            .on('textCreated', (text) => process.stdout.write('\nassistant > ')) // Quand un texte est créé, afficher une ligne 'assistant > '
            .on('textDelta', (textDelta, snapshot) => process.stdout.write(textDelta.value)) // Afficher les dégradés de texte à mesure qu'ils sont générés
            .on('toolCallCreated', (toolCall) => process.stdout.write(`\nassistant > ${toolCall.type}\n\n`)) // Quand un outil est appelé, afficher son type
            .on('toolCallDelta', (toolCallDelta, snapshot) => {
                console.log(toolCallDelta)
                // if (toolCallDelta.type === 'code_interpreter') { // Si le type d'appel d'outil est 'code_interpreter'
                //     if (toolCallDelta.code_interpreter.input) {
                //         process.stdout.write(toolCallDelta.code_interpreter.input); // Afficher l'entrée de l'interprète de code
                //     }
                //     if (toolCallDelta.code_interpreter.outputs) {
                //         process.stdout.write("\noutput >\n");
                //         toolCallDelta.code_interpreter.outputs.forEach(output => {
                //             console.log(output.type); // Afficher le type de sortie de l'interprète de code
                //             if (output.type === "logs") {
                //                 process.stdout.write(`\n${output.logs}\n`); // Afficher les logs de la sortie de l'interprète de code
                //             }
                //         });
                //     }
                // }
            });
            console.log("Assistant response streaming started."); // Afficher que le streaming des réponses a commencé
            console.log("Run completed:", response); // Afficher que le run est terminé

            fs.writeFileSync('response.json', JSON.stringify({ response: response }, null, 2), 'utf8');
            console.log("Response saved as JSON.");

    } catch (error) {
        // Gérer les erreurs potentielles
        if (error.response && error.response.status === 404) {
            console.error('The model does not exist or you do not have access to it.'); // Modèle inexistant ou accès refusé
        } else if (error.code === 'insufficient_quota') {
            console.error('You have exceeded your quota. Please check your plan and billing details.'); // Quota dépassé
        } else if (error.code === 'invalid_api_key') {
            console.error('The provided API key is invalid. Please check your API key.'); // Clé API invalide
        } else {
            console.error('An error occurred:', error.message); // Autre erreur
        }
    }
}

// Appel de la fonction principale
main();