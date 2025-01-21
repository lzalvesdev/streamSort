import { PulseLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <PulseLoader color="#111827" size={20} />
    </div>
  );
}
