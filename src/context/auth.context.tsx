import React, { useState } from "react";
import { AuthModels } from "../components/models/Auth.Models";
export const AuthContext = React.createContext<AuthModels>({
    isAuth: false,
    login: () => { }
});

const AuthContextProvider: React.FC = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const loginHabdler = () => {
        setIsAuthenticated(true);
    }
    return (
        <AuthContext.Provider
            value={{ login: loginHabdler, isAuth: isAuthenticated }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
export default AuthContextProvider;