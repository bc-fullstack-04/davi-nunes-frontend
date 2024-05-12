import Banner from "@/components/banner";
import Procurar from "@/components/procurar";

const Dashboard = () => {
	return (
		<div className="w-full h-screen flex flex-col">
			<Banner />
            <Procurar />
		</div>
	);
};

export default Dashboard;
