import React, { useEffect, useState } from 'react';
// import { Services as appwriteService } from '../appwrite/appwriteConfigurations';
import appwriteService from "../appwrite/appwriteConfigurations";
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';

function Home() {
     const [ allPosts, setAllPosts ] = useState([]);
     const authStatus = useSelector(state => state.auth.status);

     useEffect(() => {
          if (authStatus) {
               appwriteService.getAllPost().then((allPosts) => allPosts ? setAllPosts(allPosts.documents) : []);
          }
     }, []);
          
     if (allPosts === null || allPosts.length === 0) {
          return (
               <div className="w-full py-8 mt-4 text-center">
                    <Container>
                         <div className="flex flex-wrap">
                              <div className="p-2 w-full">
                                   <h1 className="text-2xl font-bold hover:text-gray-500">Login to read Posts</h1>
                              </div>
                         </div>
                    </Container>
               </div>
          )
     }

     return (
          <div className="w-full py-8">
               <Container>
                    <div className="flex flex-wrap">

                         {allPosts.map((post) => (
                                   <div key={post.$id} className="p-2 w-1/4">
                                        <PostCard {...post} />
                                   </div>
                         ))}

                    </div>
               </Container>
          </div>
     )

     return (
    <div>Home</div>
  )
}

export default Home