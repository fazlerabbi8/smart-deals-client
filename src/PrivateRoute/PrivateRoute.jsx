import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {currentUser, loading} = useContext(AuthContext);

    if(currentUser){
        return children;
    }

    if(loading){
        return <span className="loading loading-spinner text-neutral"></span>;
    }

    return (
        <div>
            <Navigate to={"/register"}></Navigate>
        </div>
    );
};

export default PrivateRoute;