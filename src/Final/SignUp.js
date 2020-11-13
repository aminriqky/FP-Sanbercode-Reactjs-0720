import React, {useState} from "react"
import axios from "axios"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAppContext } from "./contextLib";
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Amin Riqky
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [, setDaftarLogin] =  useState(null)
  const [input, setInput]  =  useState({username: "", password: ""})
  const [, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")
  const { userHasAuthenticated } = useAppContext();
  const history = useHistory();

  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "username":
      {
        setInput({...input, username: event.target.value});
        break
      }
      case "password":
      {
        setInput({...input, password: event.target.value});
        break
      }
    default:
      {break;}
    }
  }

  const handleSubmit = (event) =>{
    event.preventDefault()

    let username = input.username
    let password = input.password
    
    if (username.replace(/\s/g,'') !== "" && password.replace(/\s/g,'') !== ""){
      if (statusForm === "create"){        
        axios.post(`https://backendexample.sanbersy.com/api/users`, {username: input.username, password: input.password})
        .then(res => {
            setDaftarLogin([
              { id: res.data.id, 
                username: input.name, 
                password: input.password
              }])
            userHasAuthenticated(true);
            history.push("/ListMov");
            alert("Account Created Successfully")
        })
      }
      setStatusForm("create")
      setSelectedId(0)
      setInput({username: "", password: ""})
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth id="username" label="New Username" name="username" autoComplete="username" value={input.username} onChange={handleChange}/>
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth name="password" label="New Password" type="password" id="password" autoComplete="current-password" value={input.password} onChange={handleChange}/>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}