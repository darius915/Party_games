import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import TruthOrDare from './pages/TruthOrDare.jsx'
import SpinTheBottle from './pages/SpinTheBottle.jsx'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/truth-or-dare" element={<TruthOrDare />} />
        <Route path="/spin-the-bottle" element={<SpinTheBottle />} />
      </Routes>
    </HashRouter>
  )
}

export default App
