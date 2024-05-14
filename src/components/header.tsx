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
	DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

const Header = () => {
	const { isAuthenticated, logout } = useAuth();
	const location = useLocation();
	const userData = localStorage.getItem("@Auth.Data");
	const userName = userData ? JSON.parse(userData)?.name : '';

	return (
		<header className="w-full fixed z-10 h-16 px-28 flex justify-between items-center bg-[#b4b7b8] backdrop-blur-lg bg-opacity-45 shadow-lg">
			<div className="flex justify-between items-center gap-3">
				<img src={logo} />
				<p className="text-white">BootPlay</p>
			</div>
			{!isAuthenticated ? (
				<nav className="flex justify-between items-center gap-3">
					<NavLink to="/login">
						<Button className="w-40 text-white font-semibold">
							Entrar
						</Button>
					</NavLink>
					<NavLink to="/criarConta">
						<Button className="w-40 text-black font-semibold bg-[#9EE2FF]  hover:bg-[#ccf0ff]">
							Inscrever-se
						</Button>
					</NavLink>
				</nav>
			) : (
				<div className="flex justify-between items-center gap-3">
					<Link to="/dashboard" className="font-semibold underline">
						<Button
							className={`w-32 text-white font-semibold bg-transparent ${
								location.pathname === "/dashboard"
									? "bg-black"
									: ""
							}`}
						>
							Início
						</Button>
					</Link>
					<Link to="/meusdiscos" className="font-semibold underline">
						<Button
							className={`w-32 text-white font-semibold bg-transparent ${
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
									className="size-10 rounded-[50%]"
								/>
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>{userName}</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<LogOut className="mr-2 h-4 w-4" />
								<span onClick={logout}>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)}
		</header>
	);
};

export default Header;
