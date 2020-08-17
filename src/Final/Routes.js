import React, {useState, useEffect} from "react"
import axios from "axios"
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
import DetailMov from './Movie/DetailMov/Paperbase';

const Routes = () => {

    const [daftarFilm, setDaftarFilm] =  useState(null)

    useEffect( () => {
      if (daftarFilm === null){
        axios.get(`https://backendexample.sanbersy.com/api/movies`)
        .then(res => {
          setDaftarFilm(res.data.map(el=>{ return {id: el.id, title: el.title, description: el.description, year: el.year, duration: el.duration, genre: el.genre, rating: el.rating, review: el.review, image_url: el.image_url}} ))
        })
      }
    }, [daftarFilm])

    return(
        <>
        <Switch>
        <Route path={`/RevMov/:id`}>
            <DetailMov/>
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