import { RouterProvider } from "react-router-dom"
import router from "./routes/routes"
import {ToastContainer} from "react-toastify"
import {PrimeReactProvider} from "primereact/api"

import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import store from "./stores/store";


function App() {

  return (
    <Provider store={store}>
      <PrimeReactProvider>
        <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick
        />
        <RouterProvider router={router}/>
      </PrimeReactProvider>
    </Provider>
  )
}

export default App
