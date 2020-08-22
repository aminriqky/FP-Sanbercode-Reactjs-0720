import React from "react"
import { Switch, Route } from "react-router-dom";
import ListMov from './Movie/ListMov/Paperbase';
import RevMov from './Movie/RevMov/Paperbase';
import ListGames from './Games/ListGames/Paperbase';
import DataGames from './Games/DataGames/Paperbase';
import TableMov from './Movie/TableMov/Paperbase';
import TableGames from './Games/TableGames/Paperbase';
import SigninPage from './SignIn';
import SignupPage from './SignUp';
import EditPass from './EditPass/Paperbase';
import FormMov from './Movie/FormMov/Paperbase';
import FormGames from './Games/FormGames/Paperbase';

const Routes = () => {

    return(
        <>
        <Switch>
        <Route path="/FormGames">
            <FormGames/>
        </Route>
        <Route path="/FormMov">
            <FormMov/>
        </Route>
        <Route path="/EditPass">
            <EditPass/>
        </Route>
        <Route path="/SignUp">
            <SignupPage/>
        </Route>
        <Route path="/TableGames">
            <TableGames/>
        </Route>
        <Route path="/TableMov">
            <TableMov/>
        </Route>
        <Route path="/DataGames">
            <DataGames/>
        </Route>
        <Route path="/ListGames">
            <ListGames/>
        </Route>
        <Route path="/RevMov">
            <RevMov/>
        </Route>
        <Route path="/ListMov">
            <ListMov/>
        </Route>
        <Route path="/">
            <SigninPage/>
        </Route>
        </Switch>
        </>
    );
};

export default Routes;