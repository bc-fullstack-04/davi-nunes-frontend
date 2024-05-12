import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Carousel from "./embla/carousel";
import AlbumList from "./listaAlbums";

const Search = () => {
	const [searchText, setSearchText] = useState("");
	const [showCarousel, setShowCarousel] = useState(true);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
		setShowCarousel(false);
	};

	return (
		<div className={`h-full bg-[#19181F] shadow-[0px_-15px_51px_46px_#19181F] p-5 ${showCarousel ? "overflow-hidden": null}`}>
			<form className="flex flex-row justify-center items-center mt-3 mb-5">
				<input
					type="text"
					placeholder="Procurar Album"
					className="w-[25%] ring-1 ring-zinc-400 h-8 px-2 text-zinc-500 rounded-sm bg-[#19181F]"
					value={searchText}
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
			<div className="h-full overflow-y-auto">
				<AlbumList searchText={searchText} />
			</div>
		</div>
	);
};

export default Search;
