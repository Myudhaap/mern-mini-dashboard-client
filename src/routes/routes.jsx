import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../shared/layouts/AuthLayout";
import { Login, Register } from "../pages/Auth";
import MainLayout from "../shared/layouts/MainLayout";
import { Dashboard } from "../pages/Dashboard";
import { Category, CategoryForm } from "../pages/Category";

const router = createBrowserRouter([
    {
        path: "",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Dashboard
            },
            {
                path: "categories",
                children: [
                    {
                        index: true,
                        Component: Category,
                    },
                    {
                        path: "form",
                        Component: CategoryForm
                    },
                    {
                        path: "form/:id",
                        Component: CategoryForm
                    }
                ]
            }
        ]
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