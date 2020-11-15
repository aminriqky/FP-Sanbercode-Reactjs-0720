import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MovieIcon from '@material-ui/icons/Movie';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useAppContext } from "../contextLib";

function ListItemLink(props) {
  return <ListItem style={{color: "white"}} button component="a" {...props} />
}

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});

function Navigator(props) {
  const { classes, ...other } = props;
  const { userHasAuthenticated } = useAppContext();

  function logOut(e) {
    e.preventDefault()

    userHasAuthenticated(false);
    sessionStorage.clear();
  }

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          Amin Riqky
        </ListItem>
          <React.Fragment>
            <ListItem className={classes.categoryHeader} >
              <ListItemText classes={{primary: classes.categoryHeaderPrimary,}}>
                Entertainment
              </ListItemText>
            </ListItem>
              <ListItemLink className={clsx(classes.item)} href="/Movie">
                <ListItemIcon className={classes.itemIcon}>
                  <MovieIcon />
                </ListItemIcon>
                <ListItemText classes={{primary: classes.itemPrimary,}}>
                  Movie
                </ListItemText>
              </ListItemLink>
              <ListItemLink style={{color: '#4fc3f7'}} className={clsx(classes.item)} href="/Games">
                <ListItemIcon className={classes.itemIcon}>
                  <SportsEsportsIcon />
                </ListItemIcon>
                <ListItemText classes={{primary: classes.itemPrimary,}}>
                  Games
                </ListItemText>
              </ListItemLink>
            <Divider className={classes.divider} />
            <ListItem className={classes.categoryHeader} >
              <ListItemText classes={{primary: classes.categoryHeaderPrimary,}}>
                Setting
              </ListItemText>
            </ListItem>
              <ListItemLink className={clsx(classes.item)} href="/EditPass">
                <ListItemIcon className={classes.itemIcon}>
                  <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText classes={{primary: classes.itemPrimary,}}>
                  Edit Password
                </ListItemText>
              </ListItemLink>
              <ListItem button onClick={logOut} className={clsx(classes.item)}>
                <ListItemIcon className={classes.itemIcon}>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText classes={{primary: classes.itemPrimary,}}>
                  Logout
                </ListItemText>
              </ListItem>
          </React.Fragment>
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
