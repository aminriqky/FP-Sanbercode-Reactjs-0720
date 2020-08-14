import React from 'react';
import './Routes.css'
import { Switch, Route } from "react-router-dom";
import {Link as RouterLink} from "react-router-dom";
import ReviewMov from './ReviewMov';
import ListMov from './ListMov'
import {Button, Container} from '@material-ui/core';

const Routes = () => {
    return(
        <>
        <nav>
        <Container>
        <Button id='menu'><RouterLink to='/ListMov'>List Movie</RouterLink></Button>
        <Button id='menu'><RouterLink to='/'>Home</RouterLink></Button>
        </Container>
        </nav>
        <Switch>
        <Route path="/ListMov">
            <ListMov/>
        </Route>
        <Route path="/">
            <ReviewMov/>
        </Route>
        </Switch>
        </>
    );
};

export default Routes;