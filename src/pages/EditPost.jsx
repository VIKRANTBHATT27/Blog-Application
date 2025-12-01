import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/appwriteConfigurations";
import { Container, PostForm } from '../components';

function EditPost() {
     const [ post, setPost ] = useState(null);
     const navigate = useNavigate();
     const { slug } = useParams();

     console.log(slug);

     useEffect( () => {
          
          if (slug) {
               appwriteService.getPost(slug).then((post) => post ? setPost(post) : null);
          }
          else navigate("/");

          // }, [slug, navigate]);  ===> no need for navigate here 
          // it's already stabalized due to useNavigate function

     }, [slug]);

     console.log(post);

  return post ? (
     <div className="py-8">
          <Container>
               <PostForm post={post} />
          </Container>
     </div>
  ) : null
}

export default EditPost;