import { useQuery } from "@apollo/client/react";
import { OBTENER_HOTELES_POR_DESTINO } from "../graphql/operaciones";

function ListadoHoteles({ destino }) {
  const { data, loading, error, refetch } = useQuery(
    OBTENER_HOTELES_POR_DESTINO,
    {
      variables: { destino: destino.nombre },
      skip: !destino,
    }
  );
  const hoteles = data?.hotelesPorDestino ?? [];

  return (
    <section aria-label={`Hoteles en ${destino.nombre}`}>
      <h2 className="text-2xl font-bold text-emerald-950">
        Hoteles en {destino.nombre}
      </h2>

      {loading && (
        <p role="status" className="py-6 text-slate-600">
          Buscando hoteles...
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

      {!loading && !error && hoteles.length === 0 && (
        <p className="py-6 text-slate-600">
          No hay hoteles disponibles para este destino.
        </p>
      )}

      {!loading && !error && hoteles.length > 0 && (
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {hoteles.map((hotel) => (
            <article
              key={hotel.id}
              className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm"
            >
              <img
                src={hotel.imagen}
                alt={hotel.nombre}
                loading="lazy"
                className="h-52 w-full object-cover"
              />
              <div className="p-5">
                <p className="text-sm font-bold text-emerald-700">
                  {hotel.ciudad}, {hotel.pais}
                </p>
                <h3 className="mt-2 text-xl font-bold text-emerald-950">
                  {hotel.nombre}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {hotel.descripcion}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ListadoHoteles;