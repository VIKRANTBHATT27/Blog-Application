import './index.css';
import App from './App.jsx';
import { StrictMode } from 'react'
import { Provider } from 'react-redux';
import store from './store/store.js';
import { createRoot } from 'react-dom/client'

import Post from "./pages/Post.jsx";
import Home from "./pages/Home.jsx";
import AddPost from "./pages/AddPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import LogInPage from "./pages/LogInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import { AuthLayout } from './components/index.js';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route path='/' element={<Home />} />
      <Route path='/login' element={(

        <AuthLayout authentication={false}>
          <LogInPage />
        </AuthLayout>

      )} />
      <Route path='/signup' element={(

        <AuthLayout authentication={false}>
          <SignUpPage />
        </AuthLayout>

      )} />
      <Route path='/all-posts' element={(

        <AuthLayout authentication={true}>
          {" "}
          <AllPosts />
        </AuthLayout>

      )} />
      <Route path='/add-post' element={(

        <AuthLayout authentication={true}>
          {" "}
          <AddPost />
        </AuthLayout>

      )} />
      <Route path='/edit-post/:slug' element={(

        <AuthLayout authentication={true}>
          {" "}
          <EditPost />
        </AuthLayout>

      )} />
      <Route path='/post/:slug' element={<Post />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
