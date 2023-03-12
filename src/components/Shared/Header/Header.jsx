import { Navbar } from "flowbite-react";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import Toggle from "../../Theme/Toggle";

const Header = () => {
  const { user, userLogOut } = useContext(AuthContext)
  const handleLogOut = () => {
    userLogOut()
      .then(() => {
        toast.success(
          'User LogOut Successfully',
          '',
          'success'
        )
      })
  }
  let activeStyle = {
    borderBottom: "2px solid orange"
  }

  return (
    <>
      <Navbar
        className="bg-orange-500 shadow dark:bg-gray-800"
        fluid={true}
        rounded={true}
      >
        <Navbar.Brand href="https://flowbite.com/">

          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Task
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>

          <NavLink to='/'
            style={({ isActive }) => isActive ? activeStyle : undefined}
            className='text-white transition-colors duration-300 transform dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6'
          >
            Home
          </NavLink>

          <NavLink to='add-a-task'
            style={({ isActive }) => isActive ? activeStyle : undefined}
            className='border-b-2 text-white border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6'
          >
            Add A Task
          </NavLink>





          <Toggle></Toggle>
          {
            user ? <NavLink to="/login"><button className='btn bg-green-500 p-2 rounded-md text-white btn-dark ml-5' onClick={handleLogOut}>Logout</button></NavLink> : <NavLink to="/login"><button className='btn btn-primary ml-5 bg-green-500 p-2 rounded-md'>Login</button></NavLink>
          }
        </Navbar.Collapse>
      </Navbar>




    </>
  );
};

export default Header;
