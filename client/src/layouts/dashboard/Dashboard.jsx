import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Sidenav } from "../../components/sidenav/Sidenav";
import { useGetProjetsQuery } from "../../services/apis/projetsApi";
import { useGetSpecsQuery } from "../../services/apis/specApi";
import { ProjetForm } from "../form/ProjetForm";
import { Dashboard_Home } from "./home/Dashboard_Home";
import { Projects } from "./projects/Projects";
import { ProjectById } from "./projects/ProjectById";
import { Spec } from "./spec/Spec";

export const Dashboard = () => {
    const [sidenavIsOpen, setSidenavIsOpen] = useState(true);
    const { data: projets = [], error, isLoading: projetLoading } = useGetProjetsQuery();
    return (
        <div className="dashboard">
            <Sidenav isOpen={sidenavIsOpen} setIsOpen={setSidenavIsOpen}/>
            <aside className={`dashboard__content ${sidenavIsOpen ? "" : "dashboard__content--full-width"}`}>
                <Routes>
                    <Route path="/" element={<Dashboard_Home />} />
                    <Route path="/projects" element={<Projects projects={projets} />} />
                    <Route path="/projects/:projectId" element={<ProjectById />} />
                    <Route path="/projects/:projetId/specification" element={<Spec />} />
                    <Route path="/add-project" element={<ProjetForm />} />
                </Routes>
                {/* <ProjetForm /> */}
            </aside>
        </div>
    );
};