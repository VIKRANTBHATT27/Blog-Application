import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

/* most of the things in appwrite are promises */

export class AuthService {              //creating a class structure
     client = new Client();
     //as we have to make properties of client we define make a constructor make properties in it
     
     account;

     constructor() {
          this.client
               .setProject(config.appwriteProjectId)
               .setEndpoint(config.appwriteUrlApiEndpoint);

          this.account = new Account(this.client);
     }

     async createAccount({ email, password, name }) {
          console.log(email);
          console.log(password);
          console.log(name);
          
          // create a async function so that the value come here and the account is created
          // it gives us versatility to change the backend services as we like
          // any time, and no extra changes need to be make just change the setProject and endpoints
          // next change the userAccount function to create user 
          try {
               const userAccount = await this.account.create({
                    userId: ID.unique(),
                    email,
                    password,
                    name
               });
               
               console.log();
               console.log(`userAccount: ${userAccount}`);

               if (userAccount) {       //if userAccount exists
                    //call another method to make him/her directly login into the application
                    return this.logIn({ email, password });
               } else {
                    return userAccount;
               }

          } catch (error) {
               console.log("throwing error");
               console.log(error);
               throw error;
          }
     }
     
     async logIn({ email, password }) {            //createSession
          try {
               const logInResult = await this.account.createEmailPasswordSession({ email, password });

               console.log();
               console.log(`logInResult: ${logInResult}`);

               return logInResult;
          } catch (error) {
               console.log("Appwrite-authentication-service :: logIn :: error ", error);
          }
     }

     async logOut() {         //deleteSession
          try {
               const result = await this.account.deleteSessions();
               console.log();
               console.log(result);
          } catch (error) {
               console.log("working");
               console.log("Appwrite-authentication-service :: logOut :: error ", error);
          }
     }

     async getCurrentUser() {           //checks about session
          // a session is an active, authenticated state for a user, created when they log in and used to access the application and its resources.
          try {
               const result = await this.account.get();

               console.log();
               console.log(result);

               return result;
          } 
          catch (error) {
               console.log();
               // console.log("Appwrite-authentication-service :: getCurrentUser :: error ", error);
               return false;
          }

          return null;
     }
     
     //password recovery
     
     //email session
     
     //jwt
     
     //getaccount => account.get => returns a promise tells is their any account or not

     //updateSession
}

const authService = new AuthService();       
//createing a object authService (layout on the based blueprint[class struture])

export default authService;
