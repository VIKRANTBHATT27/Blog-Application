import React from 'react'
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/appwriteConfigurations";

function AllPosts() {
     const [ allPosts, setAllPosts ] = React.useState([]);
     
      React.useEffect(() => {
         getPosts();
      }, []);
      
      const getPosts = async () => {
               await appwriteService.getAllPost()
                  .then((posts) => posts ? setAllPosts(posts.documents) : null)
      }
      

     
  return (
     <div className='w-full py-8'>
         <Container>
            <div className='flex flex-wrap'>

               {allPosts.length > 0 &&  allPosts.map((post) => (
                  <div key={post.$id} className='p-2 w-1/4'>     
                     <PostCard {...post} />
                  </div>
               ))}

            </div>
         </Container>
     </div>
  )
}

export default AllPosts