import {ApolloProvider} from '@apollo/client/react'
import { apolloClient } from "./graphql/client";
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'


async function init() {

  const mocksHabilitados =
    import.meta.env.DEV || import.meta.env.VITE_MSW_ENABLED !== "false";

  if (mocksHabilitados) {
    const { worker } = await import('./mocks/browser');

    await worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
        options: { scope: import.meta.env.BASE_URL },
      },
    })

  }

  const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

  createRoot(document.getElementById('root')).render(
    <ApolloProvider client={apolloClient}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </ApolloProvider>,
  )
}

init().catch( error => {
  console.error("No se pudo iniciar aplicacion: ", error)

  document.getElementById("root").textContent = "No se pudo iniciar la aplicacion. Revise la consola."
})
