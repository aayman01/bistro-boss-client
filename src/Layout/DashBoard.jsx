import { FaBook, FaCalendar, FaClipboardList, FaHome, FaList, FaSearch, FaShoppingCart, FaUtensils, FaVoicemail } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";
import { FaUserGroup } from "react-icons/fa6";
import useAdmin from "../Hooks/useAdmin";

const DashBoard = () => {
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  // const isAdmin = true;
    return (
      <div className="flex ">
        <div className="w-64 min-h-screen bg-orange-400 pt-12">
          <ul className="menu">
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashborad/adminhome">
                    <FaHome /> Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashborad/additem">
                    <FaUtensils />
                    Add Items
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashborad/manageitems">
                    <FaList /> Manage Items
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashborad/bookings">
                    <FaBook />
                    Manage Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashborad/users">
                    <FaUserGroup />
                    All Users
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashborad/userhome">
                    <FaHome /> User Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashborad/reserve">
                    <FaCalendar />
                    Reservation
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashborad/cart">
                    <FaShoppingCart></FaShoppingCart> My Cart({cart.length})
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashborad/review">
                    <MdOutlineRateReview />
                    Add Review
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashborad/mybookings">
                    <FaClipboardList />
                    My Bookings
                  </NavLink>
                </li>
              </>
            )}
            {/* shared items */}
            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/oder/salad">
                <FaSearch /> Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/oder/contact">
                <FaVoicemail /> Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    );
};

export default DashBoard;