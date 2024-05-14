import React, { useState } from "react";
import { AlbumModel } from "@/models/AlbumModel";
import AlbumModal from "./albumModal";

interface AlbumListProps {
	albums: AlbumModel[];
}

const AlbumList: React.FC<AlbumListProps> = ({ albums }) => {
	const [albumSelecionado, setAlbumSelecionado] = useState<AlbumModel | null>(
		null
	);

	const handleAlbumClick = (album: AlbumModel) => {
		setAlbumSelecionado(album);
	};

	const handleModalClose = () => {
		setAlbumSelecionado(null);
	};

	return (
		<div className="w-full flex flex-row flex-wrap justify-center">
			{albums.map((album) => (
				<div
					className="max-w-[210px] mx-3 my-4 cursor-pointer"
					key={album.id}
					onClick={() => handleAlbumClick(album)}
				>
					<div className="embla__slide rounded-lg relative">
						<img
							src={album.images[0].url}
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
					{albumSelecionado && (
						<AlbumModal
							album={albumSelecionado}
							fechar={handleModalClose}
						/>
					)}
				</div>
			))}
		</div>
	);
};

export default AlbumList;
