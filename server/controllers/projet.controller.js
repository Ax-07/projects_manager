const db = require('../models');
const Specification = db.Specification; 
const Projet = db.Projet;

module.exports.createProjet = async (req, res) => {
    const { name, description, priority, status, specification_id } = req.body;
    console.log('Specification: ', Specification); console.log('Projet: ', Projet);
    try {
        const projet = await Projet.create({
            name,
            description,
            priority,
            status,
            specification_id: specification_id || null
        });
        res.status(201).json(projet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getProjetById = async (req, res) => {
    const { id } = req.params;

    try {
        const projet = await Projet.findByPk(id);
        res.status(200).json(projet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getAllProjet = async (req, res) => {
    try {
        const projets = await Projet.findAll();
        res.status(200).json(projets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.updateProjet = async (req, res) => {
    const { id } = req.params;
    const { name, description, priority, status, specification_id } = req.body;

    try {
        const projet = await Projet.findByPk(id);
        if (projet) {
            // Vérifiez que la spécification existe
            if (specification_id) {
                const specification = await Specification.findByPk(specification_id);
                if (!specification) {
                    return res.status(400).json({ message: 'Specification not found.' });
                }
                projet.specification_id = specification_id;
            }

            projet.name = name;
            projet.description = description;
            projet.priority = priority;
            projet.status = status;

            await projet.save();
            res.status(200).json({ message: 'Data successfully updated.', data: projet });
        } else {
            res.status(404).json({ message: 'Data not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteProjet = async (req, res) => {
    const { id } = req.params;

    try {
        const projet = await Projet.findByPk(id);
        if (projet) {
            await projet.destroy();
            res.status(200).json({ message: 'Data successfully deleted.' });
        } else {
            res.status(404).json({ message: 'Data not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
