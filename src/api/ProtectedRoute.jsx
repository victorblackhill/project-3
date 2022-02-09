import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({Component, auth,...rest}){

    if(auth.isLoggedIn){
        return <Route {...rest} render ={routeProps =><Component {...routeProps} ></Component> }/>
    } else{
        return <Redirect to={{ pathname: '/', state: { from: rest.location } }}/>
    }

}



export default ProtectedRoute