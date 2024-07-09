import { Link } from "react-router-dom";
import { ButtonPrimary, ButtonSecondary } from "../../components/buttons/Buttons";
import heroImg from '../../assets/images/03_mk6 Image 1.png';
import design from '../../assets/images/Design.png';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero__wrapper">
                <div className="hero__col hero__col-left">
                    <h1 className="hero__title">Gestion de projet intelligente</h1>
                    <p className="hero__subtitle">Gérez vos projets sans effort grâce à la rapidité et l'intelligence de Projects Manager. Créez des spécifications techniques, organisez vos tâches et planifiez vos sprints en quelques clics.</p>
                    <div className="hero__cta">
                        <Link to="/dashboard" className="button button__primary">Get started for free</Link>
                        <Link to="/pricing" className="button button__secondary">View Pricing</Link>
                    </div>
                </div>
                <div className="hero__col hero__col-right">
                    <img src={design} alt="design"/>
                    <img src={heroImg} alt="photo du hero"/>
                </div>
            </div>
        </section>
    );
};

export default Hero;