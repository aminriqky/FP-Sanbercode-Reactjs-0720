import React, {useState, useEffect} from "react"
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import axios from "axios"

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

function Content(props) {
  const { classes } = props;

  const [daftarFilm, setDaftarFilm] =  useState(null)

  useEffect( () => {
    if (daftarFilm === null){
      axios.get(`https://backendexample.sanbersy.com/api/movies`)
      .then(res => {
        setDaftarFilm(res.data.map(el=>{ return {id: el.id, title: el.title, description: el.description, year: el.year, duration: el.duration, genre: el.genre, rating: el.rating, review: el.review, image_url: el.image_url}} ))
      })
    }
  }, [daftarFilm])

  return (
    <>
      {
        daftarFilm !== null && daftarFilm.map((item)=>{
          return(
            <>
            <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
            <ButtonBase href={`/RevMov/${item.title}`}>
              <Toolbar>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Typography color="textSecondary" align="center"><b>{item.title}</b></Typography>
                  </Grid>
                </Grid>
              </Toolbar>
            </ButtonBase>
            </AppBar>
            <div className={classes.contentWrapper}>
            <Grid container spacing={6} alignItems="center">
              <Grid item>
                <ButtonBase className={classes.image} style={{borderRadius:"2%"}}>
                  <img src={item.image_url} style={{borderRadius:"2%", height:"auto", maxWidth:"250px"}} alt=""/>
                </ButtonBase>
              </Grid>
              <Grid item>
              <div className={classes.contentWrapper} align="left">
                <Typography color="textSecondary" align="left"><b>Description : </b>{item.description}</Typography>
                <Typography color="textSecondary" align="left"><b>Year : </b>{item.year}</Typography>
                <Typography color="textSecondary" align="left"><b>Duration : </b>{item.duration} Menit</Typography>
                <Typography color="textSecondary" align="left"><b>Genre : </b>{item.genre}</Typography>
                <Typography color="textSecondary" align="left"><b>Rating : </b></Typography>
                  <Rating name="customized-10" defaultValue={item.rating} max={10} readOnly />
                <Typography color="textSecondary" align="left"><b>Review : </b>{item.review}</Typography>
              </div>
              </Grid>
            </Grid>
            </div>
            </Paper>
            <br/>
            </>
          )
        })
      }
    </>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
