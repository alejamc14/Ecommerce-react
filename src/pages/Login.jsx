import { Navigate } from "react-router-dom";

export default function Login(){

    const handleSubmit = () => {
       return <Navigate to="/products" replace/>
    }

    return(
        <div>
            <h1>Login</h1>
            <button onClick={handleSubmit}>Login</button>
        </div>
    );
}