import { Button } from "@/components/ui/button";
import LabelInput from "../../components/labelInput";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { FormEvent, useState, ChangeEvent} from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { login, isAuthenticated } = useAuth();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	async function handleLogin(e: FormEvent) {
		e.preventDefault();
		login(formData.email, formData.password)
	}

	return (
		<>
			{isAuthenticated && <Navigate to="/" />}
			<div className="bg-init-background bg-cover bg-no-repeat">
				<div className="w-full h-screen flex items-center justify-center backdrop-brightness-50 backdrop-blur-sm">
					<div className="flex flex-col bg-white rounded-md h-fit w-full max-w-[320px] items-center p-10 shadow-md">
						<div className="flex flex-col items-center justify-center">
							<img src={logo} />
							<h1 className="text-2xl font-bold">
								Acesse sua conta
							</h1>
						</div>
						<form
							onSubmit={handleLogin}
							className="flex flex-col w-full"
						>
							<LabelInput
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
							>
								E-mail
							</LabelInput>
							<LabelInput
								type="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								required
							>
								Senha
							</LabelInput>
							<Button>Entrar</Button>
						</form>
						<p className="text-xs font-ligh mt-2">
							Ainda não tem conta ?{" "}
							<Link
								to="/criarConta"
								className="font-semibold underline"
							>
								Inscrever-se
							</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
