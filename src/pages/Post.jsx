import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/appwriteConfigurations";

import { Button, Container } from '../components';
import { useSelector } from 'react-redux';
import parse from "html-react-parser";

function Post() {
     const [ post, setPost ] = useState(null);
     const navigate = useNavigate();
     const { slug } = useParams();

     const userData = useSelector((state) => state.auth.userData);

     const isAuthor = (post && userData) ? (post.userId === userData.$id) : (false);

     useEffect(() => {
          if (slug) {
               appwriteService.getPost(slug)
                    .then( (post) => post ? setPost(post) : navigate('/') );
          }
          else navigate("/");
     }, [slug]);

     const deletePost = () => {
          appwriteService.deletePost(post.$id)         //using post object stored in const [ post, setPost ]
               .then((resultOfPromise) => {                //promise deleted successfully or unsuccessfully ==> result of promise(true / false)
                    if (resultOfPromise) {        // continue or delete the featuredImage only if result of promise is true
                         appwriteService.deleteFile(post.featuredImage);
                         navigate("/");
                    }
               });
     };

  return post ? (
     <div className="py-8">
          
          <Container>
               <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                         src={`${appwriteService.getImageFile(post.featuredImage)}&mode=admin`}
                         alt={post.title}
                         className="rounded-xl"
                    />
                    
                    {isAuthor && (
                         <div className="absolute right-6 top-6">

                              <Link to={`/edit-post/${post.$id}`}>
                                   <Button bgColor="bg-green-500" className="mr-3">
                                        Edit
                                   </Button>
                              </Link>

                              <Button onClick={deletePost} bgColor='bg-red-500'>
                                   Delete
                              </Button>

                         </div>
                    )}
               </div>

               <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
               </div>

               <div className="browser-css">
                    {parse(post.content)}
               </div>
          </Container>

     </div>
  ) : null
}

export default Post