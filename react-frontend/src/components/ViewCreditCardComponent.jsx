import React, { Component } from 'react'
import CreditCardService from '../services/CreditCardService'

class ViewCreditCardComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            creditcard: {}
        }
    }

    componentDidMount(){
        CreditCardService.getCreditCardById(this.state.id).then( res => {
            this.setState({creditcard: res.data});
        })
    }
    back(){
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View CreditCard Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Name: </label>
                            <div> { this.state.creditcard.name }</div>
                        </div>
                        <div className = "row">
                            <label> Card Number: </label>
                            <div> { this.state.creditcard.cardNumber }</div>
                        </div>
                        <div className = "row">
                            <label> Card Limit: </label>
                            <div> { this.state.creditcard.limit }</div>
                        </div>
                        <button className="btn btn btn-dark" onClick={this.back.bind(this)} style={{marginLeft: "10px"}}>Back</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewCreditCardComponent
