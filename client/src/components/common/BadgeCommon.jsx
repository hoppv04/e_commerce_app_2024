import { Badge } from "../ui/badge";

const BadgeCommon = ({ status }) => {
  const setBadgeColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "rejected":
        return "bg-red-600";
      default:
        return "bg-black";
    }
  };
  return (
    <Badge className={`py-1 px-3 ${setBadgeColor(status)}`}>{status}</Badge>
  );
};

export default BadgeCommon;
