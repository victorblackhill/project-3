import axios from "axios"


const service = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:8080",
    //withCredentials: true,
})

const signup = async (email, password)=> {
        const res = await service.post("/signup",{email,password})
        console.log(res)
        return res.data
}


const AuthService = {
    ...service,
    signup,
}

export default AuthService