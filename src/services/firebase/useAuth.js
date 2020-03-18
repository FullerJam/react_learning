import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function useAuth(fbAuth) {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [user, setUser] = useState({});
   const [loading, setLoading] = useState(true);

   const googleProvider = new fbAuth.GoogleAuthProvider();
   const facebookProvider = new fbAuth.FacebookAuthProvider();

   fbAuth.onAuthStateChanged(user => {
      if (user) {
         setLoading(false)
         if(user){
         //console.log(user)
         setIsAuthenticated(true)
         setUser(user)
         console.log(isAuthenticated)
         return
         }
      }
      setIsAuthenticated(false)
   });

   const signUpWithEmail = (email, password) =>
      fbAuth().createUserWithEmailAndPassword(email, password);

   const signInEmailUser = (email, password) =>
      fbAuth().signInWithEmailAndPassword(email, password);

   const signInWithProvider = provider => {
      debugger;
      switch (provider) {
         case "google":
            fbAuth().signInWithRedirect(googleProvider);
            break;

         case "facebook":
            fbAuth().signInWithRedirect(facebookProvider);
            break;
         default:
            throw new Error("unsupported provider");
      }
   };

   const signOut = () => fbAuth().signOut();

   return {
      isAuthenticated,
      user,
      loading,
      signUpWithEmail,
      signInEmailUser,
      signOut,
      signInWithProvider
   };
}
export default useAuth;