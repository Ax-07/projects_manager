import { Routes, Route } from 'react-router-dom';
import { Footer } from './layouts/footer/Footer';
import { Header } from './layouts/header/Header';
import Home from './pages/home/Home';
import { About } from './layouts/about/About';
import { Contact } from './layouts/contact/Contact';
import { Dashboard } from './layouts/dashboard/Dashboard';
import { Pricing } from './layouts/pricing/Pricing';

function App() {

  return (
    <div className='app'>
      <Header />
      <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard/*' element={<Dashboard />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
      </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
