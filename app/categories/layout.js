import Navbar from "../components/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";

export default function Layout({ children }) {


  return (
    <AuthProvider>
      <Navbar />
      {children}
    </AuthProvider>
  );
}