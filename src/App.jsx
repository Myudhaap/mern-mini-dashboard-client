import { RouterProvider } from "react-router-dom"
import router from "./routes/routes"
import {ToastContainer} from "react-toastify"

import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <ToastContainer
       position="top-right"
       autoClose={4000}
       closeOnClick
      />
      <RouterProvider router={router}/>
    </>
  )
}

export default App
