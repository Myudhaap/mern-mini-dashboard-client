import electronInstance from "../api/electronInstance"

const authService = () => {
    const login = async (payload) => {
        try{
            const res = await electronInstance.post("/auth/login", payload);

            return res.data
        }catch(e){
            throw new Error(e.response?.data.message || e.message)
        }
    }

    const register = async (payload) => {
        payload.role = "CUSTOMER"

        try{
            const res = await electronInstance.post("/auth/register", payload)

            return res.data
        }catch(e){
            throw new Error(e.response?.data.message || e.message)
        }
    }

    return {
        login,
        register
    }
}

export default authService