// here I needed the boxes to be either white, red or gray
// depending on if they hit a ship or not, so I set state
// to the background color of each box so that when clicked the
// colors will change accordingly.

import React from 'react'
import styled from 'styled-components'
import { withDataProvider } from './DataProvider'

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    text-align: center;
`
const GridHeader = styled.h1`
    
`

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    border: 1px solid black;
    width: 100%;
`

const GridBoxes = styled.div`
    border: 1px solid black;
    height: 50px;
`

const Score = styled.h1`
    display: block;
`

const WinLose = styled.h1`
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 300px;
    font-size: 90px;
`

const Logout = styled.button`

`

class PlayingGrid extends React.Component {
    constructor(){
        super()
        this.state = {
            playerGrid: [   ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                            ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                            ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                            ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                            ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                            ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                            ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                            ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                            ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                            ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"]],
            computerGrid: [ ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                            ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                            ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                            ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                            ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                            ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                            ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                            ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                            ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                            ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"]],
            currentCompGrid: [],
            winner: ""
        }
    }

componentDidMount(){
    this.chooseCompTemplate()
}

    chooseCompTemplate = () => {
        const grid1 = [ ["white", "white", "white", "white", "white", "green", "green", "green", "white", "white"],
        ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
        ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
        ["yellow", "yellow", "pink", "white", "white", "white", "white", "white", "white", "white"],
        ["white", "white", "pink", "white", "white", "white", "white", "white", "white", "white"],
        ["white", "white", "pink", "purple", "white", "white", "white", "white", "white", "white"],
        ["white", "white", "white", "purple", "white", "white", "white", "white", "white", "white"],
        ["white", "white", "white", "purple", "white", "white", "white", "white", "white", "white"],
        ["white", "white", "white", "purple", "orange", "orange", "orange", "orange", "white", "white"],
        ["white", "white", "white", "purple", "white", "white", "white", "white", "white", "white"]]

        const grid2 = [ ["green", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
        ["green", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
        ["green", "white", "white", "white", "white", "white", "white", "white", "white", "orange"],
        ["white", "white", "white", "white", "white", "white", "white", "white", "white", "orange"],
        ["white", "pink", "white", "white", "white", "white", "white", "white", "white", "orange"],
        ["white", "pink", "yellow", "yellow", "white", "white", "white", "white", "white", "orange"],
        ["white", "pink", "white", "white", "white", "white", "white", "white", "white", "white"],
        ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
        ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
        ["white", "white", "white", "purple", "purple", "purple", "purple", "purple", "white", "white"]]

        const grid3 = [ ["white", "white", "white", "white", "white", "white", "orange", "white", "white", "white"],
        ["white", "white", "white", "white", "white", "white", "orange", "white", "white", "white"],
        ["white", "white", "white", "white", "white", "white", "orange", "white", "white", "white"],
        ["white", "white", "white", "white", "white", "white", "orange", "white", "white", "white"],
        ["white", "white", "white", "green", "green", "green", "white", "white", "white", "white"],
        ["white", "white", "white", "pink", "pink", "pink", "white", "white", "white", "white"],
        ["white", "white", "white", "white", "white", "purple", "purple", "purple", "purple", "purple"],
        ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
        ["yellow", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
        ["yellow", "white", "white", "white", "white", "white", "white", "white", "white", "white"]]

        const grid4 = [ ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
        ["white", "white", "white", "white", "white", "purple", "white", "white", "white", "white"],
        ["white", "white", "white", "white", "white", "purple", "white", "white", "white", "green"],
        ["white", "white", "white", "white", "white", "purple", "white", "white", "white", "green"],
        ["white", "white", "white", "white", "white", "purple", "white", "white", "white", "green"],
        ["white", "white", "white", "white", "white", "purple", "white", "orange", "white", "white"],
        ["white", "white", "white", "white", "white", "white", "white", "orange", "white", "white"],
        ["white", "white", "white", "white", "white", "white", "white", "orange", "white", "white"],
        ["yellow", "yellow", "white", "white", "white", "white", "white", "orange", "white", "white"],
        ["white", "white", "pink", "pink", "pink", "white", "white", "white", "white", "white"]]
    
        const randomNum = Math.floor(Math.random() * 4) + 1
        const computerGrid = randomNum === 1 ? grid1 : randomNum === 2 ? grid2 : randomNum === 3 ? grid3 : grid4
        this.setState({currentCompGrid: computerGrid})
    }

    handleClick = (y, x) => {
        const newGrid = [...this.state.computerGrid]
        if(this.state.currentCompGrid[y][x] !== "white")newGrid[y][x] = "red"
        else newGrid[y][x] = "gray"

        this.setState({computerGrid: newGrid})
        this.checkWin()
        this.computerMove()
    }

    computerMove = () => {
        //for loop through grid
        //check if there is a red
        //check 4 surrounding boxes 
        //if y is 9 or 0 || x is 9 or 0 ---> check only 3 boxes
        //--> if all gray, do random numbers
        //
        const y = Math.floor(Math.random() * 10)
        const x = Math.floor(Math.random() * 10)
        setTimeout(this.computerTurn(y, x), 3000)
    }

    // computerSmartMove = (y, x) => {
    //     const newY = y + 1
    //     const newX = x + 1
    //     setTimeout(this.computerTurn(y, x), 3000)
    // }

    computerTurn = (y, x) => {
        const newGrid = [...this.state.playerGrid]
        if(newGrid[y][x] !== "white"){
            return this.computerMove()
        }
        if(this.props.playerShipsGrid[y][x] !== "white")newGrid[y][x] = "red"
        else newGrid[y][x] = "gray"

        this.setState({playerGrid: newGrid})
        this.checkWin()
    }

    createComputerGrid = () => {
        let gridBoxArray = []

        for(let y = 0; y < this.state.computerGrid.length; y++){
            for(let x = 0; x < this.state.computerGrid[y].length; x++){
                gridBoxArray.push(<GridBoxes id={y + "." + x} style={{backgroundColor: this.state.computerGrid[y][x]}} onClick={() => this.handleClick(y, x)} key={y + "." + x}></GridBoxes>)
            }
        }
        return gridBoxArray
    }

    createPlayerGrid = () => {
        let gridBoxArray = []

        for(let y = 0; y < this.state.playerGrid.length; y++){
            for(let x = 0; x < this.state.playerGrid[y].length; x++){
                gridBoxArray.push(<GridBoxes id={y + "." + x} style={{backgroundColor: this.state.playerGrid[y][x]}} key={y + "." + x}></GridBoxes>)
            }
        }
        return gridBoxArray
    }

    checkWin = () => {
        let playerGridCounter = 0
        let computerGridCounter = 0
        for(let y = 0; y < this.state.playerGrid.length; y++){
            for(let x = 0; x < this.state.playerGrid[y].length; x++){
                if(this.state.playerGrid[y][x] === "red") playerGridCounter++
            }
        }
        for(let y = 0; y < this.state.computerGrid.length; y++){
            for(let x = 0; x < this.state.computerGrid[y].length; x++){
                if(this.state.computerGrid[y][x] === "red") computerGridCounter++
            }
        }
        if(playerGridCounter === 17){
            this.setState({winner: "computer"})
            this.props.addLoss()
            console.log(this.props.losses)
            this.props.updateUserScore(this.props.wins, this.props.losses + 1)
        }
        else if(computerGridCounter === 17){
            this.setState({winner: "player"})
            this.props.addWin()
            console.log(this.props.wins)
            this.props.updateUserScore(this.props.wins + 1, this.props.losses)
        }
    }

    render(){  

        const winningMsg = this.state.winner === "player" ? "You Win!" : "Computer Wins"
        return (
            <>
                <Container>
                    <div>
                        <GridHeader>Computer Grid</GridHeader>
                        <GridContainer>
                            {this.createComputerGrid()}
                        </GridContainer>
                    </div>
                    <div>
                        <GridHeader>Player Grid</GridHeader>
                        <GridContainer>
                            {this.createPlayerGrid()}
                        </GridContainer>
                    </div>
                    {this.state.winner !== "" && <WinLose>{winningMsg}</WinLose>}
                </Container>
                    <Score>Your Wins: {this.props.wins}</Score>
                    <Score>Your Losses: {this.props.losses}</Score>
                    <Logout>Logout</Logout>
            </>
        )
    }
}

export default withDataProvider(PlayingGrid) 