import React, {useState, useEffect} from "react"
import PropTypes from 'prop-types';
import axios from "axios"
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';

const styles = (theme) => ({
  paper: {
    minWidth: 650,
    margin: 'auto',
    overflow: 'hidden',
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  table: {
    minWidth: 650,
  },
});

function Content(props) {
  const { classes } = props;

  const [daftarGames, setDaftarGames] =  useState(null)
  const [input, setInput]  =  useState({name: "", platform: "", release: 0, singlePlayer: 0, genre: "", multiplayer: 1, review: "", image_url:""})
  const [selectedId, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")

  useEffect( () => {
    if (daftarGames === null){
      axios.get(`https://backendexample.sanbersy.com/api/games`)
      .then(res => {
        setDaftarGames(res.data.map(el=>{ return {id: el.id, name: el.name, platform: el.platform, release: el.release, singlePlayer: el.singlePlayer, genre: el.genre, multiplayer: el.multiplayer, review: el.review, image_url: el.image_url}} ))
      })
    }
  }, [daftarGames])

  const handleDelete = (event) => {
    let idDataGames = parseInt(event.target.value)

    let newdaftargames = daftarGames.filter(el => el.id !== idDataGames)

    axios.delete(`https://backendexample.sanbersy.com/api/games/${idDataGames}`)
    .then(res => {
      console.log(res)
    })
          
    setDaftarGames([...newdaftargames])
    
  }
  
  const handleEdit = (event) =>{
    let idDataGames = parseInt(event.target.value)
    let dataGames = daftarGames.find(x=> x.id === idDataGames)
    setInput({name: dataGames.name, platform: dataGames.platform, release: dataGames.release, singlePlayer: dataGames.singlePlayer, genre: dataGames.genre, multiplayer: dataGames.multiplayer, review: dataGames.review, image_url: dataGames.image_url})
    setSelectedId(idDataGames)
    setStatusForm("edit")
  }

  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "name":
      {
        setInput({...input, name: event.target.value});
        break
      }
      case "platform":
      {
        setInput({...input, platform: event.target.value});
        break
      }
      case "release":
      {
        setInput({...input, release: event.target.value});
          break
      }
      case "singlePlayer":
      {
        setInput({...input, singlePlayer: event.target.value});
          break
      }
      case "genre":
      {
        setInput({...input, genre: event.target.value});
          break
      }
      case "multiplayer":
      {
        setInput({...input, multiplayer: event.target.value});
          break
      }
      case "review":
      {
        setInput({...input, review: event.target.value});
          break
      }
      case "image_url":
      {
        setInput({...input, image_url: event.target.value});
          break
      }
    default:
      {break;}
    }
  }

  const handleSubmit = (event) =>{
    event.preventDefault()

    let name = input.name
    let release = input.release.toString()
    
    if (name.replace(/\s/g,'') !== "" && release.replace(/\s/g,'') !== ""){      
      if (statusForm === "create"){        
        axios.post(`https://backendexample.sanbersy.com/api/games`, {name: input.name, platform: input.platform, release: input.release, singlePlayer: input.singlePlayer, genre: input.genre, multiplayer: input.multiplayer, review: input.review, image_url: input.image_url})
        .then(res => {
            setDaftarGames([
              ...daftarGames, 
              { id: res.data.id, 
                name: input.name, 
                platform: input.platform, 
                release: input.release, 
                singlePlayer: input.singlePlayer, 
                genre: input.genre, 
                multiplayer: input.multiplayer, 
                review: input.review, 
                image_url: input.image_url
              }])
        })
      }else if(statusForm === "edit"){
        axios.put(`https://backendexample.sanbersy.com/api/games/${selectedId}`, {name: input.name, platform: input.platform, release: input.release, singlePlayer: input.singlePlayer, genre: input.genre, multiplayer: input.multiplayer, review: input.review, image_url: input.image_url})
        .then(() => {
            let dataGames = daftarGames.find(el=> el.id === selectedId)
            dataGames.name = input.name
            dataGames.platform = input.platform
            dataGames.release = input.release
            dataGames.singlePlayer = input.singlePlayer
            dataGames.genre = input.genre
            dataGames.multiplayer = input.multiplayer
            dataGames.review = input.review
            dataGames.image_url = input.image_url
            setDaftarGames([...daftarGames])
        })
      }
      
      setStatusForm("create")
      setSelectedId(0)
      setInput({name: "", platform: "", release: 0, singlePlayer: 0, genre: "", multiplayer: 1, review: "", image_url:""})
    }
  }

  return (
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{backgroundColor:"#009be5"}}>
          <TableRow>
            <TableCell style={{color:"white"}}>Name</TableCell>
            <TableCell style={{color:"white"}}>Platform</TableCell>
            <TableCell style={{color:"white"}}>Release</TableCell>
            <TableCell style={{color:"white"}}>Single Player</TableCell>
            <TableCell style={{color:"white"}}>Genre</TableCell>
            <TableCell style={{color:"white"}}>Multiplayer</TableCell>
            <TableCell style={{color:"white"}}>Image URL</TableCell>
            <TableCell style={{color:"white"}}/>
            <TableCell style={{color:"white"}}/>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            daftarGames !== null && daftarGames.map((item)=>{
              return(
                <TableRow key={item.name}>
                  <TableCell component="th" scope="item">
                    {item.name}
                  </TableCell>
                  <TableCell align="left">{item.platform}</TableCell>
                  <TableCell align="left">{item.release}</TableCell>
                  <TableCell align="left">{item.singlePlayer}</TableCell>
                  <TableCell align="left">{item.genre}</TableCell>
                  <TableCell align="left">{item.multiplayer}</TableCell>
                  <TableCell align="left">
                    <ButtonBase className={classes.image} style={{borderRadius:"2%"}}>
                      <img src={item.image_url} style={{borderRadius:"2%", height:"auto", maxWidth:"100px"}} alt=""/>
                    </ButtonBase>
                  </TableCell>
                  <TableCell align="left">
                  <Button variant="contained" color="action" onClick={handleEdit} value={item.id}><EditRoundedIcon/></Button>
                  </TableCell>
                  <TableCell align="left">
                  <Button variant="contained" color="secondary" onClick={handleDelete} value={item.id}><DeleteIcon/></Button>
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
    <br/>
    <Paper className={classes.paper}>
    <Grid container direction="row" justify="center" alignItems="center">
      <div className={classes.contentWrapper}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid item>
          <TextField margin="normal" id="filled-basic" label="Name" variant="filled" type="text" name="name" value={input.name} onChange={handleChange}/>
          &emsp;
          <TextField margin="normal" id="filled-basic" label="Genre" variant="filled" type="text" name="genre" value={input.genre} onChange={handleChange}/>
          &emsp;
          <TextField margin="normal" id="filled-basic" label="Release" inputProps={{ min: 0, max: 2020}} variant="filled" type="number" name="release" value={input.release} onChange={handleChange}/>
          &emsp;
          <TextField margin="normal" id="filled-basic" label="SinglePlayer" inputProps={{ min: 0, max: 1}} variant="filled" type="number" name="singlePlayer" value={input.singlePlayer} onChange={handleChange}/>
          </Grid>
          <center>
          <Grid item>
          <TextField margin="normal" id="filled-basic" label="Image URL" variant="filled" type="text" name="image_url" value={input.image_url} onChange={handleChange}/>
          &emsp;
          <TextField margin="normal" id="filled-basic" label="Multiplayer" inputProps={{ min: 0, max: 1}} variant="filled" type="number" name="multiplayer" value={input.multiplayer} onChange={handleChange}/>
          &emsp;
          <TextField margin="normal" id="filled-basic" label="Platform" variant="filled" type="text" name="platform" value={input.platform} onChange={handleChange}/>
        </Grid>
        <br/>
        <Button variant="contained" color="primary" type="submit">Send&ensp;<SendIcon/></Button>
        </center>
      </form>
      </div>
    </Grid>
    </Paper>
    </>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
