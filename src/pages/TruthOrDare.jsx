import { useState } from 'react'
import { getRandom } from '../data/questions.js'
import { Link } from 'react-router-dom'

const categories = {
  juicy: '🔥 Juicy',
  flirty: '😘 Flirty',
  deep: '🧠 Deep',
  funny: '😂 Funny',
  weird: '🤪 Weird',
  creative: '🎨 Creative',
  classic: '🃏 Classic',
  text: '📱 Text Dares'
}

export default function TruthOrDare() {
  const [category, setCategory] = useState('juicy')
  const [truth, setTruth] = useState('')
  const [dare, setDare] = useState('')
  const [flippedTruth, setFlippedTruth] = useState(false)
  const [flippedDare, setFlippedDare] = useState(false)
  const [isFlipping, setIsFlipping] = useState(false)

  const resetCards = () => {
    setTruth('')
    setDare('')
    setFlippedTruth(false)
    setFlippedDare(false)
  }

  const changeCategory = (cat) => {
    if (isFlipping || cat === category) return
    setCategory(cat)
    resetCards()
  }

  const handleFlip = (type) => {
    if (isFlipping) return
    setIsFlipping(true)

    if (type === 'truth') {
      if (!flippedTruth) setTruth(getRandom('truths', category) || 'No truth available!')
      setFlippedTruth(!flippedTruth)
      if (flippedDare) setFlippedDare(false)
    } else {
      if (!flippedDare) setDare(getRandom('dares', category) || 'No dare available!')
      setFlippedDare(!flippedDare)
      if (flippedTruth) setFlippedTruth(false)
    }

    setTimeout(() => setIsFlipping(false), 600)
  }

  const nextItem = (type, e) => {
    e.stopPropagation()
    if (isFlipping) return
    const item = getRandom(type === 'truth' ? 'truths' : 'dares', category) || `No ${type} available!`
    if (type === 'truth') {
      setFlippedTruth(false)
      setTimeout(() => {
        setTruth(item)
        setFlippedTruth(true)
      }, 150)
    } else {
      setFlippedDare(false)
      setTimeout(() => {
        setDare(item)
        setFlippedDare(true)
      }, 150)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-purple-900 via-pink-900 to-red-900 p-4 md:p-8 text-white">
      {/* Header */}
      <header className="w-full max-w-4xl flex justify-between items-center mb-6">
        <Link to="/" className="text-4xl hover:scale-110 transition">🏠</Link>
        <h1 className="text-4xl md:text-5xl font-extrabold text-center flex-1">
          Truth or Dare
        </h1>
        <div className="w-12" />
      </header>

      {/* Category Selector */}
      <div className="w-full max-w-4xl grid grid-cols-4 md:grid-cols-8 gap-3 mb-6">
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            onClick={() => changeCategory(cat)}
            className={`py-2 px-3 rounded-lg text-sm md:text-base font-semibold transition-all duration-300 shadow-md ${
              category === cat
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black scale-105 shadow-amber-400/70'
                : 'bg-white/15 backdrop-blur hover:bg-white/25'
            }`}
          >
            {categories[cat]}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl justify-center">
        <Card
          type="truth"
          item={truth}
          flipped={flippedTruth}
          onClick={() => handleFlip('truth')}
          nextItem={nextItem}
          flippedState={flippedTruth}
        />
        <Card
          type="dare"
          item={dare}
          flipped={flippedDare}
          onClick={() => handleFlip('dare')}
          nextItem={nextItem}
          flippedState={flippedDare}
        />
      </div>
    </div>
  )
}

function Card({ type, item, flipped, onClick, nextItem, flippedState }) {
  const bgColor = type === 'truth' ? 'from-indigo-800 to-purple-700' : 'from-red-800 to-pink-700'
  const textColor = type === 'truth' ? 'text-amber-300' : 'text-amber-300'

  return (
    <div
      className="relative w-full md:w-72 h-96 perspective-1000 cursor-pointer"
      onClick={onClick}
    >
      <div className={`w-full h-full relative transition-transform duration-1000 ease-in-out preserve-3d ${flipped ? 'rotate-y-180' : ''}`}>
        {/* Back */}
        <div className={`absolute inset-0 backface-hidden rounded-xl shadow-2xl border-4 border-white overflow-hidden`}>
          <div className={`w-full h-full bg-gradient-to-br ${bgColor} flex items-center justify-center`}>
            <h2 className={`text-5xl font-bold ${textColor} drop-shadow-lg`}>
              {type.toUpperCase()}
            </h2>
          </div>
        </div>

        {/* Front */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl shadow-2xl border-4 border-white bg-white/90 flex flex-col justify-between p-6 text-black">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">{`Your ${type.charAt(0).toUpperCase() + type.slice(1)}`}</h2>
          <p className="text-lg md:text-xl text-center flex-1 flex items-center justify-center px-2">{item || 'Tap to reveal...'}</p>
          {flippedState && (
            <button
              onClick={(e) => nextItem(type, e)}
              className="mt-4 w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:scale-105 transition"
            >
              Next {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
