import { Navigate, Route, Routes } from 'react-router'
import Footer from './components/Footer.jsx'
import Navegacion from './components/Navegacion.jsx'
import Destinos from './pages/Destinos.jsx'
import Inicio from './pages/Inicio.jsx'
import Viajes from './pages/Viajes.jsx'
import PaginaNoEncontrada from "./pages/PaginaNoEncontrada.jsx"
import './App.css'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navegacion />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/destinos" element={<Destinos />} />
          <Route path="/viajes" element={<Viajes />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
