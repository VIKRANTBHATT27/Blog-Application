import React from 'react'
import { Container, Logo } from '../index.js';
import LogoutBtn from "./LogoutBtn.jsx";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {

  // const authStatus = useSelector((state) => state.auth.status);
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      url: "/",
      active: true
    }, 
    {
      name: "Login",
      url: "/login",
      active: !authStatus
    }, 
    {
      name: "Signup",
      url: "/signup",
      active: !authStatus
    },
    {
      name: "All Posts",
      url: "/all-posts",
      active: authStatus
    },
    {
      name: "Add Post",
      url: "/add-post",
      active: authStatus
    }
  ];

  return (
    <>
      <header className='py-3 shadow bg-slate-400' >
        <Container>
          <nav className='flex'>
            <div className='mr-4'>
              <Link to="/">
                <Logo width='70px' />
              </Link>
            </div>

            <ul className='flex ml-auto'>
              { 
                navItems.map((item) => 
                  item.active ? (
                    <li key={item.name}>    {/*ye html component repeat ho rha h esliye es pr keys*/}
                      <button
                        className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                        onClick={ () => navigate(item.url) }
                      >{item.name}</button>
                    </li>
                  ) : null
                )
              }
            </ul>
            { authStatus && <LogoutBtn /> }
          </nav>
        </Container>
      </header>

      {/* <div className='text-2xl h-fit mb-2 mt-2 bg-transparent flex items-center justify-around'>
        <p>Header</p>
        <div className="right flex relative ml-96">
          <div className="links flex justify-center items-center gap-10 ">
            <p>Header</p>
            <p>Header</p>
            <p>Header</p>
          </div>
          <button className='ml-16 cursor-pointer bg-transparent py-1 px-6 border-2 rounded-sm text-base border-blue-500 text-blue-500 font-medium'>heloo</button>
        </div>
      </div>
      <div className='min-w-full h-px bg-slate-400'></div> */}
    </>
  )
}

export default Header