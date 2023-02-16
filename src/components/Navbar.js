import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className=" navbar container mx-auto h-20 flex items-center border-b border-sky-900 text-2xl font-medium text-sky-400">
      <Link to="/" className=" logo">
        Proxima
      </Link>
    </div>
  );
};

export default Navbar;
