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

function PlaceShipsGrid(props) {

    function createGrid() {
        let gridBoxArray = []

        for(let y = 0; y < props.playerShipsGrid.length; y++){
            for(let x = 0; x < props.playerShipsGrid[y].length; x++){
                gridBoxArray.push(<GridBoxes id={y + "." + x} style={props.playerShipsGrid[y][x] ? {backgroundColor: "black"} : {backgroundColor: "white"}} onClick={() => props.handleClick(y, x)} key={y + "." + x}></GridBoxes>)
            }
        }
        return gridBoxArray
    }

        return (
                <Container>
                    <GridContainer>
                        {createGrid()}
                    </GridContainer>
                    <ButtonHolder>
                        <Button>Start Playing!</Button>
                    </ButtonHolder>
                </Container>
        )
    }

    export default withDataProvider(PlaceShipsGrid);