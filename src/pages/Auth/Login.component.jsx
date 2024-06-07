import * as y from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

export default function Login() {
    const schema = y.object({
        email: y.string().required("Email required.").email("Email not valid."),
        password: y.string().required("Password required.")
    })

    const [isShow, setIsShow] = useState(false)

    const {
        handleSubmit,
        register,
        formState: {errors, isValid},
    } = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: yupResolver(schema),
        mode: "onSubmit"
    })

    const onSubmit = (data) => {
        console.log(data)
        toast.success("Login successfully")
    }

    return (
        <div className="bg-white min-w-40 w-80 p-4 rounded-md">
            <h2 className="text-blackCustom font-bold text-2xl mb-8">HI, NICE TO SEE YOU</h2>
            <form
             onSubmit={handleSubmit(onSubmit)}
            className="w-full"
            >
                <div className="mb-3">
                    <label htmlFor="email" className="block mb-1 text-sm text-gray-500">E-Mail</label>
                    <input
                    type="email" 
                    {...register("email")}
                    id="email"
                    className="w-full border rounded-md border-black/20 p-2 outline-primary"
                    />
                    {errors.email?.message && (
                        <span className="text-xs text-red-400">{errors.email.message}</span>
                    )}
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-1 text-sm text-gray-500">Password</label>
                    <div className="relative flex justify-end">
                        <input
                        type={ isShow ? "text" : "password" }
                        {...register("password")}
                        id="password"
                        className="w-full border rounded-md border-black/20 p-2 outline-primary"
                        />
                        <FontAwesomeIcon
                         onClick={( () => setIsShow(!isShow))}
                         icon={!isShow ? faEyeSlash : faEye} 
                         className="absolute self-center right-2 cursor-pointer"/>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <button
                     type="submit"
                     className="w-full disabled:cursor-not-allowed disabled:bg-primary/70 bg-primary hover:bg-primary/95 transition-colors duration-150 text-white font-semibold p-2 rounded-md"
                     disabled={!isValid}
                    >
                        Log In
                    </button>
                    <span className="text-primary text-sm">Forgot Password</span>
                    <Link className="text-primary text-sm" to={"/auth/register"}>Don{"'"}t have an account? Regitser <FontAwesomeIcon icon={faArrowRight}/></Link>
                </div>
            </form>
        </div>
    )
}
