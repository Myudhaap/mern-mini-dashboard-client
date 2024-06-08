import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../shared/Layouts/AuthLayout";
import { Login, Register } from "../pages/Auth";
import MainLayout from "../shared/Layouts/MainLayout";
import { Dashboard } from "../pages/Dashboard";
import { Category, CategoryForm } from "../pages/Category";
import { Product, ProductForm } from "../pages/Product";
import NotFound from "../shared/NotFound/NotFound";

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
            },
            {
                path: "products",
                children: [
                    {
                        index: true,
                        Component: Product,
                    },
                    {
                        path: "form",
                        Component: ProductForm
                    },
                    {
                        path: "form/:id",
                        Component: ProductForm
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
    },
    {
        path: "*",
        Component: NotFound
    }
])

export default router