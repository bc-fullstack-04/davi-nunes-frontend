import Header from "./header";

const Banner = () => {
	return (
		<div className="flex flex-col bg-banner-background bg-cover bg-no-repeat bg-[center_top_-17rem]">
			<div className="bg-black bg-opacity-50">
				<Header></Header>
				<div className="ml-20 mt-24 mb-28 w-3/6">
					<h1 className="text-white text-4xl font-semibold mb-6">
						A história da música não <br /> pode ser esquecida!
					</h1>
					<p className="text-white text-xl mb-6">
						Sucessos que marcaram o tempo!!!
					</p>
				</div>
			</div>
		</div>
	);
};

export default Banner;
