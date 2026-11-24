import ListadoDestinos from '../components/ListadoDestinos.jsx'

function Destinos() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <header className="max-w-3xl">
        <p className="font-bold uppercase tracking-[0.16em] text-emerald-700">
          Encuentra inspiración
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-emerald-950 sm:text-5xl">
          Destinos para descubrir
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Explora lugares únicos y encuentra inspiración para tu próxima
          aventura.
        </p>
      </header>

      <ListadoDestinos />
    </div>
  )
}

export default Destinos