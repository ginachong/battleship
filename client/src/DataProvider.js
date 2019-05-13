import React from 'react'
const DataContext = React.createContext()

export default class DataProvider extends React.Component {
    constructor(){
        super()
        this.state = {
            playerShipsGrid: [  [false, false, false, false, false, false, false, false, false, false],
                                [false, false, false, false, false, false, false, false, false, false],
                                [false, false, false, false, false, false, false, false, false, false],
                                [false, false, false, false, false, false, false, false, false, false],
                                [false, false, false, false, false, false, false, false, false, false],
                                [false, false, false, false, false, false, false, false, false, false],
                                [false, false, false, false, false, false, false, false, false, false],
                                [false, false, false, false, false, false, false, false, false, false],
                                [false, false, false, false, false, false, false, false, false, false],
                                [false, false, false, false, false, false, false, false, false, false]]
        }
    }

    handleClick = (y, x) => {
        const newGrid = [...this.state.playerShipsGrid]
        newGrid[y][x] = !newGrid[y][x]
        this.setState({playerShipsGrid: newGrid})
    }

    render(){  
        return (
            <DataContext.Provider value={{
                ...this.state,
                handleClick: this.handleClick
                }}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}

export const withDataProvider = C => props => (
    <DataContext.Consumer>
        {value => <C {...props} {...value}/>}
    </DataContext.Consumer>
)