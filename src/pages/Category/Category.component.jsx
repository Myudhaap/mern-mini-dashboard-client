import { useCallback } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { deleteCategoryThunk, getAllCategoryThunk } from "../../stores/actions/categoryAction"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

export default function Category() {
    const {
        categories,
        isLoading
    } = useSelector(state => state.category)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchCategory = useCallback(async () => {
        return await dispatch(getAllCategoryThunk())
    }, [])

    const onDelete = async (id) => {
        const {payload} = await dispatch(deleteCategoryThunk(id))
        if(payload.statusCode == 200){
            toast.success(payload.message)
        }else{
            toast.error("Failed to delete category")
        }
    }

    useEffect(() => {
        fetchCategory()
    },[dispatch])

    if(isLoading) return null

    const indexColumn = (rowData, options) => {
        return options.rowIndex + 1
    }

    const actionColumn = (rowData) => {
        return (
            <div className="flex gap-2 justify-center">
                <button
                className="bg-primary hover:bg-primary/90 transition-colors duration-150 text-white rounded-md p-1 px-2"
                onClick={() => navigate(`form/${rowData.id}`)}
                >
                    <FontAwesomeIcon className="text-xs" icon={faPencil}/>
                </button>
                <button
                className="bg-red-500 hover:bg-red-500/90 transition-colors duration-150 text-white rounded-md p-1 px-2"
                onClick={() => onDelete(rowData.id)}
                >
                    <FontAwesomeIcon className="text-xs" icon={faTrash}/>
                </button>
            </div>
        )
    }

    return (
        <div>
            <div className="mb-6 flex text-2xl items-center justify-between font-semibold">
                <h2>Category List</h2>
                <Link to={"form"}
                 className="flex gap-2 font-semibold items-center text-white bg-primary hover:bg-primary/90 transition-colors duration-150 text-sm p-2 rounded-sm">
                    <FontAwesomeIcon icon={faPlus}/>
                    <span>Category</span>
                </Link>
            </div>

            <div className="card">
                <DataTable
                dataKey="id"
                stripedRows 
                value={categories} 
                removableSort 
                paginator 
                rows={5} 
                rowsPerPageOptions={[5, 10, 25, 50]}
                emptyMessage={"No categories found."}
                >
                    <Column body={indexColumn} header="#"/>
                    <Column field="name" header="Name" sortable></Column>
                    <Column body={actionColumn} header="Actions" headerStyle={{display: "flex", justifyContent: "center"}}></Column>
                </DataTable>
            </div>
        </div>
    )
}