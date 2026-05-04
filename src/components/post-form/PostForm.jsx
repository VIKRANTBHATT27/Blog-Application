import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input, SelectComponent, RTE } from "../index.js";
import appwriteService from "../../appwrite/appwriteConfigurations.js";

function PostForm({ post }) {
     const navigate = useNavigate();
     const userData = useSelector((state) => state.auth.userData);      //userData stored in store

     console.log(`consoling userData here`);
     console.log(userData);

     const { register, handleSubmit, watch, control, getValues, setValue } = useForm({
          defaultValues: {
               title: post?.title || "",
               slug: post?.slug || "",
               content: post?.content || "", 
               status: post?.status || "active"
          }
     });

     //steps
     // 1. create a file if error don't delete the one STORED IN DB
     // 2. delete the existing one
     // 3. store the new file in DB

     const submit = async (data) => {
          console.log(data);
          if (post) {
               const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

               if (file) {
                    await appwriteService.deleteFile(post.featuredImage);
               }

               const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                    status: data.status === "active" ? true : false
               })

               if (dbPost) navigate(`/post/${dbPost.$id}`);
          } else {
               // create a new post
               const file = (data?.image[0]) ? await appwriteService.uploadFile(data.image[0]) : null;
               
               if (file) {
                    const fileId = file.$id;

                    console.log(data);
                    console.log(file);
                    console.log(userData);

                    const dbPost = await appwriteService.createPost({
                         ...data,
                         featuredImage: file ? file.$id : undefined,
                         userId: userData.$id,
                         status: data.status === "active" ? true : false
                    });

                    if (dbPost) navigate(`/post/${dbPost.$id}`);
               }
          }


     }

     const [ temp, setTemp ] = useState(post?.title || null);

     const handleChange = (value) => {
          console.log(value);
          setTemp(value);
     }


     const slugTransform = useCallback((value) => {
          if (value  && typeof value === "string") {
               return value.trim().toLowerCase().replace(/[^a-zA-Z\d]+/g, "-");
          }
          return "";
     }, []);

     
     useEffect(() => {
          const subcription = watch(({ valueObject, name }) => {
               if (name === "title") {
                    setValue("slug", slugTransform(valueObject.title, { shouldValidate: true }));
               }
          });

          return () => {
               subcription.unsubscribe();
          }

     }, [ watch, slugTransform ]);

     const [ imageUrl, setImageUrl ] = useState(null);

     useEffect(() => {
          appwriteService.getImageFile(post.featuredImage).then((url) => setImageUrl(url.toString()));
          console.log(imageUrl);
     }, [post?.featuredImage]);

  return (
     <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
          <div className="w-2/3 px-2">
               <Input
                    label="Title: "
                    placeholder="Title"
                    className="mb-4"
                    { ...register("title", { required: true }) }
                    onInput = {(e) => handleChange(e.target.value)}
               />
               <Input
                    label="Slug: "
                    placeholder="Slug"
                    className="mb-4"
                    value={slugTransform(temp)}
                    { ...register("slug", { required: true }) }
                    onInput={(e) => {
                         setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
               />
               <RTE
                    label="Content: "
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
               />
          </div>
          <div className="w-1/3 px-2">
               <Input
                    label="Featured Image: "
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    { ...register("image", { required: !post }) }
               />
               
               {post && (
                    <div className="w-full mb-4">
                         <img
                              src={imageUrl}
                              alt={post.title}
                              className="rounded-lg"
                         />
                    </div>
               )}

               <SelectComponent 
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    defaultValue={post && (post?.status === true) ? "active" : "inactive"}
                    { ...register("status", { required: true }) }
               />

               <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className='w-full'>
                    {post ? "Update" : "Submit"}
               </Button>      
          </div>
     </form>
  )
}

export default PostForm