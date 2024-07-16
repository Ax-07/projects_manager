module.exports = (sequelize, DataTypes) => {
    const Specification = sequelize.define('Specification', {
        specification_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        projet_id: {
            type: DataTypes.UUID,
            allowNull: true
        },
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
        },

    }, {
        timestamps: true,
        underscored: true,
        tableName: 'specifications' // Définir explicitement le nom de la table ici
    });

    return Specification;
};
