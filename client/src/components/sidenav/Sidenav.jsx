import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Accordion } from '../accordion/Accordion';
import { useGetProjetsQuery } from '../../services/apis/projetsApi';

export const Sidenav = ({isOpen, setIsOpen}) => {
    const { data: projets = [] } = useGetProjetsQuery(); console.log(projets);

    const data_accordion = [
        {
            title: 'Projects',
            items: [
                { href: '/dashboard/projects', text: 'All projects' },
                ...projets.map((projet) => (
                    { href: `/dashboard/projects/${projet.projet_id}`, text: projet.name }
                )),
            ],
        }
    ];
    
    return (
        <div className={`sidenav ${isOpen ? "" : "sidenav--close"}`}>
            <span className={`sidenav__btn-toggle ${isOpen ? "" : "sidenav__btn-toggle--active"}`} onClick={()=> setIsOpen(!isOpen)}>{">"}</span>
            <div className='sidenav__header'>
                <h1 className='sidenav__title'><Link to={'/dashboard'}>Home</Link></h1>
            </div>
            <Accordion data={data_accordion} />
        </div>
    );
};

Sidenav.propTypes = {
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func
}
