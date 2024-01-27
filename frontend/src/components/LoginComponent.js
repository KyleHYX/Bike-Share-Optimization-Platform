import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import {useAuth} from './AuthContext'


const LoginComponent = () => {
  const { signIn } = useAuth();
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      signIn(tokenResponse);
    },
    onError: () => {
      console.log('Login Failed');
    }
  });

  return (
      <button onClick={() => googleLogin()}>
        Sign in with Google
      </button>
  );
};

export default LoginComponent;