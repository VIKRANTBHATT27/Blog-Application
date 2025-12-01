import { Outlet } from 'react-router-dom';
import { useEffect, useState } from "react"
import { logIn, logOut } from "./store/authSlice.js";
import { useSelector, useDispatch } from "react-redux";
import authService from "./appwrite/authentication.js";
import { Header, Footer } from "./components/index.js";

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {     //check is logged in or not by asking from authService    
    authService.getCurrentUser()
      .then((userData) => {
          if (userData) {
            dispatch(logIn(userData));
          } 
          else {
            dispatch(logOut());
          }
        })
      .finally(() => setLoading(false))
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-wrap content-between bg-[#E3EEF8]">
        <div className="w-full block">
          <Header />
          {loading ? (/*display all post*/ null) : (/*display temp card with login msg*/null)}
          <main>
            Todo: <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App;