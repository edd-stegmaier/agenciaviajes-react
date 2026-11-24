import { useCallback, useEffect, useRef, useState } from "react";
import { obtenerDestinos } from "../controller/obtenerDestinos.js";

function ListadoDestinos() {
  const [destinos, setDestinos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const controladorRef = useRef(null);

  const cargarDestinos = useCallback(async (tipoError = "") => {
    controladorRef.current?.abort();
    const controlador = new AbortController();
    controladorRef.current = controlador;

    setCargando(true);
    setError("");

    try {
      const datos = await obtenerDestinos(tipoError, controlador.signal);
      if (controladorRef.current === controlador) {
        setDestinos(datos);
      }
    } catch (errorCarga) {
      if (errorCarga.name !== "AbortError" && controladorRef.current === controlador) {
        setError(errorCarga.message);
      }
    } finally {
      if (controladorRef.current === controlador) {
        setCargando(false);
      }
    }
  }, []);

  useEffect(() => {
    const controlador = new AbortController();
    controladorRef.current = controlador;

    obtenerDestinos("", controlador.signal)
      .then((datos) => {
        if (controladorRef.current === controlador) {
          setDestinos(datos);
        }
      })
      .catch((errorCarga) => {
        if (errorCarga.name !== "AbortError" && controladorRef.current === controlador) {
          setError(errorCarga.message);
        }
      })
      .finally(() => {
        if (controladorRef.current === controlador) {
          setCargando(false);
        }
      });

    return () => {
      controladorRef.current?.abort();
    };
  }, []);

  return (
    <section aria-label="Listado de destinos" className="mt-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-emerald-950">
          Destinos disponibles
        </h2>
        <button
          type="button"
          onClick={() => cargarDestinos()}
          disabled={cargando}
          className="rounded-full bg-emerald-700 px-5 py-3 font-bold text-white transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
        >
          Actualizar destinos
        </button>
      </div>

      {cargando && (
        <p role="status" className="py-8 text-center text-slate-600">
          Cargando destinos...
        </p>
      )}

      {error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800"
        >
          <p>{error}</p>
          <button
            type="button"
            onClick={() => cargarDestinos()}
            disabled={cargando}
            className="mt-3 font-bold underline underline-offset-2 disabled:opacity-60"
          >
            Reintentar
          </button>
        </div>
      )}

      {!cargando && !error && destinos.length === 0 && (
        <p className="py-8 text-center text-slate-600">
          No hay destinos disponibles por el momento.
        </p>
      )}

      {error && destinos.length > 0 && (
        <p className="mt-4 text-slate-600">
          Se conservan los últimos destinos cargados.
        </p>
      )}

      {destinos.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {destinos.map((destino) => (
            <article
              key={destino.id}
              className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm"
            >
              <img
                src={destino.imagen}
                alt={destino.nombre}
                loading="lazy"
                className="h-56 w-full object-cover"
              />
              <div className="p-6">
                <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
                  {destino.pais}
                </p>
                <h3 className="mt-2 text-xl font-bold text-emerald-950">
                  {destino.nombre}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {destino.descripcion}
                </p>
                {destino.actividades?.length > 0 && (
                  <ul
                    aria-label={`Actividades en ${destino.nombre}`}
                    className="mt-4 flex flex-wrap gap-2"
                  >
                    {destino.actividades.map((actividad) => (
                      <li
                        key={actividad}
                        className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800"
                      >
                        {actividad}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ListadoDestinos;