import Banner from "@/components/banner";
import Search from "@/components/search";

const Dashboard = () => {
	return (
		<div className="w-full h-screen flex flex-col">
			<Banner />
            <Search />
		</div>
	);
};

export default Dashboard;
