import React, {useState, useEffect} from "react"
import PropTypes from 'prop-types';
import axios from "axios"
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import SendIcon from '@material-ui/icons/Send';
import { useFormFields } from "../../hooksLib";

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
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
  const [input, setInput]  =  useState({name: "", platform: "", release: 0, singlePlayer: 0, genre: "", multiplayer: 0, review: "", image_url:""})
  const [selectedId, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")
  const [fields, handleFieldChange] = useFormFields({
    name: ""
  });

  useEffect( () => {
    if (daftarGames === null){
      axios.get(`https://backendexample.sanbersy.com/api/games`)
      .then(res => {
        setDaftarGames(res.data.map(el=>{ return {id: el.id, name: el.name, platform: el.platform, release: el.release, singlePlayer: el.singlePlayer, genre: el.genre, multiplayer: el.multiplayer, image_url: el.image_url}} ))
      })
    }
  }, [daftarGames])

  const handleDelete = (event) => {
    let idDataGames = parseInt(selectedId)

    let newdaftargames = daftarGames.filter(el => el.id !== idDataGames)

    axios.delete(`https://backendexample.sanbersy.com/api/games/${idDataGames}`)
    .then(res => {
      console.log(res)
    })

    setDaftarGames([...newdaftargames])
    alert("Data Berhasil Dihapus");
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
        alert("Data Berhasil Dibuat");
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
        alert("Data Berhasil Diubah");
      }

      setStatusForm("create")
      setSelectedId(0)
      setInput({name: "", platform: "", release: 0, singlePlayer: 0, genre: "", multiplayer: 1, review: "", image_url:""})
    }
  }

  async function handleSearch(event) {
    event.preventDefault()

    let res = await axios.get(`https://backendexample.sanbersy.com/api/games`)
    let data = res.data;
    let idData = {name: fields.name}
    let dataGam = data.find(x=> x.name === idData.name)
    if (dataGam != null ) {
      switch (dataGam){
        case "undefined":
        {
          alert("Undefined");
          break
        }
      default:
        alert("Data Telah Ditemukan")
        setSelectedId(dataGam.id)
      }
    } else {
      alert("Undefined");
    }
  }

  return (
    <>
    <Paper className={classes.paper}>
    <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
      <Toolbar>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography color="textSecondary" align="center"><b>Search Name First Then Click Edit or Delete</b> (Case Sensitive)</Typography>
        </Grid>
      </Grid>
      </Toolbar>
    </AppBar>
    <div className={classes.contentWrapper}>
    <Grid container direction="row" justify="center" alignItems="center">
      <div className={classes.contentWrapper}>
      <form noValidate autoComplete="off" onSubmit={handleSearch}>
        <Grid item>
        <TextField margin="normal" label="Name" variant="filled" type="text" id="name" name="name" value={fields.name} onChange={handleFieldChange}/>
        </Grid>
        <br/>
        <center>
        <Button variant="contained" color="primary" type="submit">Search&ensp;<SearchRoundedIcon/></Button>
        </center>
      </form>
      <br/>
      <Button variant="contained" color="secondary" onClick={handleDelete} value={selectedId}>Delete&ensp;<DeleteIcon/></Button>
      &emsp;
      <Button variant="contained" color="action" onClick={handleEdit} value={selectedId}>Edit&ensp;<EditRoundedIcon/></Button>
      </div>
    </Grid>
    </div>
    </Paper>
    <br/>
    <Paper className={classes.paper}>
    <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
    <Toolbar>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography color="textSecondary" align="center"><b>Create or Edit Form</b></Typography>
        </Grid>
      </Grid>
    </Toolbar>
    </AppBar>
    <Grid container direction="row" justify="center" alignItems="center">
      <div className={classes.contentWrapper}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <center>
        <Grid item>
        <TextField margin="normal" id="filled-basic" label="Name" variant="filled" type="text" name="name" value={input.name} onChange={handleChange}/>
          &emsp;
          <TextField margin="normal" id="filled-basic" label="Genre" variant="filled" type="text" name="genre" value={input.genre} onChange={handleChange}/>
          &emsp;
          <TextField margin="normal" id="filled-basic" label="Release" inputProps={{ min: 0, max: 2020}} variant="filled" type="number" name="release" value={input.release} onChange={handleChange}/>
          &emsp;
          <TextField margin="normal" id="filled-basic" label="SinglePlayer" inputProps={{ min: 0, max: 1}} variant="filled" type="number" name="singlePlayer" value={input.singlePlayer} onChange={handleChange}/>
          </Grid>
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