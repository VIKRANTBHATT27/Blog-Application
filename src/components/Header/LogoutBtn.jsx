import React from 'react'
import { useDispatch } from "react-redux"
import AuthService from "../../appwrite/authentication.js"
import { logOut } from "../../store/authSlice.js"

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
      AuthService.logOut()
            .then(() => { dispatch(logOut()) })
            .catch(() => console.log('error occured at AuthService'));
  }
  return (
    <button
      className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
      onClick={logoutHandler}
    >
      logout
    </button>
  )
}

export default LogoutBtn