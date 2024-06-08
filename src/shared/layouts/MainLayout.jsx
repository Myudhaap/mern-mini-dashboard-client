import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { faDashboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { logo } from "../../assets";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Profile } from "../components/Profile";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import electronInstance from "../../api/electronInstance";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";

export default function MainLayout() {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)
    const [isCollapse, setIsCollapse] = useState(false)

    const verifyToken = async () => {
        try{
            await electronInstance.get("auth/verify")
            setIsLoading(false)
        }catch(e){
            setIsLoading(false)
            navigate("/auth/signin")
        }
    }
    
    useEffect(() => {
        verifyToken()
    }, [])
    
    if(isLoading) return <Loading/>
    
    return (
        <div className="flex h-screen">
            <Sidebar
            collapsed={isCollapse}
            className="bg-white"
            >
                <div className="flex flex-col h-full">
                    <div className="p-8 flex items-center gap-2">
                        <img src={logo} alt="Logo electron" width={isCollapse ? 90 : 60} height={isCollapse ? 90 : 60}/>
                        {!isCollapse && (
                            <span className="text-2xl font-semibold text-primary">Electron</span>
                        )}
                    </div>
                    <Menu className="w-full">
                        <MenuItem component={<Link to={"/"}/>} icon={<FontAwesomeIcon icon={faDashboard}/>}>Dashboard</MenuItem>
                        <SubMenu icon={<FontAwesomeIcon icon={faScrewdriverWrench}/>} label="Master">
                            <MenuItem component={<Link to={"/categories"}/>} icon={<FontAwesomeIcon icon={faTag}/>}>Category</MenuItem>
                            <MenuItem component={<Link to={"/products"}/>} icon={<FontAwesomeIcon icon={faBox}/>}>Product</MenuItem>
                        </SubMenu>
                    </Menu>

                    <Menu className="mt-auto w-full">
                        <MenuItem className="w-full" component={<span className="w-full" onClick={() => {
                            localStorage.removeItem("token")
                            navigate("/auth/signin")
                        }}/>} icon={<FontAwesomeIcon icon={faSignOut}/>}>Log Out</MenuItem>
                    </Menu>
                </div>
            </Sidebar>
            <div className="flex flex-col w-full">
                <header className="flex justify-between p-4 w-full bg-[#FBFBFB] shadow-sm">
                    <span>
                        <FontAwesomeIcon
                         onClick={() => setIsCollapse(!isCollapse)}
                         icon={faBars}
                          className="text-primary cursor-pointer"/>
                    </span>
                    <Profile/>
                </header>
                <main className="flex-1 p-4">
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}
