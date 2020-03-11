import {useState} from "react";
function useAuth(fbAuth) {
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   const signUpWithEmail = (email, password) => fbAuth.createUserWithEmailAndPassword(email, password);

   return {isAuthenticated, signUpWithEmail};
}
export default useAuth