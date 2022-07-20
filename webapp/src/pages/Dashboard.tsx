import Radial from "../components/Design/Radial";
import NavBar from "../layout/NavBar";
import { DASHBOARD_IMAGE } from "../constants";
import Button from "../components/Button";
import Line from "../components/Design/Line";

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <div className="flex items-center">
        <img
          src={DASHBOARD_IMAGE}
          alt={DASHBOARD_IMAGE}
          className="h-screen w-[42.5%] -mt-[4.5rem]"
        />

        <div className="relative flex justify-center items-center flex-1">
          <Radial />

          <div className="text-white absolute text-center">
            <div className="my-3">
              <span className="text-[3rem] drop-shadow-[0_0_16px_rgba(255,255,255,0.5)]">
                PARISN
              </span>
              <span className="drop-shadow-[0_0_16px_rgba(255,255,255,0.5)]">
                .com
              </span>
            </div>
            <span className="text-3xl tracking-widest">A Fashion Company</span>
            <Button text="Order now" classes="mt-8" />
          </div>
        </div>
      </div>
      <div className="h-screen">
        <Radial />
        <Line rotate="clockWise" />
        <Line rotate="antiClockWise" />
        <Line rotate="verticle" />
      </div>
      <div className="h-screen flex">
        <p className="flex-1">
          PARSIN.com <br /> Launched in 2022 allows you to choose the price you
          pay for your items in a reverse bidding strategy technique. Starting
          at £10,000 per item, over time the price of the item drops to £0.
        </p>
        <img
          src={DASHBOARD_IMAGE}
          alt={DASHBOARD_IMAGE}
          className="h-screen w-[42.5%] flex-1"
        />
      </div>
    </>
  );
};

export default Dashboard;
