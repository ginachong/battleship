import React from 'react';
import './App.css';
import PlayingGrid from './PlayingGrid'
import PlaceShipsGrid from './PlaceShipsGrid'
import { Switch, Route, Redirect } from 'react-router-dom'
import { withDataProvider } from './DataProvider'
import SignUpPage from './SignUpPage'
import ProtectedRoute from './ProtectedRoute'


function App(props) {
  const { token } = props
  return (
    <Switch>
      <Route exact path='/' render={rprops => !token ? <SignUpPage {...rprops}/> : <Redirect to='/placeships' />}/>
      <ProtectedRoute 
        path='/placeships' 
        token={token}
        component={PlaceShipsGrid}
        redirectTo='/'/>
      <ProtectedRoute 
        path='/battleship' 
        token={token}
        component={PlayingGrid}
        redirectTo='/'/>
    </Switch>
  );
}

export default withDataProvider(App);
