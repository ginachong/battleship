// here I needed the boxes to be either white, red or gray
// depending on if they hit a ship or not, so I set state
// to the background color of each box so that when clicked the
// colors will change accordingly.

import React from 'react'
import styled from 'styled-components'
import { withDataProvider } from './DataProvider'

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    border: 1px solid black;
`

const GridBoxes = styled.div`
    border: 1px solid black;
    height: 50px;
`

class PlayingGrid extends React.Component {
    constructor(){
        super()
        this.state = {
            grid: [ ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                    ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                    ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                    ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                    ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                    ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                    ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                    ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                    ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                    ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"]]
        }
    }

    handleClick = (y, x) => {
        console.log(this.props.PlayingGrid)
        const newGrid = [...this.state.grid]
        newGrid[y][x] = "pink"
        this.setState({grid: newGrid})
    }

    createGrid = () => {
        let gridBoxArray = []

        for(let y = 0; y < this.state.grid.length; y++){
            for(let x = 0; x < this.state.grid[y].length; x++){
                gridBoxArray.push(<GridBoxes id={y + "." + x} style={{backgroundColor: this.state.grid[y][x]}} onClick={() => this.handleClick(y, x)} key={y + "." + x}></GridBoxes>)
            }
        }
        return gridBoxArray
    }

    render(){  
        return (
                <GridContainer>
                    {this.createGrid()}
                </GridContainer>
        )
    }
}

export default withDataProvider(PlayingGrid) 