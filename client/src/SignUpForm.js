import React from 'react'
import styled from 'styled-components'
import { withDataProvider } from './DataProvider';

const FormContainer = styled.form`
    display: flex;
    flex-flow: column;
    justify-content: center;
    border: 1px solid black;
    padding: 50px;
    width: 200px;
    margin: auto;
`

const Input = styled.input`
    display: block; 
    margin-top: 20px; 
`

const Header = styled.h3`
    margin: auto;
`

const Button = styled.button`
    margin-top: 20px; 
`

const Toggle = styled.p`
    &:hover{cursor: pointer}
`

const Error = styled.p`
    display: block;
    color: red;
`

class SignUpForm extends React.Component {
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            toggle: true,
            errMsg: "",
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    clearInputs = () => {
        this.setState({
            username: "",
            password: "",
            toggle: true,
            errMsg: "",
        })
    }

    handleSignup = e => {
        e.preventDefault()
        this.props.signup(this.state)
            .then(() => {
                this.clearInputs()
                this.props.history.push('/placeships')
            })
            .catch(err => {
                console.log(err)
                this.setState({errMsg: err.response.data.errMsg})
        })
    }

    handleLogin = e => {
        e.preventDefault()
        this.props.login(this.state)
        .then(() => {
            this.clearInputs()
            // this.props.history.push('/placeships')
        })
        .catch(err => {
            this.setState({errMsg: err.response.data.errMsg})
    })
    }

    handleToggle = () => {
        this.setState(ps => ({toggle: !ps.toggle, username: "", password: "", errMsg: ""}))
    }
    
    render(){

        return (
            <>
            {this.state.toggle ?
            <>
            <FormContainer onSubmit={this.handleSignup}>
                <Header>Sign Up</Header>
                <Input 
                    type="text" 
                    placeholder="username" 
                    name="username" 
                    value={this.username} 
                    onChange={this.handleChange}>
                </Input>
                <Input 
                    placeholder="password" 
                    name="password" 
                    value={this.password} 
                    onChange={this.handleChange}>
                </Input>
                <Button>Sign Up</Button>
                <Toggle onClick={this.handleToggle}>Have an account? Log in.</Toggle>
            </FormContainer>
            <Error>{this.state.errMsg}</Error>
            </>
            :

            <>
            <FormContainer onSubmit={this.handleLogin}>
            <Header>Log In</Header>
            <Input 
                type="text" 
                placeholder="username" 
                name="username" 
                value={this.username} 
                onChange={this.handleChange}>
            </Input>
            <Input 
                placeholder="password" 
                name="password" 
                value={this.password} 
                onChange={this.handleChange}>
            </Input>
            <Button>Log In</Button>
            <Toggle onClick={this.handleToggle}>Don't have an account? Sign up.</Toggle>
            </FormContainer>
            <Error>{this.state.errMsg}</Error>
            </>
            }
            </>
        )
    }
}

export default withDataProvider(SignUpForm)

//make this stateful to make it a controlled component