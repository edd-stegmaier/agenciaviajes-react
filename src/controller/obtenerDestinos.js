import { validarColeccion } from "../utils/validaciones.js";

export async function obtenerDestinos(tipoError = "", signal) {
  const parametros = new URLSearchParams();
  if (tipoError) {
    parametros.set("error", tipoError);
  }

  const query = parametros.size > 0 ? `?${parametros}` : "";

  try {
    const respuesta = await fetch(`/api/destinos${query}`, { signal });

    if (!respuesta.ok) {
      if (respuesta.status === 404) {
        throw new Error("Recurso no encontrado");
      }
      if (respuesta.status === 500) {
        throw new Error("Error interno del servidor");
      }
      throw new Error(`No fue posible obtener los destinos (HTTP ${respuesta.status}).`);
    }

    const destinos = await respuesta.json();
    return validarColeccion(destinos, "destino");
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Ocurrió un error de conexión, por favor intente nuevamente.",
        { cause: error },
      );
    }
    throw error;
  }
}
