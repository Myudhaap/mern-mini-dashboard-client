import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../shared/layouts/AuthLayout";
import { Login, Register } from "../pages/Auth";
import MainLayout from "../shared/layouts/MainLayout";

const router = createBrowserRouter([
    {
        index: true,
        Component: MainLayout
    },
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