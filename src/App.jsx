import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import TruthOrDare from './pages/TruthOrDare.jsx'
import SpinTheBottle from './pages/SpinTheBottle.jsx'  // ← Add this line

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/truth-or-dare" element={<TruthOrDare />} />
        <Route path="/spin-the-bottle" element={<SpinTheBottle />} />  // ← Add this line
      </Routes>
    </BrowserRouter>
  )
}

export default App