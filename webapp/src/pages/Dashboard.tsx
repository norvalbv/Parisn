import Radial from "../components/Design/Radial";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <div className="flex items-center bg-green-50">
        {/* <div className="w-full bg-red-100"> hasdasd asd i</div> */}
        <div className="relative bg-red-50 flex-1">
          <Radial />
          <div className="text-white absolute">
            Parisn is a city in the north of France. It is the capital of the
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
