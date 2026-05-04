import config from "../config/config.js";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Services {
     client = new Client();
     DB;
     bucket;

     constructor() {
          this.client
               .setEndpoint(config.appwriteUrlApiEndpoint)
               .setProject(config.appwriteProjectId);

          this.DB = new Databases(this.client);        //already call constructor
          this.bucket = new Storage(this.client);      //& passed this.client to it
     }


     async createPost({ title, slug, content, featuredImage, status, userId }) {
          try {
               const record = await this.DB.createDocument({
                    databaseId: config.appwriteDatabaseId,
                    collectionId: config.appwriteTableId,
                    documentId: slug,                  //slug is made documentId for any post
                    data: {
                         title,
                         content,
                         featuredImage,
                         status,
                         userId
                    }
               });

               console.log();
               console.log(record);

               return record;
          } catch (error) {
               console.log("Appwrite-configuration :: createPost :: error ", error);
          }
     }

     async updatePost(slug, { title, content, featuredImage, status, userId }) {
          try {
               const updated = await this.DB.updateDocument({
                    databaseId: config.appwriteDatabaseId,
                    collectionId: config.appwriteTableId,
                    documentId: slug,
                    data: {
                         title,
                         content,
                         featuredImage,
                         status,
                         userId
                    }
               });

               console.log();
               console.log(updated);

               return updated;
          } catch (error) {
               console.log("Appwrite-configuration :: updatePost :: error ", error);
          }
     }
     // change documentId 3 steps 
     // (get the detail of old row; create new row with new documentId; delete the old one)

     async deletePost(slug) {
          try {
               const response = await this.DB.deleteDocument({
                    databaseId: config.appwriteDatabaseId,
                    collectionId: config.appwriteTableId,
                    documentId: slug
               });

               console.log();
               console.log(response);

               return true;
          } catch (error) {
               console.log("Appwrite-configuration :: deletePost :: error ", error);
               return false;
          }
     }

     async getPost(slug) {
          try {
               const post = await this.DB.getDocument({
                    databaseId: config.appwriteDatabaseId,
                    collectionId: config.appwriteTableId,
                    documentId: slug
               });

               console.log();
               console.log(post);

               return post;
          } catch (error) {
               console.log("Appwrite-configuration :: getPost :: error ", error);
               return false;
          }
     }

     async getAllPost() {
          try {
               const allPosts = await this.DB.listDocuments({
                    databaseId: config.appwriteDatabaseId,
                    collectionId: config.appwriteTableId,
                    queries: [
                         Query.equal("status", true)
                    ]
               });

               console.log();
               console.log(allPosts);

               return allPosts;
          } catch (error) {
               console.log("Appwrite-configuration :: getAllPost :: error ", error);
               return false;
          }
     }

     async uploadFile(file) {
          try {
               const storage = await this.bucket.createFile({
                    bucketId: config.appwriteBucketId,
                    fileId: ID.unique(),
                    file,          //file: file
               });

               console.log();
               console.log(storage);

               return storage;          //return fileId instead
          } catch (error) {
               console.log("Appwrite-configuration :: uploadFile :: error ", error);
               return false;
          }
     }

     async deleteFile(fileId) {
          try {
               const result = await this.bucket.deleteFile({
                    bucketId: config.appwriteBucketId,
                    fileId,
               });

               console.log();
               console.log(result);

               return true;
          } catch (error) {
               console.log("Appwrite-configuration :: deleteFile :: error ", error);
               return false;
          }
     }

     async getImageFile(imageFileId) {
          if (!imageFileId) throw new Error("imageFileId is required");

          const result = this.bucket.getFileView({
               bucketId: config.appwriteBucketId,
               fileId: imageFileId
          });
          //output filed, bgImage, token => from docs

          // console.log();
          console.log(result);

          return result;
     }
};



const service = new Services();

export default service;