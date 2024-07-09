import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Sidenav = ({isOpen, setIsOpen}) => {
    const projet = useSelector((state) => state?.projetsApi?.queries?.getProjets?.data); console.log("projet", projet);
    const spec = useSelector((state) => state?.specApi); console.log("spec", spec);
    return (
        <div className={`sidenav ${isOpen ? "" : "sidenav--close"}`}>
            <span className={`sidenav__btn-toggle ${isOpen ? "" : "sidenav__btn-toggle--active"}`} onClick={()=> setIsOpen(!isOpen)}>{">"}</span>
            <header>
                <h1>Sidenav</h1>
                <Link to="/dashboard">Home</Link>
                <Link to="/dashboard/projects">Projects</Link>
                <Link to="/dashboard/add-project">Add Project</Link>
            </header>
        </div>
    );
};

Sidenav.propTypes = {
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func
}