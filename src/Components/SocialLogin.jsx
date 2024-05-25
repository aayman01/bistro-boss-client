import { FcGoogle } from "react-icons/fc";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        googleSignIn()
        .then(result => {
            console.log(result.user)
            const userInfo = {
                email : result.user?.email,
                name : result.user?.displayName
            }
            axiosPublic.post('/users',userInfo)
            .then(res => {
                console.log(res.data)
                navigate('/')
            })
            .catch(err => console.log(err))
        })
        .catch(err => {
            console.log(err.message)
        })
    }
    return (
      <div>
        <div>
          <button onClick={handleGoogleLogin} className="text-2xl">
            <FcGoogle />
          </button>
        </div>
      </div>
    );
};

export default SocialLogin;