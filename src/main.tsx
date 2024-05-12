import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./global.css";
import App from "./app";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<Toaster
					position="top-right"
					toastOptions={{ duration: 2000 }}
				/>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
