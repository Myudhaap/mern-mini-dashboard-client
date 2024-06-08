/* eslint-disable no-unused-vars */
import { yupResolver } from "@hookform/resolvers/yup"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import * as y from "yup"
import { createProductThunk, getByIdProductThunk, updateProductThunk } from "../../stores/actions/productAction"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons"
import { clearProduct } from "../../stores/reducers/productSlice"
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { getAllCategoryThunk } from "../../stores/actions/categoryAction"
import { useSelector } from "react-redux"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

export default function ProductForm() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {categories} = useSelector(state => state.category)
    const {isLoading} = useSelector(state => state.product)

    const schema = y.object({
        id: y.string().nullable(),
        name: y.string().required("Name required."),
        description: y.string().required("Description required."),
        price: y.string().required("Price required"),
        image: y.mixed()
        .required('Image is required')
        .test('fileSize', 'File is too large', value => {
            return value && value[0]?.size <= 2000000
        })
        .test('fileType', 'Unsupported File Format', value => {
          return value && ['image/jpeg', 'image/png'].includes(value[0]?.type)
        }),
        categoryId: y.string().required("Category required.")
    })

    const {
        watch,
        register,
        setValue,
        getValues,
        handleSubmit,
        reset,
        formState: {errors, isValid},
    } = useForm({
        defaultValues: {
            id: "",
            name: "",
            description: "",
            categoryId: "",
            image: "",
            price: 0
        },
        resolver: yupResolver(schema),
        mode: "onChange"
    })

    const fetchData = useCallback( async () => {
        const {payload} = await dispatch(getByIdProductThunk(id))
        reset({
            id: payload.data._id,
            name: payload.data.name,
            description: payload.data.description,
            categoryId: payload.data.categoryId,
            image: payload.data.image,
            price: payload.data.price
        })
    }, [])

    const fetchCatgory = async () => {
        const {payload} = await dispatch(getAllCategoryThunk())
        if(id){
            const category = payload.data.find(val => val._id == getValues("categoryId"))
            setValue("categoryId", category._id)
        }
    }

    useEffect(() => {
        if(id){
            fetchData()
        }
        fetchCatgory()
    }, [id])

    const onCancel = async () => {
        reset()
        navigate("/products")
    }

    const onHandleSubmit = async (data) => {
        if(!data.id){
            const {id, image: file, ...createData} = data
            
            const imageFile = file[0]

            const {payload} = await dispatch(createProductThunk({...createData, image: imageFile}))
            if(payload.statusCode == 201){
                toast.success(payload.message)
                onCancel()
            }else{
                toast.error("Failed to create product")
            }
        }else{
            const {image: file, ...updateData} = data
            
            const imageFile = file[0]
            const {payload} = await dispatch(updateProductThunk({...updateData, image: imageFile}))
            if(payload.statusCode == 200){
                toast.success(payload.message)
                onCancel()
            }else{
                toast.error("Failed to update update")
            }
        }
    }

    return (
        <div>
            <div className="mb-6 flex text-2xl items-center justify-between font-semibold">
                <h2 className="flex items-center gap-2">
                    <Link to={"/products"} className="hover:text-primary transition-colors duration-150">Product List</Link>
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
                <div className="mb-3">
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
                <div className="mb-3">
                    <label htmlFor="description" className="block mb-1 text-sm text-gray-500">Description</label>
                    <textarea
                     type="text" 
                     {...register("description")}
                     id="description"
                     className="w-full border rounded-md border-black/20 p-2 outline-primary"
                     autoComplete="off"
                    ></textarea>
                    {errors.description?.message && (
                        <span className="text-xs text-red-400">{errors.description.message}</span>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="block mb-1 text-sm text-gray-500">Price</label>
                    <input
                     type="number" 
                     {...register("price")}
                     id="price"
                     className="w-full border rounded-md border-black/20 p-2 outline-primary"
                     autoComplete="off"
                    />
                    {errors.price?.message && (
                        <span className="text-xs text-red-400">{errors.price.message}</span>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="block mb-1 text-sm text-gray-500">Image</label>
                    <input
                     type="file" 
                     {...register("image")}
                     id="image"
                     className="w-full border rounded-md border-black/20 p-2 outline-primary"
                     autoComplete="off"
                    />
                    {errors.image?.message && (
                        <span className="text-xs text-red-400">{errors.image.message}</span>
                    )}
                </div>
                <div className="mb-6">
                    <label htmlFor="categoryId" className="block mb-1 text-sm text-gray-500">Category</label>
                    <select
                     {...register("categoryId")}
                     id="categoryId"
                     className="w-full border rounded-md border-black/20 p-2 outline-primary"
                     autoComplete="off"
                    >
                        <option value="">Select Category</option>
                        {categories?.map(val => (
                            <option key={val.id} value={val.id}>{val.name}</option>
                        ))}
                    </select>
                    {errors.categoryId?.message && (
                        <span className="text-xs text-red-400">{errors.categoryId.message}</span>
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
                        dispatch(clearProduct())
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
