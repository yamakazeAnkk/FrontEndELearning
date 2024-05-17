import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { LoginApi } from "../../services/AuthService";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const mailFormat = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    if (!email || !password) {
      toast.warning("Email/Password is required!");
      return;
    }
    if (!email.match(mailFormat)) {
      toast.warning("Email is not valid!");
      return;
    }
    try {
      let res = await LoginApi(email, password);
      const token = res.data?.token;

      console.log("Access token:", token); // In ra token
      if (typeof token !== "string") {
        throw new Error("Access token is not a valid string");
      }
      let jwt_decode = jwtDecode(token);
      console.log(jwt_decode);
      const author = jwt_decode['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      if (author === "Admin") {
        window.localStorage.setItem("token", token);
        navigate("/");
        toast.success("Login success");
      } else {
        console.log("Account is not Admin");
      }
    } catch (error) {
      // if (error.response.status === 500) {
      //   toast.warning("Email/Password is wrong");
      // }
      console.error("An error occurred:", error);
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline-purple focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;