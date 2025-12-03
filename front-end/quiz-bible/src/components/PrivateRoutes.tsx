import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export function PrivateRouter(){
const { user,loading } = useAuth()

if(loading){
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh' 
        }}>
            <p>Carregando...</p>
        </div>
    )
}

if(!user){
    return <Navigate to='/' replace />
}
return <Outlet />
}
