import React, {useState, useEffect} from "react"
import PropTypes from 'prop-types';
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
      axios.get(`https://backendexample.sanbersy.com/api/games`)
      .then(res => {
        setDaftarFilm(res.data.map(el=>{ return {id: el.id, name: el.name, platform: el.platform, release: el.release, singlePlayer: el.singlePlayer, genre: el.genre, multiplayer: el.multiplayer, image_url: el.image_url}} ))
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
              <Toolbar>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Typography color="textSecondary" align="center"><b>{item.name}</b></Typography>
                  </Grid>
                </Grid>
              </Toolbar>
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
                <Typography color="textSecondary" align="left"><b>Platform : </b>{item.platform}</Typography>
                <Typography color="textSecondary" align="left"><b>Release : </b>{item.release}</Typography>
                <Typography color="textSecondary" align="left"><b>Single Player : </b>{item.singlePlayer}</Typography>
                <Typography color="textSecondary" align="left"><b>Genre : </b>{item.genre}</Typography>
                <Typography color="textSecondary" align="left"><b>Multiplayer : </b>{item.multiplayer}</Typography>
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
