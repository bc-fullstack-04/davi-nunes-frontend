import { Button } from "@/components/ui/button";
import Header from "../../components/header";
import { Link } from "react-router-dom";


const Inicio = () => {
	return (
		<div className="w-full h-screen bg-init-background bg-cover bg-no-repeat flex flex-col">
			<div className="w-full h-screen bg-black bg-opacity-50">
				<Header></Header>
				<div className="ml-20 mt-20 w-3/6">
					<h1 className="text-white text-6xl font-semibold leading-[78px] mb-6">
						A história da música não pode ser esquecida!
					</h1>
					<p className="text-white text-2xl mb-6">
						Crie já sua conta e curta os sucessos <br />
						que marcaram os tempos no Vinil.
					</p>
					<Link to="/criarConta">
						<Button className="w-64 text-black font-semibold bg-[#9EE2FF] hover:bg-[#ccf0ff]">
							Inscrever-se
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Inicio;
