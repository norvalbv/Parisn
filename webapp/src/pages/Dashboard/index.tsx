import Radial from '../../components/Design/Radial';
import { DASHBOARD_IMAGE, DASHBOARD_VIDEO } from '../../constants';
import Button from '../../components/Button';
import { ParentSize } from '@visx/responsive';
import { Line } from '@visx/shape';

const Dashboard = () => {
  return (
    <>
      <div className="flex items-center overflow-hidden">
        <div className="h-screen">
          <video
            src={DASHBOARD_VIDEO}
            muted
            autoPlay
            loop
            className="absolute h-[100vh] opacity-50 sepia contrast-125"
          />
          <div className="absolute h-screen bg-fuchsia-200 opacity-10 w-screen" />
        </div>

        <div className="relative flex justify-center items-center flex-1">
          <div className="absolute text-center">
            <div data-testid="PARISN.com">
              <span className="text-[3rem] drop-shadow-[0_0_16px_rgba(255,255,255,0.7)]">
                PARISN
              </span>
              <span className="drop-shadow-[0_0_16px_rgba(255,255,255,0.5)]">.com</span>
            </div>
            <span className="text-3xl tracking-widest block">A Fashion Company</span>
            <Button
              text="View Collections"
              classes="mt-20"
              rounded="lg"
              navigateTo="/collections"
            />
          </div>
        </div>
      </div>
      <div className="h-[150vh] relative overflow-hidden">
        <ParentSize>
          {(parent) => (
            <>
              <svg height={parent.height} width={parent.width} fill="#555555" stroke="#ffffff">
                <Line
                  from={{ x: 0, y: 0 }}
                  to={{ x: parent.width, y: parent.height / 5 }}
                  stroke="#FAFAFA"
                  strokeOpacity={0.75}
                />
                <Line
                  from={{ x: parent.width, y: parent.height / 5 }}
                  to={{ x: 0, y: parent.height / 3 }}
                  stroke="#FAFAFA"
                  strokeOpacity={0.75}
                />
                <Line
                  from={{ x: 0, y: parent.height / 3 }}
                  to={{ x: parent.width, y: parent.height / 1.5 }}
                  stroke="#FAFAFA"
                  strokeOpacity={0.75}
                />
                <Line
                  from={{ x: parent.width, y: parent.height / 1.5 }}
                  to={{ x: 0, y: parent.height }}
                  stroke="#FAFAFA"
                  strokeOpacity={0.75}
                />
              </svg>
              <p
                className={`absolute text-primary-light text-center tracking-widest text-lg rotate-[8.85deg]`}
                style={{ left: parent.width / 2 - 50, top: parent.height / 11.75 }}
              >
                A new way of shopping
              </p>
              <p
                className={`absolute text-primary-light text-center tracking-widest text-lg block rotate-[15deg]`}
                style={{
                  left: parent.width / 2 - 50,
                  top: parent.height / 2.05,
                }}
              >
                Your way, your price
              </p>
              <Radial colour="green" classes="-top-32 -right-32" />
              <Radial colour="purple" classes="-bottom-32 -left-32" />
            </>
          )}
        </ParentSize>
      </div>
      <div className="h-screen flex">
        <p className="flex flex-col justify-center items-center text-center px-40 leading-8">
          <span className="block font-semibold text-inherit underline">PARSIN.com</span>
          Launched in 2022 allows you to choose the price you pay for your items in a reverse
          bidding strategy technique. Starting at £10,000 per item, over time the price of the item
          drops to £0.
        </p>
        <img src={DASHBOARD_IMAGE} alt={DASHBOARD_IMAGE} className="h-screen w-[42.5%]" />
      </div>
    </>
  );
};

export default Dashboard;
