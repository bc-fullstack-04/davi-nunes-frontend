import Header from "./header";

const Banner = () => {
	return (
		<div className="flex flex-col bg-banner-background bg-cover bg-no-repeat bg-[center_top_-17rem] sm:bg-[center_top_-10rem] md:bg-[center_top_-5rem]">
			<div className="bg-black bg-opacity-50 w-full">
				<Header />
				<div className="mx-4 mt-16 mb-20 sm:ml-10 md:ml-16 lg:ml-20 lg:mt-24 lg:mb-28 w-full lg:w-3/6">
					<h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6">
						A história da música não{" "}
						<br className="hidden sm:block" /> pode ser esquecida!
					</h1>
					<p className="text-white text-lg sm:text-xl mb-4 sm:mb-6">
						Sucessos que marcaram o tempo!!!
					</p>
				</div>
			</div>
		</div>
	);
};

export default Banner;
