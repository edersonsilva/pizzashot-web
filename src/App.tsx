import { RouterProvider } from 'react-router-dom'

import { router } from './routes'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from "sonner"

export default function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | pizza.shop" />
      <Toaster position='bottom-right' richColors />
      <RouterProvider router={router} />
    </HelmetProvider >
  )
}



