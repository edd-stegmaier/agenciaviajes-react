import { Link } from 'react-router'

function Inicio() {
  return (
    <>
      <section className="travel-hero overflow-hidden bg-emerald-50">
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:py-24 lg:px-8">
          <div className="relative z-[1]">
            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-emerald-950 sm:text-5xl lg:text-6xl">
              El mundo te espera. <span className="text-emerald-700">Vamos.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Revisa los destinos disponibles o planifica tu proximo viaje revisando los hoteles y vuelos disponibles en cada ubicación.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/destinos"
                className="rounded-full bg-emerald-700 px-6 py-3 font-bold text-white shadow-sm transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                Explorar destinos
              </Link>
              <Link
                to="/viajes"
                className="rounded-full border border-emerald-200 bg-white px-6 py-3 font-bold text-emerald-900 transition-colors hover:bg-emerald-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                Planifica tu viaje
              </Link>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="relative mx-auto grid aspect-square w-full max-w-md place-items-center rounded-[2.5rem] bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-950 p-8 shadow-xl"
          >
            <div className="absolute inset-5 rounded-[2rem] border border-white/20" />
            <div className="relative grid size-56 place-items-center rounded-full border border-white/25 bg-emerald-300/10 sm:size-64">
              <div className="absolute size-40 rounded-full border border-dashed border-emerald-100/50 sm:size-48" />
              <div className="grid size-24 place-items-center rounded-full bg-lime-300 text-4xl text-emerald-950 shadow-lg sm:size-28">
                <span>✦</span>
              </div>
              <span className="absolute -right-2 top-10 grid size-11 place-items-center rounded-full bg-white text-lg text-emerald-800 shadow-md">
                ↗
              </span>
              <span className="absolute -bottom-1 left-4 grid size-9 place-items-center rounded-full bg-lime-300 text-sm font-black text-emerald-950 shadow-md">
                +
              </span>
            </div>
            <p className="absolute bottom-8 left-8 font-semibold tracking-wide text-emerald-50">
              Nuevos caminos, nuevas historias
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-bold uppercase tracking-[0.16em] text-emerald-700">
            Tu próxima aventura
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-emerald-950 sm:text-4xl">
            Un buen viaje empieza con una idea
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Explora los destinos y planea tu proximo viaje
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Link
            to="/destinos"
            className="group rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <span className="text-sm font-bold text-emerald-700">
              INSPIRACIÓN
            </span>
            <h3 className="mt-3 text-2xl font-bold text-emerald-950 group-hover:text-emerald-700">
              Destinos para descubrir
            </h3>
            <p className="mt-2 leading-7 text-slate-600">
              Un espacio para encontrar lugares que te inviten a salir de la
              rutina.
            </p>
            <span className="mt-5 inline-block font-bold text-emerald-800">
              Ir a destinos <span aria-hidden="true">→</span>
            </span>
          </Link>
          <Link
            to="/viajes"
            className="group rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <span className="text-sm font-bold text-emerald-700">
              PLANIFICACIÓN
            </span>
            <h3 className="mt-3 text-2xl font-bold text-emerald-950 group-hover:text-emerald-700">
              Prepara tu viaje
            </h3>
            <p className="mt-2 leading-7 text-slate-600">
              busca vuelos y hoteles disponibles en el destino que elijas para tu próximo viaje.
            </p>
            <span className="mt-5 inline-block font-bold text-emerald-800">
              ir a viajes <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Inicio
