import { Link, NavLink } from 'react-router'

const enlaces = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/destinos', label: 'Destinos' },
  { to: '/viajes', label: 'Viajes' },
]

function Navegacion() {
  return (
    <header className="sticky top-0 z-10 border-b border-emerald-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-emerald-900"
          aria-label="Rumbo Verde, volver al inicio"
        >
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-xl bg-emerald-700 text-lg text-white"
          >
            V
          </span>
          Agencia de Viajes
        </Link>

        <nav aria-label="Menú principal">
          <ul className="flex flex-wrap items-center gap-1">
            {enlaces.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `inline-flex rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navegacion
