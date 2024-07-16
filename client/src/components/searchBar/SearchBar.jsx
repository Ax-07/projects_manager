import React, { useState } from 'react';

// Exemple de liste de projets
const projects = [
    { id: 1, name: 'Project One' },
    { id: 2, name: 'Project Two' },
    { id: 3, name: 'Project Three' },
    // Ajoutez plus de projets selon vos besoins
];

export const ProjectList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProjects, setFilteredProjects] = useState(projects);

    // Gestionnaire d'événements pour la saisie dans l'entrée de recherche
    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        filterProjects(query);
    };

    // Fonction pour filtrer les projets en fonction de la recherche
    const filterProjects = (query) => {
        const filtered = projects.filter((project) =>
            project.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProjects(filtered);
    };

    return (
        <div>
            <label htmlFor="search-bar">Search Projects:</label>
            <input
                type="text"
                id="search-bar"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search..."
            />
            <ul>
                {filteredProjects.map((project) => (
                    <li key={project.id}>{project.name}</li>
                ))}
            </ul>
        </div>
    );
};