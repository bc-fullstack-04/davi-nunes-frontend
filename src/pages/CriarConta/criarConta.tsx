import { Button } from "@/components/ui/button";
import LabelInput from "../../components/labelInput";
import logo from "../../assets/logo.svg";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { userApi } from "@/services/apiService";
import { FormEvent, useState, ChangeEvent } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const CriarConta = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();
	const _navigate = useNavigate();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	async function handleSignup(e: FormEvent) {
		e.preventDefault();
		setLoading(true);

		try {
			await userApi.post("/users/create", formData);
			toast.success("Usuário cadastrado com sucesso!");
			login(formData.email, formData.password)
				.then(() => {
					toast.success("Login efetuado com sucesso!");
					setTimeout(() => {
						_navigate("/dashBoard");
					}, 2000);
				})
				.catch(() => {
					toast.error("Erro ao efetuar login!");
				});
		} catch (error) {
			toast.error(
				"Falha ao cadastrar usuário. Tente novamente mais tarde."
			);
			console.error("Erro ao cadastrar usuário:", error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="w-full h-screen bg-init-background bg-cover bg-no-repeat">
			<div className="w-full h-screen flex items-center justify-center backdrop-brightness-50 backdrop-blur-sm">
				<div className="flex flex-col bg-white rounded-md h-fit w-full max-w-[320px] items-center p-10 shadow-md">
					<div className="flex flex-col items-center justify-center">
						<img src={logo} />
						<h1 className="text-2xl font-bold">Criar Conta</h1>
					</div>
					<form
						onSubmit={handleSignup}
						className="flex flex-col w-full"
					>
						<LabelInput
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
						>
							Nome Completo
						</LabelInput>
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
						<Button type="submit" disabled={loading}>
							{loading ? (
								<ArrowPathIcon className="animate-spin h-4 w-4 mr-2" />
							) : (
								"Criar Conta"
							)}
						</Button>
					</form>
					<p className="text-xs font-ligh mt-2">
						Já tem uma conta?{" "}
						<Link to="/login" className="font-semibold underline">
							Entrar
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default CriarConta;
