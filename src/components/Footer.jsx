import { Link } from 'react-router'

function Footer() {
  return (
    <footer className="mt-16 border-t border-emerald-100 bg-emerald-950 text-emerald-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <Link to="/" className="font-bold tracking-tight text-white">
            Agencia de Viajes
          </Link>
          <p className="mt-1 max-w-md text-sm text-emerald-100/75">
            imagina tu próximo viaje.
          </p>
        </div>
        <nav aria-label="Enlaces del pie de página">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-emerald-100/85">
            <li>
              <Link className="transition-colors hover:text-white" to="/">
                Inicio
              </Link>
            </li>
            <li>
              <Link
                className="transition-colors hover:text-white"
                to="/destinos"
              >
                Destinos
              </Link>
            </li>
            <li>
              <Link
                className="transition-colors hover:text-white"
                to="/viajes"
              >
                Viajes
              </Link>
            </li>
          </ul>
        </nav>
        <p className="text-sm text-emerald-100/65">
          © 2026 Agencia de Viajes
        </p>
      </div>
    </footer>
  )
}

export default Footer
