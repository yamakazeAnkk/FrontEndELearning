import axios from "axios";
import instance from "./Axios";



const RegisterService = (email,userName,password) => {
    return (
        instance.post("api/auth/register",{ email,userName,password})
    );
}

export default RegisterService;
