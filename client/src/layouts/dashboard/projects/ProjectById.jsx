import { useGetProjetByIdQuery } from "../../../services/apis/projetsApi";
import { Link, useParams } from "react-router-dom";

export const ProjectById = () => {
    const { projectId } = useParams();
    const { data: project = [], error, isLoading } = useGetProjetByIdQuery(projectId);
    console.log("project", project);
    return (
        <section>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <p>{project.priority}</p>
            <p>{project.status}</p>
            <Link to={`/dashboard/projects/${project.specification_id}/specification`}>Voir la specification technique</Link>
        </section>
    );
};