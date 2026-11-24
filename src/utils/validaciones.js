const esTexto = (valor) => typeof valor === "string" && valor.trim().length > 0;
const esId = (valor) => Number.isInteger(valor) && valor > 0;
const esUrl = (valor) => {
  if (!esTexto(valor)) return false;

  try {
    const url = new URL(valor);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};
const esListaDeTextos = (valor) =>
  Array.isArray(valor) && valor.every(esTexto);
const esFecha = (valor) => {
  if (typeof valor !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
    return false;
  }

  const fecha = new Date(`${valor}T00:00:00Z`);
  return !Number.isNaN(fecha.getTime()) &&
    fecha.toISOString().slice(0, 10) === valor;
};
const esHora = (valor) =>
  typeof valor === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(valor);
const esPrecio = (valor) => Number.isFinite(valor) && valor >= 0;
const esDisponibilidad = (valor) =>
  Number.isInteger(valor) && valor >= 0;

const esquemas = {
  destino: {
    id: esId,
    nombre: esTexto,
    ciudad: esTexto,
    pais: esTexto,
    descripcion: esTexto,
    imagen: esUrl,
    actividades: esListaDeTextos,
  },
  hotel: {
    id: esId,
    nombre: esTexto,
    destino: esTexto,
    ciudad: esTexto,
    pais: esTexto,
    descripcion: esTexto,
    imagen: esUrl,
  },
  vuelo: {
    id: esId,
    ciudad: esTexto,
    pais: esTexto,
    fecha: esFecha,
    hora: esHora,
    precio: esPrecio,
    aerolinea: esTexto,
    disponibilidad: esDisponibilidad,
  },
};

export function validarRegistro(datos, tipo) {
  const esquema = esquemas[tipo];
  if (!esquema) {
    throw new Error(`No existe un esquema de validación para "${tipo}".`);
  }
  if (!datos || typeof datos !== "object" || Array.isArray(datos)) {
    throw new Error(`El registro de ${tipo} debe ser un objeto.`);
  }

  for (const [campo, validarCampo] of Object.entries(esquema)) {
    if (!validarCampo(datos[campo])) {
      throw new Error(`El campo "${campo}" de ${tipo} no es válido.`);
    }
  }

  return datos;
}

export function validarColeccion(datos, tipo) {
  if (!Array.isArray(datos)) {
    throw new Error(`La respuesta debe ser una lista de ${tipo}.`);
  }

  datos.forEach((registro, indice) => {
    try {
      validarRegistro(registro, tipo);
    } catch (error) {
      throw new Error(`Registro ${indice + 1}: ${error.message}`, {
        cause: error,
      });
    }
  });

  return datos;
}
