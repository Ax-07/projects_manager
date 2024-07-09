import { useState } from "react";
import { useAddProjetMutation } from "../../services/apis/projetsApi";

export const ProjetForm = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        description: "",
        priority: "1",
    });

    const [createProjet] = useAddProjetMutation();

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const { name, description, priority } = formValues;

        if (!name || !description || !priority) {
            console.error("Veuillez remplir tous les champs");
            return;
        }

        try {
            const response = await createProjet({ name, description, priority }).unwrap();
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="name">Nom du projet</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={onChange}
                />
            </div>
            <div>
                <label htmlFor="description">Description du projet</label>
                <textarea
                    id="description"
                    name="description"
                    value={formValues.description}
                    onChange={onChange}
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
            <button type="submit">Créer le projet</button>
        </form>
    );
};
