import { FC, ReactElement } from "react";

interface RadialProps {
  size?: keyof typeof sizeMap;
  color?: string;
  classes?: string;
}

const Radial: FC<RadialProps> = ({
  size = "md",
  color = "primary",
  classes,
}): ReactElement => {
  return (
    <div
      className={`absolute w-[35rem] h-[35rem] rounded-full bg-[#111] opacity-80 blur-3xl z-0 ${classes}`}
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
