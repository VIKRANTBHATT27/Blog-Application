import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/authentication.js";
import { logIn as storeLogIn } from '../store/authSlice';
import { Logo, Button, Input } from "./index.js";
import { useForm } from "react-hook-form";


function Login() {
     const navigate = useNavigate();
     const dispatch = useDispatch();
     
     const [ error, setError ] = useState();
     const { register, handleSubmit } = useForm();

     const LogIn = async(data) => {
          console.log("LogIn function working");
          console.log();
          console.log(data);

          setError("");
          try {
               const session = await authService.logIn(data);         //creating a login session for the user

               if (session) {
                    const userData = await authService.getCurrentUser();        
                    //but first we need to get the CurrentUser data

                    if (userData) dispatch( storeLogIn(userData) );        
                    //dispatching things to the store's login function
                    //here renamed as storeLogin while importing

                    navigate("/");
               }
          } catch (error) {
               setError(error.message);
          }
     } 

  return (
     <div className="flex items-center justify-center w-full">
          <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
               <div className="mb-2 flex justify-center">

                    <span className="inline-block w-full max-w-[100px]">
                         <Logo width='100%' />
                    </span>
                    
               </div>
               
               <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign in to your Account
               </h2>

               <p className="mt-2 text-center text-base text-black/60">
                    {`Don't have any account? `}
                    <Link 
                         to="/signup"
                         className="font-medium text-primary transition-all duration-200 hover:underline"
                    >Sign Up</Link>
               </p>

               {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

               <form onSubmit={ handleSubmit(LogIn) } className='mt-8'>
                    <div className='space-y-7'>
                         <Input 
                              label="Email: "
                              placeholder="Enter your email"
                              type="email"
                              autoComplete="email"

                              {...register("email", { 
                                   required: true, 
                                   validate: {
                                        matchPattern: (value) => 
                                             /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/
                                             .test(value) || "Email address must be a valid address"
                                        }
                                   } 
                              )}
                         />
                         <Input 
                              label="Password: "
                              placeholder="Enter your password"
                              type="password"
                              autoComplete="current-password"

                              {...register("password", {
                                   required: true,
                                   validate: {
                                        matchPattern: (value) => 
                                             /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
                                             .test(value) || "Password contains invalid characters"
                                   }
                              })}
                         />
                         <Button
                              type='submit'
                              className='w-full'
                         >Sign In</Button>

                    </div>
               </form>
          </div>
     </div>
  )
}

export default Login