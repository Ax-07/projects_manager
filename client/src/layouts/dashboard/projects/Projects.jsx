import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ProgressBar } from '../../../components/progressBar/ProgressBar';
import { useSpecData } from '../../../hooks/useSpecData';

export const Projects = ({ projects }) => {
    const { features } = useSpecData(); console.log(features.length);
    return (
        <section className='project'>
            <h1 className='project__title'>Projets</h1>
            {projects.map((project) => (
                <Link to={`/dashboard/projects/${project.projet_id}`} key={project.projet_id} className='project__card'>
                    <h2 className='project__name'>{project.name}</h2>
                    <p className='project__description'>{project.description}</p>
                    <p className='project__priority'>{project.priority}</p>
                    <div className='project__wrapper'>
                        <ProgressBar progress={project.progress} />
                        <p className='project__status'>{project.status}</p>
                    </div>
                </Link>
            ))}
        </section>
    );
};

Projects.propTypes = {
    projects: PropTypes.array,
};

const EditBar = ({ project }) => {
    return (
        <div className='edit-bar'>
            <Link to={`/dashboard/projects/${project.projet_id}/edit`}>Modifier</Link>
            <Link to={`/dashboard/projects/${project.projet_id}/delete`}>Supprimer</Link>
        </div>
    );
};

EditBar.propTypes = {
    project: PropTypes.object,
};