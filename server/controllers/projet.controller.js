const db = require('../models');
const { v4: uuidv4 } = require('uuid');
const { createSpec, updateSpec } = require('./specBuilder.controller');
const Specification = db.Specification;
const Projet = db.Projet;

module.exports.createProjet = async (req, res) => {
    const { name, description, priority, status, specification_id, create_spec } = req.body;
    console.log('Specification: ', Specification);
    console.log('Projet: ', Projet);
    console.log('create_spec', create_spec);

    let specId = specification_id;
    let response = null;
    let projet_id = null;
    // const projet_id = uuidv4();

    try {

        projet_id = uuidv4();
        specId = uuidv4();

        const projet = await Projet.create({
            projet_id,
            name,
            description,
            priority,
            status,
            specification_id: specId
        });

        // Si `create_spec` est vrai, créez une spécification d'abord
        if (create_spec) {
            console.log('Creating specification...');
            response = await createSpec({projet_id: projet_id, specification_id: specId, message: description });
            console.log('Specification created with ID:', specId);
        }

        // Créez le projet avec l'ID de la spécification (le cas échéant)
        console.log('Creating project...');
        console.log('name:', name);
        console.log('description:', description);
        console.log('priority:', priority);
        console.log('status:', status);
        console.log('specification_id:', specId);
        


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

            // Mettez à jour uniquement les champs non nuls
            if (name !== undefined) projet.name = name;
            if (description !== undefined) projet.description = description;
            if (priority !== undefined) projet.priority = priority;
            if (status !== undefined) projet.status = status;

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
