import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getImageUrl } from "../utils.js"


const Login = () => {

    const { isAuthenticated, setIsAuthenticated } = useContext(Context)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigateTo = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/api/v1/user/login",
                { email, password, confirmPassword, role: "Doctor" },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            toast.success(data.message),
                setEmail(""),
                setPassword(""),
                setConfirmPassword(""),
                navigateTo("/"),
                setIsAuthenticated(true)

        } catch (error) {
            toast.error(error.data.message)
        }
    }

    if (isAuthenticated) {
        return <Navigate to={"/"} />
    }

    return (
        <div className='container form-component'>
            <img src={getImageUrl("Navbar/logoupchaar.png")} alt='logo' className='logo' />
            <h1 className='form-title'>WELCOME TO UPCHAAR</h1>
            <p className='textd'>Only Doctors Are Allowed To Access These Resorces!</p>

            <form onSubmit={handleLogin}>

                <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                <div style={{ justifyContent: "center", alignItems: "center"}}className='button'>
                    <button type='submit'>Login</button>
                </div>
            </form>

        </div>
    )
}

export default Login
