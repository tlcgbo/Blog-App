import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then(() => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-6">
      <div className="bg-[#1e293b] p-10 rounded-xl shadow-xl w-full max-w-md text-center border border-[#334155]">
        <h2 className="text-3xl font-bold text-indigo-300 mb-6">Welcome Back</h2>
        <p className="text-gray-400 mb-8">Sign in to continue using the blog</p>

        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-lg text-white bg-indigo-600 transition-all duration-200 shadow-lg"
        >
          <FcGoogle className="text-xl bg-white rounded-full" />
          <span className="font-medium">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
