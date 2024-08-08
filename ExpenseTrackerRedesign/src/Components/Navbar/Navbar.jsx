import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const Navbar = () => {

    const [show, setShow] = useState(false)
    const ChangeShow = () => {
        setShow(!show)
    }

  return (
   <>
    <div className=" max-sm:px-[2rem] h-[10vh] w-screen px-[4rem] py-3 flex items-center  justify-between border-b border-gray-500 ">
      <div>
        <Link to="/" className=" text-2xl font-bold">
          Track.
        </Link>
      </div>
      <div className=" max-xs:hidden  max-sm:gap-6 flex gap-10 items-center ">
        <Link
          to="/income"
          className=" hover:text-gray-400 transition-all  text-sm"
        >
          Income
        </Link>
        <Link
          to="/expense"
          className=" hover:text-gray-400 transition-all  text-sm"
        >
          Expenses
        </Link>
        <Link
          to="/dashboard"
          className=" hover:text-gray-400 transition-all text-sm"
        >
          Dashboard
        </Link>
      </div>
      <div className=" hidden max-xs:block ">
        <GiHamburgerMenu onClick={ChangeShow} className=" text-2xl text-[#e4e3e3] " />
      </div>
    </div>
      { show ? <div className=" transition-all border-b border-gray-600 w-screen flex absolute z-[2] flex-col bg-[#000] " >
        <Link
          to="/income"
          className=" px-[2rem] py-3  w-full hover:bg-gray-700 text-sm"
        >
          Income
        </Link>
        <Link
          to="/expense"
          className="  px-[2rem] py-3 w-full hover:bg-gray-700 text-sm"
        >
          Expenses
        </Link>
        <Link
          to="/dashboard"
          className=" px-[2rem] py-3 w-full hover:bg-gray-700  text-sm"
        >
          Dashboard
        </Link>
        <Link
          to="/logout"
          className=" px-[2rem] py-3  w-full hover:bg-gray-700 text-sm"
        >
          Logout
        </Link>
      </div> : null}
   </>  
  );
};

export default Navbar;
