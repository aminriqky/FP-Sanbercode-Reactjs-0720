import React from "react"
import { Switch, Route } from "react-router-dom";
import Movie from './Movie/Paperbase';
import Games from './Games/Paperbase';
import SigninPage from './SignIn';
import SignupPage from './SignUp';
import EditPass from './EditPass/Paperbase';

const Routes = () => {

    return(
        <>
        <Switch>
        <Route path="/EditPass">
            <EditPass/>
        </Route>
        <Route path="/SignUp">
            <SignupPage/>
        </Route>
        <Route path="/Games">
            <Games/>
        </Route>
        <Route path="/Movie">
            <Movie/>
        </Route>
        <Route path="/">
            <SigninPage/>
        </Route>
        </Switch>
        </>
    );
};

export default Routes;