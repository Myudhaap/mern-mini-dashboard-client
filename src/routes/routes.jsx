import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../shared/layouts/AuthLayout";
import { Login, Register } from "../pages/Auth";

const router = createBrowserRouter([
    {
        path: "auth",
        Component: AuthLayout,
        children:[
            {
                path: "signin",
                Component: Login
            },
            {
                path: "register",
                Component: Register
            }
        ]
    }
])

export default router