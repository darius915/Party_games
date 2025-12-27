import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getRandom } from '../data/questions'
import bottleImg from '../assets/Bouteille-removebg-preview.png'

const categoryNames = {
  juicy: '🔥 Juicy',
  flirty: '😘 Flirty',
  deep: '🧠 Deep',
  funny: '😂 Funny',
  weird: '🤪 Weird',
  creative: '🎨 Creative',
  classic: '🃏 Classic',
  text: '📱 Text'
}

const categories = Object.keys(categoryNames)

export default function SpinTheBottle() {
  const [step, setStep] = useState('mode')
  const [type, setType] = useState('')
  const [category, setCategory] = useState('juicy')
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(null)

  const spin = () => {
    if (spinning) return
    setSpinning(true)
    setResult(null)

    const spins = 7 + Math.random() * 3
    const angle = spins * 360 + Math.random() * 360
    setRotation(prev => prev + angle)

    setTimeout(() => {
      let finalType = type

      if (type === 'random') {
        // Normalize to 0-359°
        const normalizedAngle = (angle % 360 + 360) % 360

        // Starting from right (0° = right side)
        finalType = normalizedAngle < 180 ? 'dare' : 'truth'
      }

      const finalCategory =
        type === 'random'
          ? categories[Math.floor(Math.random() * categories.length)]
          : category

      setResult({
        type: finalType,
        text: getRandom(finalType + 's', finalCategory),
        category: finalCategory
      })

      setSpinning(false)
    }, 5200)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white flex flex-col items-center px-6 py-8">

      {/* Header */}
      <header className="w-full max-w-6xl flex justify-between items-center mb-6">
        <Link to="/" className="text-3xl opacity-80 hover:opacity-100">🏠</Link>
        <h1 className="text-3xl md:text-5xl font-extrabold">Spin the Bottle</h1>
        <div />
      </header>

      {/* MODE SELECTION */}
      {step === 'mode' && (
        <div className="max-w-xl w-full space-y-6 text-center mt-16">
          {['truth', 'dare', 'random'].map(m => (
            <button
              key={m}
              onClick={() => {
                setType(m)
                m === 'random' ? setStep('spin') : setStep('category')
              }}
              className={`w-full py-6 rounded-2xl text-2xl font-bold transition
                ${m === 'truth' && 'bg-indigo-600 hover:bg-indigo-500'}
                ${m === 'dare' && 'bg-rose-600 hover:bg-rose-500'}
                ${m === 'random' && 'bg-amber-400 text-black hover:bg-amber-300'}
              `}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* CATEGORY SELECTION */}
      {step === 'category' && (
        <div className="max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat)
                setStep('spin')
              }}
              className="py-4 rounded-xl bg-white/10 hover:bg-white/20 transition"
            >
              {categoryNames[cat]}
            </button>
          ))}
        </div>
      )}

      {/* SPIN EXPERIENCE */}
      {step === 'spin' && (
        <div className="flex-1 flex flex-col items-center justify-start w-full mt-6">

          {/* SPIN ARENA */}
          <div className="relative w-96 h-96 md:w-[520px] md:h-[520px] flex items-center justify-center">

            {/* LEFT / RIGHT INDICATORS */}
            {type === 'random' && (
              <>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-indigo-400 font-bold text-lg">
                  TRUTH
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-rose-400 font-bold text-lg">
                  DARE
                </div>
              </>
            )}

            {/* BOTTLE */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-[5200ms] ease-out"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <img
                src={bottleImg}
                alt="Bottle"
                className="w-32 md:w-40 drop-shadow-[0_30px_40px_rgba(0,0,0,0.8)]"
              />

              {/* POP-UP RESULT */}
              {result && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-xs bg-white rounded-3xl p-6 text-black text-center shadow-2xl animate-fade-in">
                  <h2 className="text-2xl md:text-3xl font-black mb-2">
                    {result.type.toUpperCase()}
                  </h2>
                  <p className="text-base md:text-xl mb-2">{result.text}</p>
                  <p className="font-bold text-purple-700">{categoryNames[result.category]}</p>
                  <button
                    onClick={spin}
                    className="mt-4 w-full py-3 rounded-full bg-emerald-600 text-white font-bold hover:bg-emerald-500"
                  >
                    Spin Again
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* SPIN BUTTON */}
          {!spinning && !result && (
            <button
              onClick={spin}
              className="mt-6 px-16 py-5 rounded-full text-xl font-extrabold bg-amber-400 text-black hover:scale-105 transition"
            >
              SPIN
            </button>
          )}
        </div>
      )}
    </div>
  )
}
