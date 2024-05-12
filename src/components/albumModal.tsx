import React from "react";
import { AlbumModel } from "@/models/AlbumModel";
import { Button } from "./ui/button";
import { albumApi, userApi } from "@/services/apiService";

interface Props {
	album: AlbumModel;
	fechar: () => void;
}

const AlbumModal: React.FC<Props> = ({ album, fechar }) => {
	const handleComprar = async () => {
		try {
			const userData = localStorage.getItem("@Auth.Data");
			if (!userData) {
				throw new Error("Usuário não está logado");
			}
			const user = JSON.parse(userData);

			const purchaseData = {
				name: album.name,
				idSpotify: album.id,
				artistName: album.artists[0].name, //Um artista apenas
				imageUrl: album.images[0].url,
				value: album.value,
				users: {
					id: user.id,
					email: user.email,
					password: user.password,
				},
			};
			await albumApi.post("/albums/sale", purchaseData);

			await userApi.post(`/wallet/debit/${album.value}`, {
				userId: user.id,
			});

			fechar();
		} catch (error) {
			console.error("Erro ao realizar compra:", error);
		}
	};

	return (
		<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
			<div className="bg-white p-8 rounded-lg max-w-md">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-semibold">{album.name}</h2>
					<button className="text-gray-500" onClick={fechar}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<div className="flex">
					<a
						href={album.externalUrls.externalUrls.spotify}
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src={album.images[0].url}
							alt={album.name}
							className="w-48 h-48 mr-8 rounded-lg cursor-pointer"
						/>
					</a>
					<div>
						<p className="text-gray-600 mt-2">
							{album.artists
								.map((artist) => artist.name)
								.join(", ")}
						</p>
						<p className="text-gray-600 mt-2">
							Preço: R$ {album.value}
						</p>
						<p className="text-gray-600 mt-2">
							Lanç.: {album.releaseDate}
						</p>
						<Button
							onClick={handleComprar}
							className="bg-[#FBBC05] w-full text-white px-4 py-2 mt-4 rounded-3xl"
						>
							Comprar
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AlbumModal;
