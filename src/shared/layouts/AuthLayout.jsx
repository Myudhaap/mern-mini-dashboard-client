import { Outlet } from "react-router-dom";
import { logo } from "../../assets";
import { useEffect } from "react";
import electronInstance from "../../api/electronInstance";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../components/Loading/Loading";

export default function AuthLayout() {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)

    const verifyToken = async () => {
        const token = localStorage.getItem("token")

        if(token){
            try{
                await electronInstance.get("auth/verify")
                setIsLoading(false)
                navigate("/")            
            }catch(e){
                setIsLoading(false)
            }
        }
        setIsLoading(false)
    }
    
    useEffect(() => {
        verifyToken()
    }, [])

    if(isLoading) return <Loading/>

    return (
        <div
        className="relative flex h-screen"
        >
            <div className="hidden absolute z-20 top-4 left-4 sm:flex items-center gap-2">
                <img src={logo} alt="Logo eletron" width={30} height={30}/>
                <span className="text-primary">Electron</span>
            </div>  
            <div
             className="z-10 sm:bg-transparent sm:backdrop-blur-none flex justify-center items-center w-full p-9 sm:p-2 sm:w-2/5 h-100"
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
                    className="backdrop-blur-md w-full shadow-md sm:p-4 bg-white/10 rounded-sm"
                    >
                        <h2 className="text-3xl hidden sm:block text-white font-bold">Manage your shop</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
