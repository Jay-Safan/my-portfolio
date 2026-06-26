import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import SideProjects from './components/SideProjects'
import Skills from './components/Skills'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import CursorGlow from './components/CursorGlow'

export default function App() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <SideProjects />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
