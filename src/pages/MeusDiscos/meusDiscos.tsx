import React, { useEffect, useState } from "react";
import Header from "@/components/header";
import { PlayCircleIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";
import AlbumModalCollection from "../../components/albumModalCollection";
import { AlbumModelCollection } from "@/models/AlbumModelCollection";
import { albumApi } from "@/services/apiService";

const MeusDiscos: React.FC = () => {
	const [albums, setAlbums] = useState<AlbumModelCollection[]>([]);
	const [albumSelecionado, setAlbumSelecionado] =
		useState<AlbumModelCollection | null>(null);

	const handleAlbumClick = (album: AlbumModelCollection) => {
		setAlbumSelecionado(album);
	};

	const handleModalClose = () => {
		setAlbumSelecionado(null);
	};

	const carregarAlbums = () => {
		albumApi.get("/albums/my-collection").then((response) => {
			setAlbums(response.data);
		});
	};

	useEffect(() => {
		carregarAlbums();
	}, []);

	return (
		<div className="h-screen flex flex-col bg-[#19181F]">
			<Header />
			<div className="flex flex-col mt-28 m-10">
				<h1 className="text-white text-4xl font-semibold mb-6">
					Meus Discos
				</h1>
				<div className="flex">
					<div className="flex items-center bg-white p-4 rounded-md shadow-md mr-4">
						<div className="mr-2">
							<PlayCircleIcon className="h-10 w-10 text-gray-600" />
						</div>
						<div>
							<p className="text-lg font-semibold">
								Total de Albums
							</p>
							<p className="text-gray-600">{albums.length}</p>
						</div>
					</div>
					<div className="flex items-center bg-white p-4 rounded-md shadow-md">
						<div className="mr-2">
							<CurrencyDollarIcon className="h-10 w-10 text-gray-600" />
						</div>
						<div>
							<p className="text-lg font-semibold">
								Valor Investido
							</p>
							<p className="text-gray-600">
								R${" "}
								{albums
									.reduce(
										(somatorio, valorAtual) =>
											somatorio + valorAtual.value,
										0
									)
									.toFixed(2)}
							</p>
						</div>
					</div>
				</div>
				<div className="flex flex-wrap justify-center ">
					{albums.map((album) => (
						<div
							className="max-w-[210px] mx-3 my-4 cursor-pointer overflow-hidden"
							key={album.id}
							onClick={() => handleAlbumClick(album)}
						>
							<div className="embla__slide rounded-lg relative">
								<img
									src={album.imageUrl}
									alt={album.name}
									className="w-full rounded-lg"
								/>
								<div className="absolute inset-0 flex justify-center items-center text-white">
									<h3 className="text-2xl font-bold leading-tight tracking-tight text-center">
										{album.name}
									</h3>
								</div>
								<div className="absolute bottom-0 right-0 p-4 bg-black bg-opacity-50 rounded-tl-lg rounded-br-lg">
									<p className="text-lg font-semibold text-white">
										R$ {album.value}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
				{albumSelecionado && (
					<AlbumModalCollection
						album={albumSelecionado}
						fechar={handleModalClose}
					/>
				)}
			</div>
		</div>
	);
};

export default MeusDiscos;
