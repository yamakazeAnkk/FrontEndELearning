import axios from "axios";
import instance from "./Axios";


const LoginApi = (email,password)=>{
    return  instance.post("api/auth/login", { email,password });

};
export{LoginApi}
