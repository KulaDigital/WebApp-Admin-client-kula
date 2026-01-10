import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/SA/dashboard');
    }

    return (
        <div className="flex flex-col gap-4 w-full h-full border-1 p-5 justify-center items-center">
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <label>Username</label>
                    <input className="border-1" />
                </div>
                <div className="flex flex-col gap-2">
                    <label>Password</label>
                    <input className="border-1" />
                </div>
                <Button label={'login'} onClick={handleLogin} />
            </div>

        </div>
    )
}