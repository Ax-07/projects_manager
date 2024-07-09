import { Features } from "../../layouts/features/Features";
import { About } from "../../layouts/about/About";
import Hero from "../../layouts/hero/Hero";
import { Pricing } from "../../layouts/pricing/Pricing";
import { Contact } from "../../layouts/contact/Contact";
import { Testimoniales } from "../../layouts/testimonials/Testimoniales";

const Home = () => {
    return (
        <div className="home">
            <Hero />
            <Features />
            <About />
            <Testimoniales />
            <Pricing />
            <Contact />
        </div>
    );
};

export default Home;