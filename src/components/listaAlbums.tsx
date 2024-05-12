import React, { useState, useEffect } from "react";
import { AlbumModel } from "@/models/AlbumModel";
import { albumApi } from "@/services/apiService";
import AlbumModal from "./albumModal";

interface AlbumListProps {
	searchText: string;
}

const AlbumList: React.FC<AlbumListProps> = ({ searchText }) => {
	const [albums, setAlbums] = useState<AlbumModel[]>([]);
	const [selectedAlbum, setSelectedAlbum] = useState<AlbumModel | null>(null);

	const searchAlbums = async (searchText: string) => {
		try {
			const response = await albumApi.get(
				`/albums/all?searchText=${searchText}`
			);
			setAlbums(response.data);
		} catch (error) {
			console.error("Erro ao carregar álbuns:", error);
		}
	};

	const handleAlbumClick = (album: AlbumModel) => {
		setSelectedAlbum(album);
	};

	const handleModalClose = () => {
		setSelectedAlbum(null);
	};

	useEffect(() => {
		searchAlbums(searchText);
	}, [searchText]);

return (
	<div className="w-full flex flex-row flex-wrap justify-center">
		{albums.map((album) => (
			<div
				className="w-full max-w-[230px] mx-3 my-4 cursor-pointer"
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
			</div>
		))}
		{selectedAlbum && (
			<AlbumModal album={selectedAlbum} onClose={handleModalClose} />
		)}
	</div>
);
};

export default AlbumList;
