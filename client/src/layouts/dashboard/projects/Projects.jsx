import PropTypes from 'prop-types';

export const Projects = ({ projects }) => {
    return (
        <section>
            {projects.map((project) => (
                <div key={project.id}>
                    <h2>{project.name}</h2>
                    <p>{project.description}</p>
                </div>
            ))}
        </section>
    );
};

Projects.propTypes = {
    projects: PropTypes.array,
};