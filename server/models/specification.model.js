module.exports = (sequelize, DataTypes) => {
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

    Specification.associate = (models) => {
        Specification.hasMany(models.Projet, {
            foreignKey: 'specification_id',
            as: 'projets'
        });
    };

    return Specification;
};
