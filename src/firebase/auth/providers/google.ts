import { GoogleAuthProvider } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

googleProvider.addScope("profile");
googleProvider.addScope("email");

export default googleProvider;
