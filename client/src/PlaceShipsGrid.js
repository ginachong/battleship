//here I made the boxes toggle between black and white 

import React from 'react'
import styled from 'styled-components'
import { withDataProvider } from './DataProvider'

const Container = styled.div`
    // display: flex;
    // flex-flow: column;
    // justify-content: center;
`

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    border: 1px solid black;
`

const GridBoxes = styled.div`
    border: 1px solid black;
    height: 50px;
`

const ButtonHolder = styled.div`
    display: flex;
    justify-content: center;
`

const Button = styled.button`
    width: 150px;
    padding: 5px;
    font-size: 20px;
    margin: 10px;
`

const ShipContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
`

const Ship = styled.div`
    display: inline-block;
    border: 1px solid black;
    padding: 10px;
    &:hover{cursor: pointer}
`

const Score = styled.h1`
    display: block;
`

const Logout = styled.button`
    
`

function PlaceShipsGrid(props) {

    function createGrid() {
        let gridBoxArray = []

        for(let y = 0; y < props.playerShipsGrid.length; y++){
            for(let x = 0; x < props.playerShipsGrid[y].length; x++){
                gridBoxArray.push(<GridBoxes id={y + "." + x} style={{backgroundColor: [props.playerShipsGrid[y][x]]}} onClick={() => props.handleClick(y, x)} key={y + "." + x}></GridBoxes>)
            }
        }
        return gridBoxArray
    }

        return (
                <Container>
                    <GridContainer>
                        {createGrid()}
                    </GridContainer>
                    <ShipContainer>
                        <Ship onClick={(e) => props.placeShipsClick(e)} id="ship1" style={props.currentShip === "ship1" ? {backgroundColor: "yellow"} : {backgroundColor: "white"}}>Place Ship 1</Ship>
                        <Ship onClick={(e) => props.placeShipsClick(e)} id="ship2" style={props.currentShip === "ship2" ? {backgroundColor: "pink"} : {backgroundColor: "white"}}>Place Ship 2</Ship>
                        <Ship onClick={(e) => props.placeShipsClick(e)} id="ship3" style={props.currentShip === "ship3" ? {backgroundColor: "green"} : {backgroundColor: "white"}}>Place Ship 3</Ship>
                        <Ship onClick={(e) => props.placeShipsClick(e)} id="ship4" style={props.currentShip === "ship4" ? {backgroundColor: "orange"} : {backgroundColor: "white"}}>Place Ship 4</Ship>
                        <Ship onClick={(e) => props.placeShipsClick(e)} id="ship5" style={props.currentShip === "ship5" ? {backgroundColor: "purple"} : {backgroundColor: "white"}}>Place Ship 5</Ship>
                    </ShipContainer>
                    <ButtonHolder>
                        <Button onClick={() => props.startPlaying()}>Start Playing!</Button>
                    </ButtonHolder>
                    <Score>Your Wins: {props.wins}</Score>
                    <Score>Your Losses: {props.losses}</Score>
                    <Logout onClick={props.logout}>Logout</Logout>
                </Container>
        )
    }

    export default withDataProvider(PlaceShipsGrid);