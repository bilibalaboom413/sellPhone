import React from 'react'
import axios from 'axios'
class Homelist extends React.Component{
    state = {
        phones:[],
        soldout:[],
        bestseller:[]
    }
    constructor() {
        super();
        this.getSoldout()
        this.getBestseller()
    }
    getSoldout = async () =>{
        axios.get('http://localhost:8000/Soldout')
            .then( _d =>{
                this.setState({soldout: _d.data})
            })
    }
    getBestseller = async () =>{
        axios.get('http://localhost:8000/Bestseller')
            .then( _d =>{
                this.setState({bestseller: _d.data})
            })
    }

    render(){
        return(
            <div id='root'>
                <div id='SoldList'>
                    <table>
                        <thead>
                        <th>title</th>
                        <th>price</th>
                        <th></th>
                        </thead>
                        <tbody>
                            {this.state.soldout.map(soldout =>
                                <tr key={soldout._id}>
                                    <td>{soldout.title}</td>
                                    <td>{soldout.price}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div id='Bestseller'>
                    <table>
                        <thead>
                        <th>title</th>
                        <th>rating</th>
                        <th></th>
                        </thead>
                        <tbody>
                        {this.state.bestseller.map(bestseller =>
                            <tr key={bestseller._id}>
                                <td>{bestseller.title}</td>
                                <td>{bestseller.Ave_rating}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default Homelist;
