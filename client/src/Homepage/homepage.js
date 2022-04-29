import React from 'react'
import axios from 'axios'
import HomeList from './homelist'
import Info from './Info'
import Search from './search'
class Homepage extends React.Component{

    constructor() {
        super()
        this.state = {
            type: 0
        }
        this.content = [
            <HomeList/>,
            <Search/>,
            <Info/>
        ]
    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={() => this.setState({type: 0})}>home</button>
                    <button onClick={() => this.setState({type: 1})}>search</button>
                    <button onClick={() => this.setState({type: 2})}>information</button>
                </div>
                <div>
                    {
                        this.content[this.state.type]
                    }
                </div>
            </div>
        );
    }
}

export default Homepage;
