import { GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import { useAuth } from './AuthContext'
import { Button } from '@mui/material';


const SignOut = () => {
    const { signOut } = useAuth();

    return (
        <Button variant="contained" color="grey" onClick={signOut}> Sign Out</Button>
    );
};

export default SignOut;