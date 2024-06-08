import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteProductThunk, getAllProductThunk } from "../../stores/actions/productAction"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import Loading from "../../shared/components/Loading/Loading"

export default function Product() {
    const {
        products,
        isLoading
    } = useSelector(state => state.product)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchProduct = useCallback(async () => {
        return await dispatch(getAllProductThunk())
    }, [])

    const onDelete = async (id) => {
        const {payload} = await dispatch(deleteProductThunk(id))
        if(payload.statusCode == 200){
            toast.success(payload.message)
        }else{
            toast.error("Failed to delete product")
        }
    }

    useEffect(() => {
        fetchProduct()
    },[dispatch])

    if(isLoading) return <Loading/>

    const indexColumn = (rowData, options) => {
        return options.rowIndex + 1
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('id-ID', { 
            style: 'currency', 
            currency: 'IDR', 
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    };

    const imageColumn = (rowData) => {
        return(
            <div> 
                <img src={rowData.image} alt={rowData.image} className="w-20 shadow-sm rounded" />
            </div>  
        ) 
    };

    const priceColumn = (rowData) => {
        return formatCurrency(rowData.price);
    };

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

    const descColumn = (rowData) => {
        return <span>{rowData.description.length > 50 ? rowData.description.substring(0,50) + "..." : rowData.description}</span>
    }

    return (
        <div>
            <div className="mb-6 flex text-2xl items-center justify-between font-semibold">
                <h2>Product List</h2>
                <Link to={"form"}
                 className="flex gap-2 font-semibold items-center text-white bg-primary hover:bg-primary/90 transition-colors duration-150 text-sm p-2 rounded-sm">
                    <FontAwesomeIcon icon={faPlus}/>
                    <span>Product</span>
                </Link>
            </div>

            <div className="card">
                <DataTable
                dataKey="id"
                stripedRows 
                value={products} 
                removableSort 
                paginator 
                rows={5} 
                rowsPerPageOptions={[5, 10, 25, 50]}
                emptyMessage={"No products found."}
                >
                    <Column body={indexColumn} header="#"/>
                    <Column body={imageColumn} field="image" header="Image"></Column>
                    <Column field="name" header="Name" sortable></Column>
                    <Column body={priceColumn} field="price" header="Price" sortable></Column>
                    <Column body={descColumn} header="Description"></Column>
                    <Column body={actionColumn} header="Actions" headerStyle={{display: "flex", justifyContent: "center"}}></Column>
                </DataTable>
            </div>
        </div>
    )
}
