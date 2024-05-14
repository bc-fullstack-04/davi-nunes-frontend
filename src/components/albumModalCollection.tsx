import React from "react";
import { AlbumModelCollection } from "@/models/AlbumModelCollection";
import { Button } from "./ui/button";
import { albumApi } from "@/services/apiService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Props {
	album: AlbumModelCollection;
	fechar: () => void;
}

const AlbumModalCollection: React.FC<Props> = ({ album, fechar }) => {
	const navigate = useNavigate();
	const handleDeletar = async (albumId: string) => {
		try {
			await albumApi.delete(`/albums/remove/${albumId}`);

			toast.success("Álbum excluído com sucesso");
			navigate("/dashboard");
		} catch (error) {
			toast.error("Erro ao excluir o álbum");
			console.error("Erro ao excluir o álbum:", error);
		}
	};

	return (
		<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
			<div className="bg-white p-8 rounded-lg">
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
					<img
						src={album.imageUrl}
						alt={album.name}
						className="w-48 h-48 mr-8 rounded-lg cursor-pointer"
					/>
					<div>
						<p className="text-gray-600 mt-2">{album.artistName}</p>
						<p className="text-gray-600 mt-2">
							Preço: R$ {album.value}
						</p>
						<Button
							onClick={() => handleDeletar(album.id)}
							className="bg-[#e02929] w-full text-white px-4 py-2 mt-4 rounded-3xl"
						>
							Deletar
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AlbumModalCollection;
