import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSpecData } from "../../../hooks/useSpecData";
import { Loading } from "../../../components/loading/Loading";
import { Error } from "../../../components/errors/Error";
import { Section } from "../../../components/section/Section";

export const Spec = () => {
    const { spec, error, isLoading } = useSpecData();

  useEffect(() => {
    console.log("spec", spec);
  }, [spec]);

  if (isLoading) return <Loading/>;
  if (error) return <Error message={error}/>;

  return (
    <div className="spec">
      <h1>Spécifications techniques</h1>

      <Section title="Introduction">
      <article className="vue-d-ensemble">
          <h3>Vue d'ensemble du projet</h3>
          <p><strong>Nom du projet:</strong> {spec?.introduction?.vue_d_ensemble_du_projet?.nom_du_projet}</p>
          <p><strong>Tagline:</strong> {spec?.introduction?.vue_d_ensemble_du_projet?.tagline}</p>
          <p><strong>Description du projet:</strong> {spec?.introduction?.vue_d_ensemble_du_projet?.description_du_projet}</p>
          <p><strong>Historique et justification:</strong> {spec?.introduction?.vue_d_ensemble_du_projet?.historique_et_justification}</p>
        </article>
        <article className="objectif">
          <h3>Objectif</h3>
          <h4>Objectif général:</h4>
          <p>{spec?.introduction?.objectifs_du_projet?.objectif_general}</p>
          <h4>Objectifs spécifiques:</h4>
          <ul>{renderList(spec?.introduction?.objectifs_du_projet?.objectifs_specifiques || [])}</ul>
        </article>
      </Section>

      <Section title="Description des besoins">
        <article className="besoins-fonctionnels">
          <h3>Besoins fonctionnels:</h3>
          <ul>
            {spec?.description_des_besoins?.besoins_fonctionnels?.map((besoin, i) => (
              <li key={i}><Besoins_fonctionnels data={besoin} /></li>
            ))}
          </ul>
        </article>
        <article className="besoins-non-fonctionnels">
          <h3>Besoins non fonctionnels:</h3>
          <p>Performances: {spec?.description_des_besoins?.besoins_non_fonctionnels?.performance}</p>
          <p>Sécurité: {spec?.description_des_besoins?.besoins_non_fonctionnels?.securite}</p>
          <p>Fiabilité: {spec?.description_des_besoins?.besoins_non_fonctionnels?.fiabilite}</p>
          <p>Utilisabilité: {spec?.description_des_besoins?.besoins_non_fonctionnels?.utilisabilite}</p>
        </article>
        <article className="contraintes">
          <h3>Contraintes:</h3>
          <p>Techniques: {spec?.description_des_besoins?.contraintes?.techniques}</p>
          <p>Budgétaires: {spec?.description_des_besoins?.contraintes?.budgetaires}</p>
          <p>Réglementaires: {spec?.description_des_besoins?.contraintes?.reglementaires}</p>
          <p>Calendrier: {spec?.description_des_besoins?.contraintes?.calendrier}</p>
        </article>
        <article className="cas-d-utilisation">
          <h3>Cas d'utilisations:</h3>
          <ul>{renderList(spec?.description_des_besoins?.cas_d_utilisation?.map(cas => cas.cas) || [])}</ul>
        </article>
      </Section>

      <Section title="Architecture et conception">
        <article>
          <h3>Architecture système</h3>
          <h4>Composants principaux:</h4>
          <ul>
            {spec?.architecture_et_conception?.architecture_du_systeme?.composants_principaux &&
              Object.entries(spec?.architecture_et_conception?.architecture_du_systeme?.composants_principaux).map(([key, value], i) => (
                <li key={i}><p><strong>{key}:</strong> {value}</p></li>
              ))}
          </ul>
          <h4>Interaction entre les composants:</h4>
          <ul>{renderList(spec?.architecture_et_conception?.architecture_du_systeme?.interaction_entre_les_composants || [])}</ul>
        </article>
        <article>
          <h3>Modèle de données</h3>
          <h4>Entités principales:</h4>
          <ul>
            {spec?.architecture_et_conception?.modele_de_donnees?.entites_principales &&
              Object.entries(spec?.architecture_et_conception?.modele_de_donnees?.entites_principales).map(([key, value], i) => (
                <li key={i}><p><strong>{key}:</strong> {value.join(', ')}</p></li>
              ))}
          </ul>
          <h4>Relations:</h4>
          <ul>{renderList(spec?.architecture_et_conception?.modele_de_donnees?.relations || [])}</ul>
        </article>
        <article>
          <h3>Interfaces utilisateur</h3>
          <h4>Maquettes:</h4>
          <ul>
            {spec?.architecture_et_conception?.interfaces_utilisateur?.maquettes?.map((maquette, i) => (
              <li key={i}>
                <h5>Page {Object.keys(maquette)[0]}:</h5>
                <ul>
                  {Object.values(maquette)[0].map((detail, j) => (
                    <li key={j}><p>{detail}</p></li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </article>
        <article>
          <h3>Scénarios d'utilisation</h3>
          <ul>{renderList(spec?.architecture_et_conception?.scenarios_d_utilisation?.map(scenario => scenario.scenario) || [])}</ul>
        </article>
      </Section>
    </div>
  );
};

const Besoins_fonctionnels = ({ data }) => {
  return (
    <div>
      <h4>
        {data.fonctionnalite}
      </h4>
      <p><strong>Description: </strong>{data.description_detaillee}</p>
      <p><strong>User storie: </strong>{data.user_storie}</p>
      <p><strong>Technologie recommandée: </strong>{data.technologie_recommandee}</p>
      <p><strong>Details de réalisation: </strong></p>
      <ul>
        {renderList(data.details_de_realisation || [])}
      </ul>
    </div>
  );
};

const renderList = (items) => items.map((item, i) => <li key={i}><p>{item}</p></li>);


Spec.propTypes = {
  spec: PropTypes.object,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
};

Besoins_fonctionnels.propTypes = {
  data: PropTypes.object,
};
