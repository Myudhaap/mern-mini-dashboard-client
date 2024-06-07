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

export default function MainLayout() {
    const [isCollapse, setIsCollapse] = useState(false)
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

                    <Menu className="mt-auto">
                        <MenuItem component={<Link to={"/auth/signin"}/>} icon={<FontAwesomeIcon icon={faSignOut}/>}>Log Out</MenuItem>
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
                <main className="flex-1">

                </main>
            </div>
        </div>
    )
}
