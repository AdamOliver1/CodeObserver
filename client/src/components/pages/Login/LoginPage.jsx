import { useState, useEffect } from "react";
import jsCookie from 'js-cookie';
import { Grid, Paper, TextField, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Alert, AlertTitle } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";
import useStyles from './LoginStyles';
import axios from '../../../api/axios';

const LoginPage = () => {

    const { state } = useLocation(); //if it's a student logging in,  
    const navigate = useNavigate();
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');

    const navigateUser = (isMentor) =>
        // if it's not a mentor, send him back to the shared code room with the same parameters
        // if it's a mentor, send him to choose code-block 
        isMentor ? navigate('/code-blocks') : navigate(`/shared-code-room/${state?.tokenId}/${state?.student_login}`)

    useEffect(() => {
        setErrMessage('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let mesage = "";
        try {
            let res;
            //if user is student
            if (state?.student_login) {
                try {
                    // verify the user is the chosen student
                    res = await axios.post('/api/auth/student-login',
                        { username, password, tokenId: state?.tokenId });
                    jsCookie.set('loggedin', "IMLOGGEDIN");
                }
                catch (err) {
                    mesage = 'WRONG USER!';
                    throw err;
                }
            }
            else {
                // auth mentor
                res = await axios.post('/api/auth', { username, password });
            }
            if (res) {
                const { user } = res.data;
                // save name for topbar
                jsCookie.set("name", `${user.firstName} ${user.lastName}`)
                // save token for validation
                jsCookie.set(`token`, res.data.token);
                navigateUser(user.isMentor)
            }
        } catch (err) {
            //friendly error for user
            setErrMessage(mesage + `${!err?.response ? 'No Server Response' :
                err.response?.status === 400 ? 'Invalid Username or Password' :
                    err.response?.status === 401 ? 'Unauthorized' :
                        'Login Failed'
                }`)
        }
    }

    return (
        <>
            <Grid>
                <Paper elevation={10} className={classes.paper}>
                    {errMessage && <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {errMessage}
                    </Alert>}
                    <form onSubmit={handleSubmit}>

                        <Grid align='center'>
                            <Avatar className={classes.avatar}>{`🔒`}</Avatar>
                            <h2>Sign In</h2>
                        </Grid>
                        <TextField
                            label='Username'
                            placeholder='Enter username'
                            fullWidth
                            type='text'
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required />
                        <TextField
                            label='Password'
                            placeholder='Enter password'
                            type='password'
                            fullWidth
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required />
                        <Button
                            type='submit'
                            color='primary'
                            variant="contained"
                            className={classes.btn}
                            fullWidth>Sign in</Button>
                    </form>
                </Paper>
            </Grid>
        </>
    )
}

export default LoginPage