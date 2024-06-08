import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect } from "react"
import * as y from "yup"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createCategoryThunk, getByIdCategoryThunk, updateCategoryThunk } from "../../stores/actions/categoryAction"
import { toast } from "react-toastify"
import { useCallback } from "react"
import { clearCategory } from "../../stores/reducers/categorySlice"
import { useSelector } from "react-redux"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

export default function CategoryForm() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isLoading} = useSelector(state => state.category)

    const schema = y.object({
        id: y.string().nullable(),
        name: y.string().required("Name required.")
    })

    const {
        watch,
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid},
    } = useForm({
        defaultValues: {
            id: "",
            name: ""
        },
        resolver: yupResolver(schema)
    })

    const fetchData = useCallback( async () => {
        const {payload} = await dispatch(getByIdCategoryThunk(id))
        reset({
            id: payload.data._id,
            name: payload.data.name
        })
    }, [])

    useEffect(() => {
        if(id){
            fetchData()
        }
    }, [id])

    const onCancel = async () => {
        reset()
        navigate("/categories")
    }

    const onHandleSubmit = async (data) => {
        if(!data.id){
            const {payload} = await dispatch(createCategoryThunk({name: data.name}))
            if(payload.statusCode == 201){
                toast.success(payload.message)
                onCancel()
            }else{
                toast.error("Failed to create category")
            }
        }else{
            const {payload} = await dispatch(updateCategoryThunk(data))
            if(payload.statusCode == 200){
                toast.success(payload.message)
                onCancel()
            }else{
                toast.error("Failed to update category")
            }
        }
    }

    return (
        <div>
            <div className="mb-6 flex text-2xl items-center justify-between font-semibold">
                <h2 className="flex items-center gap-2">
                    <Link to={"/categories"} className="hover:text-primary transition-colors duration-150">Category List</Link>
                    <FontAwesomeIcon className="text-xs" icon={faChevronRight}/>
                    <span>Form</span>
                </h2>
            </div>
            <form
             onSubmit={handleSubmit(onHandleSubmit)}
             className="w-full"
            >
                {watch("id") != "" && (
                    <div className="mb-6">
                        <label htmlFor="id" className="block mb-1 text-sm text-gray-500">Id</label>
                        <input
                        type="text" 
                        readOnly
                        {...register("id")}
                        id="id"
                        className="w-full border rounded-md read-only:bg-slate-100 border-black/20 p-2 outline-primary"
                        autoComplete="off"
                        />
                    </div>
                )}
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-1 text-sm text-gray-500">Name</label>
                    <input
                     type="text" 
                     {...register("name")}
                     id="name"
                     className="w-full border rounded-md border-black/20 p-2 outline-primary"
                     autoComplete="off"
                    />
                    {errors.name?.message && (
                        <span className="text-xs text-red-400">{errors.name.message}</span>
                    )}
                </div>
                <div className="flex justify-end items-center gap-4">
                    <button
                     type="submit"
                     className="px-4 disabled:cursor-not-allowed disabled:bg-primary/70 bg-primary hover:bg-primary/95 transition-colors duration-150 text-white font-semibold p-2 rounded-md"
                     disabled={!isValid || isLoading}
                    >
                        <FontAwesomeIcon icon={isLoading ? faSpinner : faFloppyDisk} spin={isLoading} className="me-2"/>
                        Submit
                    </button>
                    <button
                     type="button"
                     className="px-4 disabled:cursor-not-allowed bg-red-500 hover:bg-red-500/95 transition-colors duration-150 text-white font-semibold p-2 rounded-md"
                     onClick={() => {
                        dispatch(clearCategory())
                        reset({
                            id: "",
                            name: ""
                        })
                     }
                    }
                    >
                        <FontAwesomeIcon icon={faRotateLeft} className="me-2"/>
                        Reset
                    </button>
                    <button
                     type="button"
                     onClick={onCancel}
                     className="px-4 disabled:cursor-not-allowed bg-red-500 hover:bg-red-500/95 transition-colors duration-150 text-white font-semibold p-2 rounded-md"
                    >
                        <FontAwesomeIcon icon={faX} className="me-2"/>
                        Batal
                    </button>
                </div>
            </form>
        </div>
    )
}
