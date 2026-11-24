import { useQuery } from "@apollo/client/react";
import { OBTENER_VUELOS_POR_DESTINO } from "../graphql/operaciones";

function ListadoVuelos({ destino }) {
  const { data, loading, error, refetch } = useQuery(
    OBTENER_VUELOS_POR_DESTINO,
    {
      variables: { ciudad: destino.ciudad, pais: destino.pais },
      skip: !destino,
    }
  );
  const vuelos = data?.vuelosPorDestino ?? [];

  return (
    <section aria-label={`Vuelos a ${destino.nombre}`}>
      <h2 className="text-2xl font-bold text-emerald-950">
        Vuelos a {destino.ciudad}, {destino.pais}
      </h2>

      {loading && (
        <p role="status" className="py-6 text-slate-600">
          Buscando vuelos...
        </p>
      )}

      {error && (
        <div role="alert" className="mt-4 rounded-2xl bg-red-50 p-5 text-red-800">
          <p>{error.message}</p>
          <button
            type="button"
            onClick={() => refetch()}
            disabled={loading}
            className="mt-3 font-bold underline underline-offset-2 disabled:opacity-60"
          >
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && vuelos.length === 0 && (
        <p className="py-6 text-slate-600">
          No hay vuelos disponibles para este destino.
        </p>
      )}

      {!loading && !error && vuelos.length > 0 && (
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {vuelos.map((vuelo) => (
            <article
              key={vuelo.id}
              className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-bold text-emerald-700">
                {vuelo.aerolinea}
              </p>
              <h3 className="mt-2 text-xl font-bold text-emerald-950">
                {vuelo.ciudad}, {vuelo.pais}
              </h3>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
                <div>
                  <dt className="font-semibold text-slate-800">Fecha</dt>
                  <dd>{vuelo.fecha}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-800">Hora</dt>
                  <dd>{vuelo.hora}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-800">Precio</dt>
                  <dd>{vuelo.precio} USD</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-800">Disponibilidad</dt>
                  <dd>{vuelo.disponibilidad} asientos</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ListadoVuelos;