import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

import Login from "./pages/Login/login";
import CriarConta from "./pages/CriarConta/criarConta";
import Inicio from "./pages/Inicio/inicio";
import Dashboard from "./pages/Dashboard/dashboard";
import { PrivateRoutes } from "./utils/PrivateRoutes";

export default function App() {
	const { isAuthenticated } = useAuth();

	return (
		<Routes>
			<Route path="/" element={<Inicio />} />
			<Route
				path="/login"
				element={
					isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
				}
			/>
			<Route
				path="/criarConta"
				element={
					isAuthenticated ? (
						<Navigate to="/dashboard" />
					) : (
						<CriarConta />
					)
				}
			/>

			<Route
				path=""
				element={
					isAuthenticated ? (
						<PrivateRoutes />
					) : (
						<Navigate to="/login" />
					)
				}
			>
				<Route path="/dashboard" element={<Dashboard />} />
			</Route>
		</Routes>
	);
}
