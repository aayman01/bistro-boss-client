import { FaCalendar, FaClipboardList, FaHome, FaSearch, FaShoppingCart } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

const DashBoard = () => {
    return (
      <div className="flex">
        <div className="w-64 min-h-screen bg-orange-400">
          <ul className="menu">
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
                <FaShoppingCart></FaShoppingCart> My Cart
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
            <div className="divider"></div>
            <li>
              <NavLink to="/dashborad/userhome">
                <FaHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/oder/salad">
                <FaSearch /> Menu
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