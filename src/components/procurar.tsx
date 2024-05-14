import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Carousel from "./embla/carousel";
import AlbumList from "./listaAlbums";
import { albumApi } from "@/services/apiService";
import { AlbumModel } from "@/models/AlbumModel";

const Procurar = () => {
	const [procurar, setProcurar] = useState("");
	const [showCarousel, setShowCarousel] = useState(true);
	const [albums, setAlbums] = useState<AlbumModel[]>([]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProcurar(e.target.value);
		setShowCarousel(e.target.value === "");
	};

	useEffect(() => {
		const carregarAlbums = async () => {
			if (procurar !== "") {
				try {
					const resp = await albumApi.get(
						`/albums/all?searchText=${procurar}`
					);
					setAlbums(resp.data);
				} catch (error) {
					console.error("Erro ao carregar álbuns:", error);
				}
			}
		};

		carregarAlbums();
	}, [procurar]);

	return (
		<div
			className={`flex flex-col h-screen bg-[#19181F] shadow-[0px_-15px_51px_46px_#19181F] p-1 ${
				showCarousel ? "overflow-hidden" : ""
			}`}
		>
			<form className="flex flex-row justify-center items-center mb-5">
				<input
					type="text"
					placeholder="Procurar Álbum"
					className="w-[25%] ring-1 ring-zinc-400 h-8 px-2 text-zinc-500 rounded-sm bg-[#19181F]"
					value={procurar}
					onChange={handleInputChange}
				/>
				<div className="ml-[-30px]">
					<MagnifyingGlassIcon className="h-6 w-6 text-white" />
				</div>
			</form>
			{showCarousel && (
				<div className="h-full overflow-hidden">
					<Carousel />
				</div>
			)}
			{!showCarousel && (
				<div
					className={`h-full overflow-y-auto ${
						showCarousel ? "hidden" : ""
					}`}
				>
					<AlbumList albums={albums} />
				</div>
			)}
		</div>
	);
};

export default Procurar;
