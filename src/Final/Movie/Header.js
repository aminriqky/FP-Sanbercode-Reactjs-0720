import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const ListMov = lazy(() => import('./ListMov/Content'));
const RevMov = lazy(() => import('./RevMov/Content'));
const TableMov = lazy(() => import('./TableMov/Content'));
const FormMov = lazy(() => import('./FormMov/Content'));

const renderLoader = () => <center><Typography>Loading...</Typography></center>;

const lightColor = 'rgba(255, 255, 255, 0.7)';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
});

function Header(props) {
  const { classes, onDrawerToggle } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <AppBar color="primary" position="static" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                Movie
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs value={value} onChange={handleChange} textColor="inherit">
          <Tab textColor="inherit" label="List Movie" {...a11yProps(0)} />
          <Tab textColor="inherit" label="Review Movie" {...a11yProps(1)} />
          <Tab textColor="inherit" label="Table Movie" {...a11yProps(2)} />
          <Tab textColor="inherit" label="Form Movie" {...a11yProps(3)}/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <Suspense fallback={renderLoader()}>
        <ListMov/>
      </Suspense>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Suspense fallback={renderLoader()}>
        <RevMov/>
      </Suspense>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Suspense fallback={renderLoader()}>
        <TableMov/>
      </Suspense>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <Suspense fallback={renderLoader()}>
        <FormMov/>
      </Suspense>
      </TabPanel>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
