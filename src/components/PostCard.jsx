import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/appwriteConfigurations.js";
import { Link, useParams } from "react-router-dom";

function PostCard({ $id, featuredImage, title }) {

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    appwriteService.getImageFile(featuredImage).then((url) => setImageUrl(url));
    console.log(imageUrl);
  }, [])

  console.log("PostCard render:", { title, featuredImage, imageUrl });
  console.log(`${imageUrl}&mode=admin`);

  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>

        <div className='w-full justify-between mb-4'>
          <img
            src={`${imageUrl}`}
            alt={title}
            className="rounded-xl"
          />
        </div>

        <h2 className='text-2xl text-black font-bold'>{title}</h2>
        
      </div>
    </Link>
  )
}

export default PostCard;