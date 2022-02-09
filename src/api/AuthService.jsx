import axios from "axios"


const service = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:8080",
   withCredentials: true,
})

const signup = async (email, password)=> {
        const res = await service.post("/signup",{email,password})
        console.log(res)
        return res.data
}

const logout = async () => {
    const res = service.post("/logout")
    return res
}

const signin = async (email, password)=> {
    const res = await service.post("/login",{email,password})
    console.log(res)
    return res.data
}

const isLoggedIn = async (email, password)=> {
    const res = await service.get("/loggedin",{email,password})
    console.log(res)
    return res.data
}



const AuthService = {
    ...service,
    signup,
    logout,
    signin,
    isLoggedIn
}

export default AuthService