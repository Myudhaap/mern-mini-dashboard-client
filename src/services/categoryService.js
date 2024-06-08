import electronInstance from "../api/electronInstance";

const categoryService = () => {
    const getAll = async () => {
        try{
            const res = await electronInstance.get("/categories");

            return res.data
        }catch(e){
            throw new Error(e.response?.data.message || e.message)
        }
    }

    const getById = async (id) => {
        try{
            const res = await electronInstance.get(`/categories/${id}`);

            return res.data
        }catch(e){
            throw new Error(e.response?.data.message || e.message)
        }
    }

    /*
        PAYLOAD = {
            name string
        }
    */
    const create = async (payload) => {
        try{
            const res = await electronInstance.post("/categories", payload);

            return res.data
        }catch(e){
            throw new Error(e.response?.data.message || e.message)
        }
    }

    /*
        PAYLOAD = {
            id string
            name string
        }
    */
    const update = async (payload) => {
        try{
            const res = await electronInstance.put("/categories", payload);

            return res.data
        }catch(e){
            throw new Error(e.response?.data.message || e.message)
        }
    }

    const deleteCategory = async (id) => {
        try{
            const res = await electronInstance.delete(`/categories/${id}`);

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

export default categoryService