import { gql } from "@apollo/client";

export const OBTENER_HOTELES_POR_DESTINO = gql`
  query ObtenerHotelesPorDestino($destino: String!) {
    hotelesPorDestino(destino: $destino) {
      id
      nombre
      destino
      ciudad
      pais
      descripcion
      imagen
    }
  }
`;

export const OBTENER_VUELOS_POR_DESTINO = gql`
  query ObtenerVuelosPorDestino($ciudad: String!, $pais: String!) {
    vuelosPorDestino(ciudad: $ciudad, pais: $pais) {
      id
      ciudad
      pais
      fecha
      hora
      precio
      aerolinea
      disponibilidad
    }
  }
`;

export const OBTENER_VIDEOJUEGO = gql`
  query ObtenerVideojuego($id: ID!, $simularError: Boolean = false) {
    videojuego(id: $id, simularError: $simularError) {
      id
      nombre
      descripcion
      plataforma
      categoria
      precio
    }
  }
`;
