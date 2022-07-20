import { FC, ReactElement } from "react";

interface LineProps {
  thickness?: keyof typeof sizeMap;
  color?: string;
  classes?: string;
  rotate?: keyof typeof rotateMap;
}

const Line: FC<LineProps> = ({
  thickness = "md",
  color = "primary",
  classes,
  rotate = "none",
}): ReactElement => {
  return (
    <svg
      className={`absolute w-screen h-[0.25rem] bg-[#000] z-0 ${classes} ${
        rotate === "antiClockWise"
          ? "-rotate-90"
          : `rotate-${rotateMap[rotate]}`
      }`}
    />
  );
};

export default Line;

const sizeMap = {
  sm: "5",
  md: "10",
  lg: "15",
  xl: "20",
  "2xl": "25",
};

const rotateMap = {
  none: 0,
  clockWise: 45,
  antiClockWise: 45,
  verticle: 90,
};
