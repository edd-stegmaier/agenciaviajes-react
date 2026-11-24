import { graphql, http, HttpResponse, delay } from 'msw';
import { destinos } from './agencia/destinosMock.js';
import { hoteles } from './agencia/hotelesMock.js';
import { vuelos } from './agencia/vuelosMock.js';
import { GRAPHQL_ENDPOINT } from '../graphql/endpoint';
import { validarColeccion, validarRegistro } from '../utils/validaciones.js';


const apiGraphql = graphql.link(GRAPHQL_ENDPOINT);
const normalizar = (valor) => valor.trim().toLocaleLowerCase();

export const handlers = [
  http.get("/api/destinos", async ({ request }) => {
    await delay(1000);

    const url = new URL(request.url);
    const error = url.searchParams.get("error");

    if (error === "404") {
      return HttpResponse.json(
        { mensaje: "El recurso de destino no fue encontrado" },
        { status: 404 }
      )
    }

    if (error === "500") {
      return HttpResponse.json(
        { mensaje: "Error interno del servidor" },
        { status: 500 }
      )
    }
    try {
      return HttpResponse.json(validarColeccion(destinos, "destino"));
    } catch (error) {
      return HttpResponse.json(
        { mensaje: `Los datos de destinos no son válidos: ${error.message}` },
        { status: 500 }
      );
    }

  }),

  http.post("/api/destinos", async ({ request }) => {
    await delay(1000);

    let nuevoDestino;
    try {
      nuevoDestino = await request.json();
      validarRegistro(nuevoDestino, "destino");
    } catch (error) {
      return HttpResponse.json(
        { mensaje: `El destino enviado no es válido: ${error.message}` },
        { status: 400 }
      );
    }

    destinos.push(nuevoDestino);

    return HttpResponse.json(
      { mensaje: "destino agregado correctamente" },
      { status: 201 }
    );
  }),

  apiGraphql.query("ObtenerHotelesPorDestino", async ({ variables }) => {
    await delay(500);
    const destino = normalizar(variables.destino);

    try {
      const hotelesValidos = validarColeccion(hoteles, "hotel");
      const hotelesEncontrados = hotelesValidos.filter(
        (hotel) => normalizar(hotel.destino) === destino
      );

      return HttpResponse.json({
        data: { hotelesPorDestino: hotelesEncontrados },
      });
    } catch (error) {
      return HttpResponse.json(
        { errors: [{ message: `Los datos de hoteles no son válidos: ${error.message}` }] },
        { status: 500 }
      );
    }
  }),

  apiGraphql.query("ObtenerVuelosPorDestino", async ({ variables }) => {
    await delay(500);
    const ciudad = normalizar(variables.ciudad);
    const pais = normalizar(variables.pais);

    try {
      const vuelosValidos = validarColeccion(vuelos, "vuelo");
      const vuelosEncontrados = vuelosValidos.filter(
        (vuelo) =>
          normalizar(vuelo.ciudad) === ciudad &&
          normalizar(vuelo.pais) === pais
      );

      return HttpResponse.json({
        data: { vuelosPorDestino: vuelosEncontrados },
      });
    } catch (error) {
      return HttpResponse.json(
        { errors: [{ message: `Los datos de vuelos no son válidos: ${error.message}` }] },
        { status: 500 }
      );
    }
  }),
]