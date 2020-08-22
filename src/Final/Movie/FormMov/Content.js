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
import EditIcon from '@material-ui/icons/Edit';
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

  const [daftarFilm, setDaftarFilm] =  useState(null)
  const [input, setInput]  =  useState({title: "", description: "", year: 0, duration: 0, genre: "", rating: 1, review: "", image_url:""})
  const [selectedId, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")

  useEffect( () => {
    if (daftarFilm === null){
      axios.get(`https://backendexample.sanbersy.com/api/movies`)
      .then(res => {
        setDaftarFilm(res.data.map(el=>{ return {id: el.id, title: el.title, description: el.description, year: el.year, duration: el.duration, genre: el.genre, rating: el.rating, review: el.review, image_url: el.image_url}} ))
      })
    }
  }, [daftarFilm])

  const handleDelete = (event) => {
    let idDataFilm = parseInt(event.target.value)

    let newdaftarfilm = daftarFilm.filter(el => el.id !== idDataFilm)

    axios.delete(`https://backendexample.sanbersy.com/api/movies/${idDataFilm}`)
    .then(res => {
      console.log(res)
    })

    setDaftarFilm([...newdaftarfilm])

  }

  const handleEdit = (event) =>{
    let idDataFilm = parseInt(event.target.value)
    let dataFilm = daftarFilm.find(x=> x.id === idDataFilm)
    setInput({title: dataFilm.title, description: dataFilm.description, year: dataFilm.year, duration: dataFilm.duration, genre: dataFilm.genre, rating: dataFilm.rating, review: dataFilm.review, image_url: dataFilm.image_url})
    setSelectedId(idDataFilm)
    setStatusForm("edit")
  }

  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "title":
      {
        setInput({...input, title: event.target.value});
        break
      }
      case "description":
      {
        setInput({...input, description: event.target.value});
        break
      }
      case "year":
      {
        setInput({...input, year: event.target.value});
          break
      }
      case "duration":
      {
        setInput({...input, duration: event.target.value});
          break
      }
      case "genre":
      {
        setInput({...input, genre: event.target.value});
          break
      }
      case "rating":
      {
        setInput({...input, rating: event.target.value});
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

    let title = input.title
    let year = input.year.toString()

    if (title.replace(/\s/g,'') !== "" && year.replace(/\s/g,'') !== ""){      
      if (statusForm === "create"){        
        axios.post(`https://backendexample.sanbersy.com/api/movies`, {title: input.title, description: input.description, year: input.year, duration: input.duration, genre: input.genre, rating: input.rating, review: input.review, image_url: input.image_url})
        .then(res => {
            setDaftarFilm([
              ...daftarFilm, 
              { id: res.data.id, 
                title: input.title, 
                description: input.description, 
                year: input.year, 
                duration: input.duration, 
                genre: input.genre, 
                rating: input.rating, 
                review: input.review, 
                image_url: input.image_url
              }])
        })
      }else if(statusForm === "edit"){
        axios.put(`https://backendexample.sanbersy.com/api/movies/${selectedId}`, {title: input.title, description: input.description, year: input.year, duration: input.duration, genre: input.genre, rating: input.rating, review: input.review, image_url: input.image_url})
        .then(() => {
            let dataFilm = daftarFilm.find(el=> el.id === selectedId)
            dataFilm.title = input.title
            dataFilm.description = input.description
            dataFilm.year = input.year
            dataFilm.duration = input.duration
            dataFilm.genre = input.genre
            dataFilm.rating = input.rating
            dataFilm.review = input.review
            dataFilm.image_url = input.image_url
            setDaftarFilm([...daftarFilm])
        })
      }

      setStatusForm("create")
      setSelectedId(0)
      setInput({title: "", description: "", year: 0, duration: 0, genre: "", rating: 1, review: "", image_url:""})
    }

  }

  return (
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead style={{backgroundColor:"#009be5"}}>
          <TableRow>
            <TableCell style={{color:"white"}}>Title</TableCell>
            <TableCell style={{color:"white"}}>Genre</TableCell>
            <TableCell style={{color:"white"}}>Rating</TableCell>
            <TableCell style={{color:"white"}}>Review</TableCell>
            <TableCell style={{color:"white"}}/>
            <TableCell style={{color:"white"}}/>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            daftarFilm !== null && daftarFilm.map((item)=>{
              return(
                <TableRow key={item.title}>
                  <TableCell component="th" scope="item">
                    {item.title}
                  </TableCell>
                  <TableCell align="left">{item.genre}</TableCell>
                  <TableCell align="left">{item.rating}</TableCell>
                  <TableCell align="left">{item.review}</TableCell>
                  <TableCell align="left">
                  <Button variant="contained" color="action" onClick={handleEdit} value={item.id}><EditIcon/></Button>
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
          <TextField margin="normal" id="filled-basic" label="Title" variant="filled" type="text" name="title" value={input.title} onChange={handleChange}/>
          &emsp;
          <TextField margin="normal" id="filled-basic" label="Genre" variant="filled" type="text" name="genre" value={input.genre} onChange={handleChange}/>
          &emsp;
          <TextField margin="normal" id="filled-basic" inputProps={{ min: 0, max: 2020}} label="Year" variant="filled" type="number" name="year" value={input.year} onChange={handleChange}/>
          &emsp;
          <TextField margin="normal" id="filled-basic" label="Duration" variant="filled" type="number" name="duration" value={input.duration} onChange={handleChange}/>
          </Grid>
          <center>
          <Grid item>
          <TextField multiline="true" margin="normal" id="filled-basic" label="Image URL" variant="filled" type="text" name="image_url" value={input.image_url} onChange={handleChange}/>
          &emsp;
          <TextField margin="normal" id="filled-basic" inputProps={{ min: 1, max: 10}} label="Rating" variant="filled" type="number" name="rating" value={input.rating} onChange={handleChange}/>
          &emsp;
          <TextField multiline="true" margin="normal" id="filled-basic" label="Description" variant="filled" type="text" name="description" value={input.description} onChange={handleChange}/>
          &emsp;
          <TextField multiline="true" margin="normal" id="filled-basic" label="Review" variant="filled" type="text" name="review" value={input.review} onChange={handleChange}/>
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