import electronInstance from "../api/electronInstance";

const productService = () => {
    const getAll = async () => {
        try{
            const res = await electronInstance.get("/products");

            return res.data
        }catch(e){
            throw new Error(e.response?.data.message || e.message)
        }
    }

    const getById = async (id) => {
        try{
            const res = await electronInstance.get(`/products/${id}`);

            return res.data
        }catch(e){
            throw new Error(e.response?.data.message || e.message)
        }
    }

    /*
        PAYLOAD = {
            name string
            description string
            price int
            image file
            categoryId string
        }
    */
    const create = async (payload) => {
        const formData = new FormData()
        formData.append("name", payload.name)
        formData.append("description", payload.description)
        formData.append("price", payload.price)
        formData.append("image", payload.image)
        formData.append("categoryId", payload.categoryId)

        try{
            const res = await electronInstance.post("/products", formData);

            return res.data
        }catch(e){
            throw new Error(e.response?.data.message || e.message)
        }
    }

    /*
        PAYLOAD = {
            id string
            name string
            description string
            price int
            image file
            categoryId string
        }
    */
   const update = async (payload) => {
       const formData = new FormData()
       formData.append("id", payload.id)
       formData.append("name", payload.name)
       formData.append("description", payload.description)
       formData.append("price", payload.price)
       formData.append("image", payload.image)
       formData.append("categoryId", payload.categoryId)
       
        try{
            const res = await electronInstance.put("/products", formData);

            return res.data
        }catch(e){
            throw new Error(e.response?.data.message || e.message)
        }
    }

    const deleteCategory = async (id) => {
        try{
            const res = await electronInstance.delete(`/products/${id}`);

            return res.data
        }catch(e){
            throw new Error(e.response?.data.message || e.message)
        }
    }
    
    return {
        getAll,
        getById,
        create,
        update,
        deleteCategory
    }
}

export default productService