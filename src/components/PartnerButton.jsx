import { FaUtensils } from "react-icons/fa";
import { Link } from "react-router";

export default function PartnerButton() {
  return (
    <Link
      to="/partner/register"
      className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
    >
      <FaUtensils className="text-lg" />
      Be a Food Partner
    </Link>
  );
}
