import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/appwriteConfigurations";

import { Button, Container } from '../components';
import { useSelector } from 'react-redux';
import parse from "html-react-parser";

function Post() {
     const [post, setPost] = useState(null);
     const navigate = useNavigate();
     const { slug } = useParams();

     const userData = useSelector((state) => state.auth.userData);

     const isAuthor = (post && userData) ? (post.userId === userData.$id) : (false);

     useEffect(() => {
          if (slug) {
               appwriteService.getPost(slug)
                    .then((post) => post ? setPost(post) : navigate('/'));
          }
          else navigate("/");
     }, [slug]);

     const [imageUrl, setImageUrl] = useState(null);

     useEffect(() => {
          if (!post?.featuredImage) return;

          appwriteService.getImageFile(post?.featuredImage).then((url) => setImageUrl(url.toString()));
          console.log(imageUrl);
     }, [post?.featuredImage]);

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
                    {isAuthor && (
                         <div className="absolute mr-10 top-18 right-0">

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
                    <div className="flex justify-center mb-4 border rounded-xl p-2 max-w-md w-fit h-80 absolute right-1/12 top-1/4">
                         <img
                              src={imageUrl}
                              alt={post.title}
                              className="rounded-xl"
                         />

                    </div>

                    <div className="max-w-4xl absolute top-24 left-36 flex justify-center">
                         <h1 className="text-4xl font-bold flex justify-center w-4xl">
                              <u>{post.title}</u>
                         </h1>
                    </div>

                    <div className="browser-css max-w-4xl text-justify mt-16">
                         {parse(post.content)}
                    </div>
               </Container>

          </div>
     ) : null
}

export default Post