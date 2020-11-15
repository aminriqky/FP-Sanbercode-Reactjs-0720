import React from "react"
import { Switch } from "react-router-dom";
import Movie from './Movie/Paperbase';
import Games from './Games/Paperbase';
import SigninPage from './SignIn';
import SignupPage from './SignUp';
import EditPass from './EditPass/Paperbase';
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";

const Routes = () => {

    return(
        <>
        <Switch>
        <AuthenticatedRoute path="/EditPass">
            <EditPass/>
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/Games">
            <Games/>
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/Movie">
            <Movie/>
        </AuthenticatedRoute>
        <UnauthenticatedRoute path="/SignUp">
            <SignupPage/>
        </UnauthenticatedRoute>
        <UnauthenticatedRoute path="/">
            <SigninPage/>
        </UnauthenticatedRoute>
        </Switch>
        </>
    );
};

export default Routes;