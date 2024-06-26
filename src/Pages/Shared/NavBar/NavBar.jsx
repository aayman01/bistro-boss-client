import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import useAdmin from "../../../Hooks/useAdmin";

const NavBar = () => {
  const{user, logOut} = useAuth();
  const [isAdmin] = useAdmin();
  const [cart] = useCart();

  const handleLogOut = () => {
    logOut()
    .then()
    .catch()
  }
 
    const navOptions = (
      <>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/menu">Our Menu</NavLink>
        </li>
        <li>
          <NavLink to="/oder/salad">Oder Food</NavLink>
        </li>

        {user && isAdmin && (
          <li>
            <NavLink to="/dashborad/adminhome">Dashboard</NavLink>
          </li>
        )}
        {user && !isAdmin && (
          <li>
            <NavLink to="/dashborad/userhome">Dashboard</NavLink>
          </li>
        )}
        <li>
          <Link to="/dashborad/cart">
            <button className="btn mr-2">
              <FaShoppingCart />
              <div className="badge badge-secondary">+{cart.length}</div>
            </button>
          </Link>
        </li>

        {user ? (
          <>
            <li>
              <button onClick={handleLogOut} className="btn-ghost">
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            {" "}
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        )}
      </>
    );
    return (
      <>
        <div className="navbar fixed max-w-screen-xl z-10 bg-[#15151580] text-white">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navOptions}
              </ul>
            </div>
            <a className="btn btn-ghost text-xl">Bistro Boss</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navOptions}</ul>
          </div>
          <div className="navbar-end">
            <a className="btn">Button</a>
          </div>
        </div>
      </>
    );
};

export default NavBar;