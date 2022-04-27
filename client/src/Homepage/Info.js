import React from 'react'
import axios from 'axios'
class Info extends React.Component{
    state = {
        phones:[],
        commentInput:'',
        ratingInput:5,
    }
    constructor() {
        super();
        const query = window.location.search.substring(1);
        const vars = query.split("&");
        for (let i=0; i<vars.length; i++) {
            const pair = vars[i].split("=");
            if(pair[0] === "bookId"){
                this.state.bookid = pair[1]
            }
            if(pair[0] === "userId"){
                this.state.userid = pair[1]
            }
        }
        this.getInfo();
    }
    getInfo = async () =>{
        const {bookid} = this.state;
        console.log(bookid)
        axios.get('http://localhost:8000/phoneinfo',{
            params:{
                "id":bookid,
            }
        })
            .then( _d =>{
                this.setState({phones: _d.data})
                console.log(_d.data)
            })

    }
    addReview = async () =>{
        const {bookid,userid,commentInput,ratingInput} = this.state;
        axios.get('http://localhost:8000/addreview',{
            params:{
                "id":bookid,
                "userId":userid,
                "rating":ratingInput,
                "comment":commentInput
            }
        })
            .then( _d =>{
                this.getInfo()
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
                <h2></h2>
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
