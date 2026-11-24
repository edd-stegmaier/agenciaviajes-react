import { useEffect, useState } from "react";
import { Link } from "react-router";
import ListadoHoteles from "../components/ListadoHoteles.jsx";
import ListadoVuelos from "../components/ListadoVuelos.jsx";
import { obtenerDestinos } from "../controller/obtenerDestinos.js";

function Viajes() {
  const [destinos, setDestinos] = useState([]);
  const [destinoId, setDestinoId] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();

    obtenerDestinos("", controlador.signal)
      .then((datos) => {
        setDestinos(datos);
      })
      .catch((errorCarga) => {
        if (errorCarga.name !== "AbortError") {
          setError(errorCarga.message);
        }
      })
      .finally(() => {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      });

    return () => controlador.abort();
  }, [intento]);

  const destinoSeleccionado = destinos.find(
    (destino) => String(destino.id) === destinoId
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <header className="max-w-3xl">
        <p className="font-bold uppercase tracking-[0.16em] text-emerald-700">
          Planifica con calma
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-emerald-950 sm:text-5xl">
          Tu viaje, paso a paso
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Elige un destino para consultar los hoteles y vuelos disponibles en
          esa ubicación.
        </p>
      </header>

      <section aria-label="Selección de destino" className="mt-10 max-w-2xl">
        <label
          htmlFor="destino"
          className="mb-2 block font-bold text-emerald-950"
        >
          Destino
        </label>
        <select
          id="destino"
          value={destinoId}
          onChange={(evento) => setDestinoId(evento.target.value)}
          disabled={cargando || Boolean(error) || destinos.length === 0}
          className="w-full rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-slate-800 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="">Selecciona un destino</option>
          {destinos.map((destino) => (
            <option key={destino.id} value={destino.id}>
              {destino.nombre} — {destino.pais}
            </option>
          ))}
        </select>

        {cargando && (
          <p role="status" className="mt-3 text-slate-600">
            Cargando destinos...
          </p>
        )}

        {error && (
          <div role="alert" className="mt-4 rounded-2xl bg-red-50 p-5 text-red-800">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => {
                setError("");
                setCargando(true);
                setIntento((actual) => actual + 1);
              }}
              className="mt-3 font-bold underline underline-offset-2"
            >
              Reintentar
            </button>
          </div>
        )}

        {!cargando && !error && destinos.length === 0 && (
          <p className="mt-3 text-slate-600">
            No hay destinos disponibles por el momento.
          </p>
        )}
      </section>

      {destinoSeleccionado && (
        <div className="mt-12 grid gap-12">
          <ListadoHoteles destino={destinoSeleccionado} />
          <ListadoVuelos destino={destinoSeleccionado} />
        </div>
      )}

      <div className="mt-10 rounded-3xl bg-emerald-950 px-6 py-8 text-emerald-50 sm:px-10 sm:py-10">
        <h2 className="text-2xl font-bold">¿Aún estás buscando inspiración?</h2>
        <p className="mt-2 max-w-2xl leading-7 text-emerald-100/80">
          Explora todos nuestros destinos y encuentra tu próximo lugar favorito.
        </p>
        <Link
          to="/destinos"
          className="mt-6 inline-flex rounded-full bg-lime-300 px-5 py-3 font-bold text-emerald-950 transition-colors hover:bg-lime-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Explorar destinos
        </Link>
      </div>
    </div>
  )
}

export default Viajes