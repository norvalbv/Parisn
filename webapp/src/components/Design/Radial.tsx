import { FC, ReactElement } from "react";

interface RadialProps {
  size?: keyof typeof sizeMap;
  color?: string;
}

const Radial: FC<RadialProps> = ({
  size = "md",
  color = "primary",
}): ReactElement => {
  return (
    <div
          className={`absolute w-[30rem] h-[30rem] top-5 left-5 rounded-full bg-[#111] opacity-100 blur-3xl`}
    />
  );
};

export default Radial;

const sizeMap = {
  sm: "5",
  md: "10",
  lg: "15",
  xl: "20",
  "2xl": "25",
};
