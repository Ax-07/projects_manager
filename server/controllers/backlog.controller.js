const db = require('../models');
const Specification = db.Specification;
const Backlog = db.Backlog;
const Ticket = db.Ticket;
const Projet = db.Projet;
const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Clé API pour accéder aux services OpenAI
    organization: process.env.OPENAI_ORGANIZATION, // ID de l'organisation
    project: process.env.OPENAI_PROJECT // ID du projet
});


module.exports.createBacklog = async (req, res) => {
    const { id } = req.params;

    try {
        const spec = await Specification.findByPk(id);
        if (!spec) {
            return res.status(404).json({ message: 'Specification not found.' });
        }

        // Récupérer le projet associé à la spécification
        const projet = await Projet.findOne({ where: { specification_id: id } });
        if (!projet) {
            return res.status(404).json({ message: 'Projet not found.' });
        }

        const myAssistant = await openai.beta.assistants.retrieve(process.env.BACKLOG_ASSISTANT);
        const thread = await openai.beta.threads.create();
        await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: JSON.stringify(spec.description_des_besoins)
        });

        let responseData = '';
        const response = await openai.beta.threads.runs.stream(thread.id, { assistant_id: myAssistant.id })
            .on('textDelta', (textDelta, snapshot) => {
                responseData += textDelta.value;
            });

        response.on('end', async () => {
            try {
                // Remove backticks and clean the response data
                responseData = responseData.replace(/```json\n/, '').replace(/```/, '');
                const jsonResponse = JSON.parse(responseData);
                console.log('JSON response:', jsonResponse);
                // Save data to the database
                try {
                    const backlog = await Backlog.create({
                        projet_id: projet.projet_id, // Associer le backlog au projet
                        specification_id: id // Associer le backlog à la spécification
                    });

                    // Create associated tickets
                    // const backlogs = jsonResponse.backlog || []; 
                    // for (const ticket of backlogs) {
                    //     console.log('Creating ticket:', ticket); // Log pour débogage
                    //     await Ticket.create({
                    //         titre: ticket.titre,
                    //         description: ticket.description,
                    //         priorite: ticket.priorité,
                    //         estimation: ticket.estimation,
                    //         equipe_responsable: ticket.équipe_responsable,
                    //         user_story: ticket.histoire_utilisateur,
                    //         score: ticket.score,
                    //         dependances: ticket.dépendances,
                    //         risques_potentiels: ticket.risques_potentiels,
                    //         ressources_necessaires: ticket.ressources_necessaires,
                    //         statut: ticket.statut,
                    //         backlog_id: backlog.backlog_id
                    //     });
                    // }

                    res.status(200).json({ message: 'Data successfully saved to the database.', data: jsonResponse });
                } catch (err) {
                    console.error('Error inserting data into database:', err);
                    res.status(500).json({ message: 'Erreur lors de la sauvegarde des données en base de données.' });
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.status(500).json({ message: 'Erreur lors de la conversion de la réponse en JSON.' });
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getBacklogById = async (req, res) => {
    const { id } = req.params;

    try {
        const backlog = await Backlog.findByPk(id, {
            include: [{ model: Ticket, as: 'tickets' }]
        });
        res.status(200).json(backlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getAllBacklog = async (req, res) => {
    try {
        const backlogs = await Backlog.findAll();
        res.status(200).json(backlogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getBacklogBySpecificationId = async (req, res) => {
    const { id } = req.params;

    try {
        const backlogs = await Backlog.findAll({
            where: { specification_id: id },
            include: [{ model: Ticket, as: 'tickets' }]
        });
        res.status(200).json(backlogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.updateBacklog = async (req, res) => {
    const { id } = req.params;
    const { Backlog, specification_id } = req.body;

    try {
        const backlog = await Backlog.findByPk(id);
        if (backlog) {
            backlog.Backlog = Backlog;
            backlog.specification_id = specification_id;

            await backlog.save();
            res.status(200).json({ message: 'Data successfully updated.', data: backlog });
        } else {
            res.status(404).json({ message: 'Data not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.deleteBacklog = async (req, res) => {
    const { id } = req.params;

    try {
        const backlog = await Backlog.findByPk(id);
        if (backlog) {
            await backlog.destroy();
            res.status(200).json({ message: 'Data successfully deleted.' });
        } else {
            res.status(404).json({ message: 'Data not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}