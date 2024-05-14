import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.jpeg";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Header = () => {
	const { isAuthenticated, logout } = useAuth();
	const location = useLocation();
	const userData = localStorage.getItem("@Auth.Data");
	const userName = userData ? JSON.parse(userData)?.name : "";
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768); // Mobile breakpoint at 768px
		};

		handleResize(); // Set initial state
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<header className="w-full fixed z-10 h-16 px-6 sm:px-10 md:px-16 lg:px-28 flex justify-between items-center bg-[#b4b7b8] backdrop-blur-lg bg-opacity-45 shadow-lg">
			<div className="flex justify-between items-center gap-3">
				<img src={logo} className="h-8 w-auto" alt="Logo" />
				<p className="text-white text-sm sm:text-base">BootPlay</p>
			</div>
			{isAuthenticated ? (
				<div className="flex items-center gap-3">
					{isMobile ? (
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Button className="text-white">Menu</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>
									{userName}
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Link to="/dashboard">Dashboard</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link to="/meusdiscos">Meus Discos</Link>
								</DropdownMenuItem>

								<DropdownMenuItem onClick={logout}>
									<LogOut className="mr-2 h-4 w-4" />
									<span>Log out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<>
							<Link
								to="/dashboard"
								className="font-semibold underline"
							>
								<Button
									className={`w-24 sm:w-28 md:w-32 text-white font-semibold bg-transparent ${
										location.pathname === "/dashboard"
											? "bg-black"
											: ""
									}`}
								>
									Dashboard
								</Button>
							</Link>
							<Link
								to="/meusdiscos"
								className="font-semibold underline"
							>
								<Button
									className={`w-24 sm:w-28 md:w-32 text-white font-semibold bg-transparent ${
										location.pathname === "/meusdiscos"
											? "bg-black"
											: ""
									}`}
								>
									Meus Discos
								</Button>
							</Link>
							<DropdownMenu>
								<DropdownMenuTrigger>
									<button>
										<img
											src={avatar}
											className="h-8 w-8 rounded-full"
											alt="User Avatar"
										/>
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>
										{userName}
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={logout}>
										<LogOut className="mr-2 h-4 w-4" />
										<span>Log out</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</>
					)}
				</div>
			) : (
				<div className="flex items-center gap-3">
					{isMobile ? (
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Button className="text-white">Menu</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>
									<NavLink to="/login">Entrar</NavLink>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<NavLink to="/criarConta">
										Inscrever-se
									</NavLink>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<nav className="flex justify-between items-center gap-3">
							<NavLink to="/login">
								<Button className="w-24 sm:w-32 md:w-40 text-white font-semibold">
									Entrar
								</Button>
							</NavLink>
							<NavLink to="/criarConta">
								<Button className="w-24 sm:w-32 md:w-40 text-black font-semibold bg-[#9EE2FF] hover:bg-[#ccf0ff]">
									Inscrever-se
								</Button>
							</NavLink>
						</nav>
					)}
				</div>
			)}
		</header>
	);
};

export default Header;
