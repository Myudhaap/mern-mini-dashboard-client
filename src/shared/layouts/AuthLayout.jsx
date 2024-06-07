import { Outlet } from "react-router-dom";

export default function AuthLayout() {


    return (
        <div
        className="flex h-screen"
        >
            <div
            className="z-10 sm:bg-transparent sm:backdrop-blur-none flex justify-center items-center w-full p-8 sm:p-2 sm:w-2/5 h-100"
            >
                <Outlet/>
            </div>
            <div
            className="flex-1 h-100 p-6 absolute sm:relative w-full h-full -z-2 sm:block"
            >
                <div
                className="flex items-end h-full bg-auth bg-cover rounded-lg p-8"
                >
                    <div
                    className="backdrop-blur-md w-full shadow-md sm:p-2 bg-white/10 rounded-sm"
                    >
                        <h2 className="text-3xl hidden sm:block text-white font-bold">Manage your shop</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
