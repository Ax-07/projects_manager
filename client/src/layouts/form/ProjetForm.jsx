import { useState } from "react";
import { useAddProjetMutation, useUpdateProjetMutation } from "../../services/apis/projetsApi";
import { useCreateSpecMutation } from "../../services/apis/specApi";
import { FadeLoader } from "react-spinners";
import { ButtonPrimary, ButtonSecondary } from "../../components/buttons/Buttons";
import { Section } from "../../components/section/Section";

export const ProjetForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    priority: "1",
  });
  const [ isCreate_spec, setIsCreateSpec ] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [createProjet] = useAddProjetMutation();
  const [ updateProjet ] = useUpdateProjetMutation();
  const [ createSpec ] = useCreateSpecMutation();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    console.log('formValues', formValues);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, description, priority, status } = formValues;

    if (!name || !description || !priority) {
      console.error("Veuillez remplir tous les champs");
      return;
    }
    setIsLoading(true);

    let response;
    try {
       response = await createProjet({
        name,
        description,
        priority,
        status,
        create_spec: isCreate_spec
      }).unwrap();
      console.log('response', response);
      console.log('response', response.id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log('isCreate_spec', isCreate_spec);

  return (
    <Section>
      <form onSubmit={onSubmit} className="form">
        <h1>Créer un projet</h1>
        <div>
          <label htmlFor="name">Nom du projet</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={onChange}
            placeholder="Nom du projet"
          />
        </div>
        <div>
          <label htmlFor="description">Description du projet</label>
          <textarea
            id="description"
            name="description"
            value={formValues.description}
            onChange={onChange}
            placeholder="Description du projet"
            rows={4}
          />
        </div>
        <div>
          <label htmlFor="priority">Priorité du projet</label>
          <select
            name="priority"
            id="priority"
            value={formValues.priority}
            onChange={onChange}
          >
            <option value="1">Basse</option>
            <option value="2">Moyenne</option>
            <option value="3">Haute</option>
          </select>
        </div>
        <div>
            <label htmlFor="create_spec">Creez les spécifications techniques</label>
            <input type="checkbox" name="create_spec" id="create_spec" defaultChecked onChange={(e)=> setIsCreateSpec(e.target.checked)}/>
        </div>
        {/* <button type="submit" className="btn">Créer le projet</button> */}
        <ButtonPrimary title="Créer le projet" action={onSubmit} />
        {isLoading && <FadeLoader />}
      </form>
    </Section>
  );
};
