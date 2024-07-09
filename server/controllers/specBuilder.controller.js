const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Clé API pour accéder aux services OpenAI
    organization: process.env.OPENAI_ORGANIZATION, // ID de l'organisation
    project: process.env.OPENAI_PROJECT // ID du projet
});
const assistantId = "asst_t2MkJK5Entk84NcDbWV7AiJ8"; // specbuilder 4
const specFeatures = "asst_Zlo51arDUEfmSjlyBC1yxgDn"; 

const db = require('../models');
const Specification = db.Specification;
const Features = db.Feature;
const Backlog = db.Backlog;

module.exports.createSpec = async (req, res) => {
    const { message } = req.body;

    try {
        const myAssistant = await openai.beta.assistants.retrieve(assistantId);
        const thread = await openai.beta.threads.create();
        await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: message
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
                console.log(responseData);
                const jsonResponse = JSON.parse(responseData);

                // Logging model availability
                console.log('Specification model:', Specification !== undefined);
                // Save data to the database
                try {
                    await Specification.create(jsonResponse);

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
};

module.exports.getAllSpec = async (req, res) => {
    try {
        const spec = await Specification.findAll();
        res.status(200).json(spec);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getSpecById = async (req, res) => {
    const { id } = req.params;

    try {
        const spec = await Specification.findByPk(id);
        res.status(200).json(spec);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateSpec = async (req, res) => {
    const { id } = req.params;
    const { introduction, description_des_besoins, architecture_et_conception } = req.body;

    try {
        const spec = await Specification.findByPk(id);
        if (spec) {
            spec.introduction = introduction;
            spec.description_des_besoins = description_des_besoins;
            spec.architecture_et_conception = architecture_et_conception;

            await spec.save();
            res.status(200).json({ message: 'Data successfully updated.', data: spec });
        } else {
            res.status(404).json({ message: 'Data not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteSpec = async (req, res) => {
    const { id } = req.params;

    try {
        const spec = await Specification.findByPk(id);
        if (spec) {
            await spec.destroy();
            res.status(200).json({ message: 'Data successfully deleted.' });
        } else {
            res.status(404).json({ message: 'Data not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getFeaturesFromSpecById = async (req, res) => {
    const { id } = req.params;

    try {
        const spec = await Specification.findByPk(id);
        if (spec) {
            const features = {
                description_des_besoins: spec.description_des_besoins,
            };
            res.status(200).json(features);
        } else {
            res.status(404).json({ message: 'Data not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.createBacklog = async (req, res) => {
    const { id } = req.params;

    try {
        const spec = await Specification.findByPk(id); console.log(spec);
        const myAssistant = await openai.beta.assistants.retrieve(specFeatures); console.log(myAssistant);
        const thread = await openai.beta.threads.create(); console.log(thread);
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
                console.log(responseData);
                const jsonResponse = JSON.parse(responseData);

                // Logging model availability
                console.log('Specification model:', Backlog !== undefined);
                // Save data to the database
                try {
                    await Backlog.create({
                        Backlog: jsonResponse,
                        specification_id: id // Ensure to associate the backlog with the correct specification
                    });
                    res.status(200).json({ message: 'Data successfully saved to the database.', data: jsonResponse });
                } catch (err) {
                    console.error('Error inserting data into database:', err);
                    res.status(500).json({ message: 'Erreur lors de la sauvegarde des données en base de données.' });
                }
                // res.status(200).json(jsonResponse );
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.status(500).json({ message: 'Erreur lors de la conversion de la réponse en JSON.' });
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}