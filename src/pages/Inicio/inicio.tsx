import { Button } from "@/components/ui/button";
import Header from "../../components/header";
import { Link } from "react-router-dom";

const Inicio = () => {
	return (
		<div className="w-full h-screen bg-init-background bg-cover bg-no-repeat flex flex-col">
			<div className="w-full h-screen bg-black bg-opacity-50">
				<Header />
				<div className="ml-6 sm:ml-10 md:ml-20 mt-20 md:mt-20 w-5/6 md:w-3/6">
					<h1 className="text-white text-4xl md:text-6xl font-semibold leading-tight md:leading-[78px] mb-4 md:mb-6">
						A história da música não pode ser esquecida!
					</h1>
					<p className="text-white text-lg md:text-2xl mb-4 md:mb-6">
						Crie já sua conta e curta os sucessos{" "}
						<br className="hidden md:block" />
						que marcaram os tempos no Vinil.
					</p>
					<Link to="/criarConta">
						<Button className="w-full md:w-64 text-black font-semibold bg-[#9EE2FF] hover:bg-[#ccf0ff]">
							Inscrever-se
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Inicio;
