import { CiSettings, CiSearch } from "react-icons/ci";

const Navbar = () => {
  return (
    <div className="flex justify-around p-2 items-center bg-bg shadow-md z-50">
      <div className="flex items-center font-bold text-4xl font-[cursive]">
        <span>Popcorn</span>
        <span className="text-brand-500">B</span>
        <span>ox</span>
      </div>
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
      <div>
        <button className="btn flex">
          <div className="avatar avatar-placeholder">
            <div className="bg-blue-500 p-2 text-neutral-content rounded-full">
              <span className="">D</span>
            </div>
          </div>
          <div>Placeholder Name</div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
