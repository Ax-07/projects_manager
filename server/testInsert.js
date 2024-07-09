const { Sequelize, DataTypes } = require('sequelize');

// Initialisation de Sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite' // Chemin vers votre base de données SQLite
});

// Définition des modèles
const Specification = sequelize.define('Specification', {
    introduction: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {
            vue_d_ensemble_du_projet: {
                nom_du_projet: "",
                tagline: "",
                description_du_projet: ".",
                historique_et_justification: ""
            },
            objectifs_du_projet: {
                objectif_general: "",
                objectifs_specifiques: ["", "", "", ""]
            }
        }
    },
    description_des_besoins: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {
            besoins_fonctionnels: [],
            besoins_non_fonctionnels: {
                performance: '',
                securite: '',
                fiabilite: '',
                utilisabilite: ''
            },
            contraintes: {
                techniques: '',
                budgetaires: '',
                reglementaires: '',
                calendrier: ''
            },
            cas_d_utilisation: []
        }
    },
    architecture_et_conception: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {
            architecture_du_systeme: {},
            modele_de_donnees: {},
            interfaces_utilisateur: {},
            scenarios_d_utilisation: []
        }
    }
}, {
    timestamps: true,
    underscored: true
});

const Projet = sequelize.define('Projet', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('todo', 'in_progress', 'done'),
        allowNull: true
    },
    specification_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Specification',
            key: 'id',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }
    }
}, {
    timestamps: true,
    underscored: true
});

// Définir les associations
Specification.hasMany(Projet, { foreignKey: 'specification_id', as: 'projets' });
Projet.belongsTo(Specification, { foreignKey: 'specification_id', as: 'specification' });

// Synchroniser les modèles et les insérer dans une transaction
sequelize.sync({ force: true })
    .then(async () => {
        console.log('Database & tables created!');
        const transaction = await sequelize.transaction();

        try {
            // Insérer une spécification
            const newSpecification = await Specification.create({
                introduction: {
                    vue_d_ensemble_du_projet: {
                        nom_du_projet: "Projet Test",
                        tagline: "Un projet de test",
                        description_du_projet: "Description du projet de test.",
                        historique_et_justification: "Justification du projet de test."
                    },
                    objectifs_du_projet: {
                        objectif_general: "Tester le système",
                        objectifs_specifiques: ["Objectif 1", "Objectif 2"]
                    }
                },
                description_des_besoins: {
                    besoins_fonctionnels: ["Fonctionnalité 1", "Fonctionnalité 2"],
                    besoins_non_fonctionnels: {
                        performance: 'Haute',
                        securite: 'Elevée',
                        fiabilite: 'Grande',
                        utilisabilite: 'Facile'
                    },
                    contraintes: {
                        techniques: 'Contraintes techniques',
                        budgetaires: 'Contraintes budgétaires',
                        reglementaires: 'Contraintes réglementaires',
                        calendrier: 'Contraintes de calendrier'
                    },
                    cas_d_utilisation: ["Cas d'utilisation 1", "Cas d'utilisation 2"]
                },
                architecture_et_conception: {
                    architecture_du_systeme: {},
                    modele_de_donnees: {},
                    interfaces_utilisateur: {},
                    scenarios_d_utilisation: []
                }
            }, { transaction });

            console.log('Specification inserted:', newSpecification.toJSON());

            // Insérer un projet lié à la spécification
            const newProjet = await Projet.create({
                name: "Projet Test",
                description: "Description du projet de test.",
                priority: "medium",
                status: "todo",
                specification_id: newSpecification.id
            }, { transaction });

            console.log('Projet inserted:', newProjet.toJSON());

            // Valider la transaction
            await transaction.commit();

        } catch (error) {
            // Annuler la transaction en cas d'erreur
            await transaction.rollback();
            throw error;
        }

    })
    .catch(error => {
        console.error('Error creating database & tables:', error);
    });
