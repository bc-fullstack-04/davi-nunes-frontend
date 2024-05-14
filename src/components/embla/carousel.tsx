import "./embla.css";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useEffect, useState } from "react";
import { AlbumModel } from "@/models/AlbumModel";
import { albumApi } from "@/services/apiService";
import AlbumModal from "../albumModal";

const EmblaCarousel = () => {
	const [albums, setAlbums] = useState<AlbumModel[]>([]);
	const [albumSelecionado, setAlbumSelecionado] = useState<AlbumModel | null>(
		null
	);

	useEffect(() => {
		const carregarAlbums = async () => {
			try {
				const generos = [
					"Forró",
					"Rock",
					"Celtic",
					"Boleros",
					"Jazz",
					"Reggae",
					"Hip Hop",
					"Samba",
				];
				const generosAleatorios =
					generos[Math.floor(Math.random() * generos.length) - 1];
				const response = await albumApi.get(
					`/albums/all?searchText=${generosAleatorios}`
				);
				setAlbums(response.data);
			} catch (error) {
				console.error("Erro ao carregar álbuns:", error);
			}
		};

		carregarAlbums();
	}, []);

	function handleAlbumClick(album: AlbumModel) {
		setAlbumSelecionado(album);
	}

	function fecharModal() {
		setAlbumSelecionado(null);
	}

	const [emblaRef] = useEmblaCarousel({ loop: true }, [
		AutoScroll({
			playOnInit: true,
			stopOnInteraction: false,
			stopOnMouseEnter: true,
		}),
	]);

	return (
		<div className="embla">
			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">
					{albums.map((album) => (
						<div
							className="embla__slide rounded-lg relative"
							key={album.id}
							onClick={() => handleAlbumClick(album)}
						>
							<img
								src={album.images[0].url}
								alt={album.name}
								className="w-full rounded-lg"
							/>
							<div className="absolute inset-0 flex justify-center items-center text-white">
								<h3 className="text-4xl font-bold leading-tight tracking-tight text-center">
									{album.name}
								</h3>
							</div>
							<div className="absolute bottom-0 right-0 p-4 bg-black bg-opacity-50 rounded-tl-lg rounded-br-lg">
								<p className="text-1xl font-semibold text-white">
									R$ {album.value}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
			{albumSelecionado && (
				<AlbumModal album={albumSelecionado} fechar={fecharModal} />
			)}
		</div>
	);
};

export default EmblaCarousel;
