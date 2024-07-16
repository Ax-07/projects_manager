import { useState } from "react";

export const SPecForm = () => {
    const [formValues, setFormValues] = useState({
        description: "",
      });

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
      };

    return (
        <form onSubmit={onSubmit} className="form">
            <h1>Creer une spécification technique</h1>
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
        </form>
    );
};