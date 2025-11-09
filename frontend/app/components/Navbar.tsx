import { CiSettings, CiSearch } from "react-icons/ci";
import NavBarAccountSection from "./NavBarAccountSection";
import NavBarApplicationTitle from "./NavBarApplicationTitle";

const Navbar = () => {
  return (
    <div className="flex justify-around p-2 items-center bg-bg shadow-md z-50">
      <NavBarApplicationTitle />
      <div className="flex gap-5 items-center">
        <button>Free Movies & TV</button>
        <button>Live TV</button>
        <button>Features</button>
        <button>Download</button>
      </div>
      <div className="flex">
        <input
          className="input rounded-r-none border-none focus:outline-none"
          placeholder="Search..."
        />
        <button className="btn rounded-l-none bg-brand-500 text-xl">
          <CiSearch />
        </button>
      </div>
      <button className="btn text-xl">
        <CiSettings />
      </button>
      <NavBarAccountSection />
    </div>
  );
};

export default Navbar;
