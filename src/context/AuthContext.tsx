import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserModel } from "@/models/UserModel";
import { albumApi, userApi } from "@/services/apiService";
import toast from "react-hot-toast";

interface AuthContextModel extends UserModel {
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<string | void>;
	logout: () => void;
}

export const AuthContext = createContext({} as AuthContextModel);

interface Props {
	children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
	const [userData, setUserData] = useState<UserModel>();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		const data: UserModel = JSON.parse(
			localStorage.getItem("@Auth.Data") || "{}"
		);
		if (data.id) {
			setUserData(data);
			setIsAuthenticated(true);
		}
	}, []);

	const login: AuthContextModel["login"] = useCallback(
		async (email, password) => {
			try {
				const respAuth = await userApi.post("/users/auth", {
					email,
					password,
				});
				const { data } = respAuth;
				toast.success("Login efetuado com sucesso!"); 

				localStorage.setItem("@Auth.Token", JSON.stringify(data.token));
				userApi.defaults.headers.common.Authorization = `Basic ${data.token}`;
				albumApi.defaults.headers.common.Authorization = `Basic ${data.token}`;

				const respUserInfo = await userApi.get(`/users/${data.id}`);
				const userData = respUserInfo.data;
				
				localStorage.setItem("@Auth.Data", JSON.stringify(userData));
				setUserData(userData);
				setIsAuthenticated(true);
			} catch (error) {
				toast.error("Erro ao efetuar login!");
				return (error as Error).message;
			}
		},
		[]
	);

	const logout: AuthContextModel["logout"] = useCallback(() => {
		localStorage.removeItem("@Auth.Token");
		localStorage.removeItem("@Auth.Data");
		setUserData(undefined);
		setIsAuthenticated(false);
		navigate("/"); 
	}, [navigate]);

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, ...userData, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};
