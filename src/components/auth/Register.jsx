import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RegisterService from '../../services/RegisterService';

const Register = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")

    const handleRegister = async(e) =>{
        e.preventDefault();

        const userName = firstName + " "+ lastName
        if(confirmPassword != confirmPassword){
            console.error("Password do not match")
        }
        try {
            let response = await RegisterService(email,userName,password)
            console.log(response.data)
        } catch (error) {
            console.info(error.response.data)
        }
    }
    


    return (
        <div className="flex flex-col items-center mt-20 " >
            
            <div className='border-2 w-[456px] bg-[#fff] pb-8m ' >
                
                <div className='pt-[30px] px-[30px]'>
                    <div className='mb-2 text-[#111] text-[22px] font-semibold leading-[30px] tracking-[-0.55px]'>
                        Register
                        
                    </div>
                    <div className='mb-5 text-[#A9ABBD] font-medium leading-[26px] tracking-[-0.2px]'>
                        Register to continue
                    </div>
                    <form className='flex flex-col gap-4' >
                        <div className='flex flex-row gap-4'>
                            <input 
                            type="text" 
                            name='firstName' 
                            className='w-full h-10 px-4 border-[#A9ABBD] border'
                            placeholder='First Name'
                            value={firstName}
                            onChange={(e)=> setFirstName(e.target.value)}
                            />
                            <input
                            type="text" 
                            name='lastName' 
                            className='w-full h-10 px-4 border-[#A9ABBD] border'
                            placeholder='Lats Name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <input 
                        type="email" 
                        name="email"
                        className='w-full h-10 px-4 border-[#A9ABBD] border'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                        type="password" 
                        name="password"
                        placeholder='Password'
                        className='w-full h-10 px-4 border-[#A9ABBD] border'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <input 
                        type="password" 
                        name="password"
                        placeholder='Confirm Password '
                        className='w-full h-10 px-4 border-[#A9ABBD] border'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button 
                        type="submit" 
                        onClick={handleRegister}
                        className='w-full h-10 px-4 border border-[#A9ABBD] font-semibold bg-[#cdcecf] items-end'>
                            Register
                        </button>
                    </form>
                    <div className='pt-5 flex justify-end items-center'>
                        <Link to='/login' className='text-[#979797] font-bold tracking-[-0.3px]'>Have an account?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
