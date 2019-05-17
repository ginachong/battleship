import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
const scoreAxios = axios.create()
const DataContext = React.createContext()
scoreAxios.interceptors.request.use((config) => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
})


class DataProvider extends React.Component {
    constructor(){
        super()
        this.state = {
            playerShipsGrid: [  ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                                ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                                ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                                ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                                ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                                ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                                ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                                ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                                ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
                                ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white"]],
            currentShip: "",
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: localStorage.getItem("token") || "",
            wins: 0,
            losses: 0,
        }
    }

    componentDidMount(){
        this.getUserScore()
    }

    handleClick = (y, x) => {
        const { currentShip } = this.state
        const newGrid = [...this.state.playerShipsGrid]

        if(currentShip === "ship1"){
            if(newGrid[y][x] === "white" || newGrid[y][x] === "yellow"){
                newGrid[y][x] === "yellow" ? newGrid[y][x] = "white" : newGrid[y][x] = "yellow"
            }
        }
        if(currentShip === "ship2"){
            if(newGrid[y][x] === "white" || newGrid[y][x] === "pink"){
                newGrid[y][x] === "pink" ? newGrid[y][x] = "white" : newGrid[y][x] = "pink"
            }
        }
        if(currentShip === "ship3"){
            if(newGrid[y][x] === "white" || newGrid[y][x] === "green"){
                newGrid[y][x] === "green" ? newGrid[y][x] = "white" : newGrid[y][x] = "green"
            }
        }
        if(currentShip === "ship4"){
            if(newGrid[y][x] === "white"  || newGrid[y][x] === "orange"){
                newGrid[y][x] === "orange" ? newGrid[y][x] = "white" : newGrid[y][x] = "orange"
            }
        }
        if(currentShip === "ship5"){
            if(newGrid[y][x] === "white"  || newGrid[y][x] === "purple"){
                newGrid[y][x] === "purple" ? newGrid[y][x] = "white" : newGrid[y][x] = "purple"
            }
        }

        this.setState({playerShipsGrid: newGrid})
    }

    signup = userInfo => {
        return axios.post('/auth/signup', userInfo)
            .then(response => {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                this.setState({user: response.data.user, token: response.data.token})
                return response
        }).catch(err => console.log(err))
    }

    login = userInfo => {
        return axios.post('/auth/login', userInfo).then(response => {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            this.setState({user: response.data.user, token: response.data.token})
            return response
        })
    }

    logout = () => {

        this.updateUserScore(this.state.wins, this.state.losses)
        localStorage.removeItem('user')
        localStorage.removeItem('token')

        const emptyGrid = []
        for(let y = 0; y < this.state.playerShipsGrid.length; y++){
                emptyGrid.push([])
            for(let x = 0; x < this.state.playerShipsGrid[y].length; x++){
                emptyGrid[y].push("white")
            }
            console.log(emptyGrid)
        }

        this.setState({
            user: {},
            token: "",
            wins: 0,
            losses: 0,
            playerShipsGrid: emptyGrid
        })
    }

    getUserScore = () => {
        scoreAxios.get('/api/score/').then(res => {
            console.log(res.data)
            return this.setState({wins: res.data[0].wins, losses: res.data[0].losses})
        })
    }

    updateUserScore = (newWins, newLosses) => {
        scoreAxios.put('api/score', {
            wins: newWins,
            losses: newLosses
        }).then(res => this.setState({wins: res.data[0].wins, losses: res.data[0].losses}))
    }

    placeShipsClick = (e) => {
        this.setState({currentShip: e.target.id})
    }

    checkBoxesAdjacent = () => {

        const { playerShipsGrid } = this.state
        const msg = "Same colored blocks need to be adjacent"

        for(let y = 0; y < playerShipsGrid.length; y++){
            for(let x = 0; x < playerShipsGrid[y].length; x++){

                switch(playerShipsGrid[y][x]){

                    case "yellow": 
                        if(y === 9 && playerShipsGrid[y][x + 1] !== "yellow")alert(msg)
                        else if(x === 9 && playerShipsGrid[y + 1][x] !== "yellow")alert(msg)
                        else if(playerShipsGrid[y][x + 1] !== "yellow" && playerShipsGrid[y + 1][x] !== "yellow")alert(msg)
                                
                    case "pink":
                        if(y === 9 && playerShipsGrid[y][x + 1] !== "pink" && playerShipsGrid[y][x + 2] !== "pink")alert(msg)
                        else if(x === 9 && playerShipsGrid[y + 1][x] !== "pink" && playerShipsGrid[y][x + 2] !== "pink")alert(msg)
                        else if(playerShipsGrid[y][x], playerShipsGrid[y + 1][x], playerShipsGrid[y + 2][x] !== "pink" || playerShipsGrid[y][x], playerShipsGrid[y][x + 1], playerShipsGrid[y][x + 2] !== "pink")alert(msg)
                }
            }
        }
    }

    checkShipsValid = () => {

        //should be: 2 yellow, 3 pink, 3 green, 4 orange, 5 purple
        //check number of colors: use counter for each, then make a if loop for: if pink === 2 etc.
        //inside if loop: if statements checking if boxes are adjacent to each other.

        const { playerShipsGrid } = this.state

        let ship1Counter = 0
        let ship2Counter = 0
        let ship3Counter = 0
        let ship4Counter = 0
        let ship5Counter = 0

        for(let y = 0; y < playerShipsGrid.length; y++){
            for(let x = 0; x < playerShipsGrid[y].length; x++){
                if(playerShipsGrid[y][x] === "yellow") ship1Counter++
                if(playerShipsGrid[y][x] === "pink") ship2Counter++
                if(playerShipsGrid[y][x] === "green") ship3Counter++
                if(playerShipsGrid[y][x] === "orange") ship4Counter++
                if(playerShipsGrid[y][x] === "purple") ship5Counter++
            }
        }
       
        if(ship1Counter !== 2) alert("Ship 1 is not the correct length")
        else if(ship2Counter !== 3) alert("Ship 2 is not the correct length")
        else if(ship3Counter !== 3) alert("Ship 3 is not the correct length")
        else if(ship4Counter !== 4) alert("Ship 4 is not the correct length")
        else if(ship5Counter !== 5) alert("Ship 5 is not the correct length")
        else this.props.history.push('/battleship')

        const counterArr = [ship1Counter, ship2Counter, ship3Counter, ship4Counter, ship5Counter]
        return counterArr
    }

    startPlayingClick = () => {
        this.checkShipsValid()
        // this.checkBoxesAdjacent()
    }

    addWin = () => {
        this.setState(ps => ({wins: ps + 1}))
    }

    addLoss = () => {
        this.setState(ps => {
            return{losses: ps + 1}
        })
    }


    render(){  
        return (
            <DataContext.Provider value={{
                ...this.state,
                handleClick: this.handleClick,
                signup: this.signup,
                login: this.login,
                logout: this.logout,
                placeShipsClick: this.placeShipsClick,
                startPlaying: this.startPlayingClick,
                getUserScore: this.getUserScore,
                updateUserScore: this.updateUserScore,
                addWin: this.addWin,
                addLoss: this.addLoss,
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

export default withRouter(DataProvider)

//originally I was thinking of putting all of my relevant axios calls as well as user and token 
//within the scope of signup and login,
//BUT because I need the user and token available throughout the site
//I placed them here in my provider which is wrapped around the entire site.