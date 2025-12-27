import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-pink-900 to-red-900 flex flex-col items-center justify-center px-6 py-12 text-white">
      {/* Title */}
      <h1 className="text-6xl md:text-8xl font-extrabold mb-12 drop-shadow-2xl text-center tracking-tight">
        Adult Party Games <span className="inline-block animate-pulse">😈</span>
      </h1>

      <p className="text-xl md:text-2xl mb-16 opacity-90 text-center max-w-2xl">
        Spicy, fun, and unforgettable nights with friends 🍻🔥
      </p>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl w-full">
        {/* Truth or Dare */}
        <Link
          to="/truth-or-dare"
          className="group relative bg-white/10 backdrop-blur-lg rounded-3xl p-12 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 shadow-2xl border border-white/20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 text-center">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-purple-300">
              Truth or Dare
            </h2>
            <p className="text-xl md:text-2xl opacity-90">
              Classic spicy challenges 😏
            </p>
          </div>
        </Link>

        {/* Spin the Bottle */}
        <Link
          to="/spin-the-bottle"
          className="group relative bg-white/10 backdrop-blur-lg rounded-3xl p-12 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 shadow-2xl border border-white/20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 text-center">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-pink-300">
              Spin the Bottle
            </h2>
            <p className="text-xl md:text-2xl opacity-90">
              Who will it land on? 🍾
            </p>
          </div>
        </Link>

        {/* Random Questions */}
        <Link
          to="/random-questions"
          className="group relative bg-white/10 backdrop-blur-lg rounded-3xl p-12 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 shadow-2xl border border-white/20 overflow-hidden md:col-span-2 lg:col-span-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 text-center">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-cyan-300">
              Random Questions
            </h2>
            <p className="text-xl md:text-2xl opacity-90">
              Deep, funny, or wild chats 🌙
            </p>
          </div>
        </Link>
      </div>

      {/* Footer Note */}
      <p className="mt-20 text-lg opacity-70 text-center">
        18+ only • Perfect for parties, dates, or game nights
      </p>
    </div>
  )
}