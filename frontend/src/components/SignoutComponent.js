import { GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import { useAuth } from './AuthContext'

const SignOut = () => {
    const { signOut } = useAuth();

    return (
        <button onClick={signOut}>Sign Out</button>
    );
};

export default SignOut;