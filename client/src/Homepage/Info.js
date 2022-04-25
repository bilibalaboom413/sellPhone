import React from 'react'
import axios from 'axios'
class Info extends React.Component{
    state = {
        phones:[],
        userid:'',
        commentInput:'',
        ratingInput:5
    }
    constructor() {
        super();
        this.getInfo()
    }

    getInfo = async () =>{
        axios.get('http://localhost:8000/phoneinfo',{
            params:{
                "id":"6250e6359f8462b01e143956",
            }
        })
            .then( _d =>{
                this.setState({phones: _d.data})
                console.log(_d.data)
            })
    }
    addReview = async () =>{
        const {commentInput,ratingInput} = this.state;
        axios.get('http://localhost:8000/addreview',{
            params:{
                "id":"6250e6359f8462b01e143956",
                "userId":"5f5237a4c1beb1523fa3da05",
                "rating":ratingInput,
                "comment":commentInput
            }
        })
            .then( _d =>{
                this.setState({phones: _d.data})
            })
    }
    handleGetComment = (event) => {
        this.setState({
            commentInput : event.target.value
        })
    };
    handleGetRating = (event) => {
        this.setState({
            ratingInput: event.target.value
        })
    };


    render(){
        return(
            <div id='root'>
                    <table>
                        <thead>
                        <th>title</th>
                        <th>brand</th>
                        <th>image</th>
                        <th>stock</th>
                        <th>seller</th>
                        <th>price</th>
                        </thead>
                        <tbody >
                        {this.state.phones.map(phone =>
                            <tr key={phone._id}>
                                <td>{phone.title}</td>
                                <td>{phone.brand}</td>
                                <td>{phone._id}</td>
                                <td>{phone.stock}</td>
                                <td>{phone.seller}</td>
                                <td>{phone.price}</td>

                            </tr>
                        )}
                        </tbody>
                    </table>
                <table>
                    <thead>
                    <th>reviewes</th>
                    </thead>
                    <tbody >
                    {this.state.phones.map(phone =>
                        <tr key={phone._id}>
                            {phone.reviews.map(review =>
                            <tr>

                                <td>{review.reviewer}</td>

                                <td>{review.rating}</td>

                                <td>{review.comment}</td>
                            </tr>
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>
                <div>
                    <input
                        type="text"
                        placeholder="Search by name"
                        value = {this.state.commentInput}
                        onChange={this.handleGetComment}
                    />
                    <select
                        value={this.state.ratingInput}
                        onChange={this.handleGetRating}>
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </select>
                <input type="button" onClick={this.addReview}  value="add review"/>
                </div>
            </div>
        )
    }
}
export default Info;
