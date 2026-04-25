import { useNavigate } from "react-router-dom"; // 1. Importa el hook

export default function Login(){
    const navigate = useNavigate(); // 2. Inicializa la función

    const handleSubmit = () => {
       // 3. Llama a la función con la ruta
       navigate("/products", { replace: true });
    }

    return(
        <div>
            <h1>Login</h1>
            <button onClick={handleSubmit}>Iniciar sesión</button>
        </div>
    );
}
