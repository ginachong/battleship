import React from 'react';
import './App.css';
import PlayingGrid from './PlayingGrid'
import PlaceShipsGrid from './PlaceShipsGrid'
import { Switch, Route } from 'react-router-dom'
import { withDataProvider } from './DataProvider'

function App(props) {
  return (
    <Switch>
      <Route exact path='/' render={rprops => <PlaceShipsGrid {...rprops}/>}/>
      <Route path='/battleship' render={rprops => <PlayingGrid {...rprops}/>}/>
    </Switch>
  );
}

export default withDataProvider(App);
