import Radial from "../components/Design/Radial";
import NavBar from "../layout/NavBar";
import { DASHBOARD_IMAGE } from "../constants";
import Button from "../components/Button";
import Line from "../components/Design/Line";

const Dashboard = () => {
  return (
    <div className="bg-primary-dark">
      <NavBar />
      <div className="flex items-center">
        <img
          src={DASHBOARD_IMAGE}
          alt={DASHBOARD_IMAGE}
          className="h-screen w-[42.5%] -mt-[4.5rem]"
        />

        <div className="relative flex justify-center items-center flex-1">
          <Radial colour="dark" />

          <div className="absolute text-center">
            <div>
              <span className="text-[3rem] drop-shadow-[0_0_16px_rgba(255,255,255,0.5)]">
                PARISN
              </span>
              <span className="drop-shadow-[0_0_16px_rgba(255,255,255,0.5)]">
                .com
              </span>
            </div>
            <span className="text-3xl tracking-widest block">
              A Fashion Company
            </span>
            <Button text="Order now" classes="mt-20" rounded="lg" />
          </div>
        </div>
      </div>
      <div className="h-screen">
        <Radial colour="green" />
        <Line rotate="clockWise" />
        <p>A new way of shopping</p>
        <Line rotate="antiClockWise" />
        <p>Your way, your price</p>
        <Line rotate="verticle" />
        <Radial colour="purple" />
        <Line />
      </div>
      <div className="h-screen flex">
        <p className="flex flex-col justify-center items-center text-center px-40 leading-8">
          <span className="block font-semibold text-inherit underline">
            PARSIN.com
          </span>
          Launched in 2022 allows you to choose the price you pay for your items
          in a reverse bidding strategy technique. Starting at £10,000 per item,
          over time the price of the item drops to £0.
        </p>
        <img
          src={DASHBOARD_IMAGE}
          alt={DASHBOARD_IMAGE}
          className="h-screen w-[42.5%]"
        />
      </div>
    </div>
  );
};

export default Dashboard;
