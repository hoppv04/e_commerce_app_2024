import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ h = 80, w = 80 }) => {
  return <Loader2 className={`h-[${h}px] w-[${w}px] animate-spin`} />;
};

export default LoadingSpinner;
