import React, {useState, useEffect} from "react"
import axios from "axios"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAppContext } from "../contextLib";
import { useFormFields } from "../hooksLib";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [signIn, setsignIn] =  useState(null)
  const { userHasAuthenticated } = useAppContext();
  const [fields, handleFieldChange] = useFormFields({
    username: "",
    password: "",
    newpass:""
  });

  useEffect( () => {
    if (signIn === null){
      axios.get(`https://backendexample.sanbersy.com/api/users`)
      .then(res => {
        setsignIn(res.data.map(el=>{ return {id: el.id, username: el.username, password: el.password}} ))
      })
    }
  }, [signIn])

  async function handleSubmit(e) {
    e.preventDefault()
    
    let res = await axios.post(`https://backendexample.sanbersy.com/api/login`, {username: fields.username, password: fields.password})
    let data = res.data;
    if (data.username != null && data.password != null) {
      switch (data){
        case "invalid username or password":
        {
          alert("Invalid Username or Password");
          break
        }
      default:
        userHasAuthenticated(true);
        axios.put(`https://backendexample.sanbersy.com/api/users/${data.id}`, {username: fields.username, password: fields.newpass})
        .then(() => {
          let dataUser = signIn.find(el=> el.id === data.id)
          dataUser.password = fields.newpass
          setsignIn([...signIn])
      })
        alert("Password Telah Diganti")
      }
    } else {
      alert("Invalid Username or Password");
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
          Change Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField variant="outlined" margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus value={fields.username} onChange={handleFieldChange}/>
          <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={fields.password} onChange={handleFieldChange}/>
          <hr/>
          <TextField variant="outlined" margin="normal" required fullWidth name="newpass" label="New Password" type="password" id="newpass" value={fields.newpass} onChange={handleFieldChange}/>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Change Password
          </Button>
        </form>
      </div>
    </Container>
  );
}