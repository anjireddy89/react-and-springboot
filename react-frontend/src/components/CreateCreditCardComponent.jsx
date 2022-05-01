import React, { Component } from 'react'
import CreditCardService from '../services/CreditCardService';
const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;
class CreateCreditCardComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            cardNumber: '',
            limit: '',
            nameError: '',
            cardNumberError: '',
            limitError: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeCardNumberHandler = this.changeCardNumberHandler.bind(this);
        this.saveOrUpdateCreditCard = this.saveOrUpdateCreditCard.bind(this);
    }

    // step 3
    componentDidMount() {

        // step 4
        if (this.state.id === '_add') {
            return
        } else {
            CreditCardService.getCreditCardById(this.state.id).then((res) => {
                let creditcard = res.data;
                this.setState({
                    name: creditcard.name,
                    cardNumber: creditcard.cardNumber,
                    limit: creditcard.limit
                });
            });
        }
    }
    saveOrUpdateCreditCard = (e) => {
        e.preventDefault();
        let nameError = '';
        let cardNumberError = '';
        let limitError = '';

        if (!this.state.name) {
            nameError = "Name cannot be blank";
        }
        if (!this.state.cardNumber) {
           // cardNumberError = "Card Number cannot be blank";
            if (checkLuhn(this.state.cardNumber))
                cardNumberError = "This is a valid card";
            else
                cardNumberError = "This is not a valid card";
        }
        if (!this.state.limit) {
            limitError = "Limit cannot be blank";
        }



        if (cardNumberError || nameError || limitError) {
            this.setState({ limitError, cardNumberError, nameError });
            return false;
        }
        let credit = { name: this.state.name, cardNumber: this.state.cardNumber, limit: this.state.limit };
        console.log('credit => ' + JSON.stringify(credit));

        // step 5
        if (this.state.id === '_add') {
            CreditCardService.createCreditCard(credit).then(res => {
                console.log('credit => ' + JSON.stringify(credit));
                this.props.history.push('/');
            });
        } else {
            CreditCardService.updateCreditCard(credit, this.state.id).then(res => {
                this.props.history.push('/');
            });
        }
    }

    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    }

    changeCardNumberHandler = (event) => {
        // Validation with REGEX
        if (rx_live.test(event.target.value))
            this.setState({ cardNumber: event.target.value });
    }

    changeLimitHandler = (event) => {
        // Validation with REGEX
        if (rx_live.test(event.target.value))
            this.setState({ limit: event.target.value });
    }
    checkLuhn(cardNo) {
        let nDigits = cardNo.length;

        let nSum = 0;
        let isSecond = false;
        for (let i = nDigits - 1; i >= 0; i--) {

            let d = cardNo[i].charCodeAt() - '0'.charCodeAt();

            if (isSecond == true)
                d = d * 2;

            // We add two digits to handle
            // cases that make two digits
            // after doubling
            nSum += parseInt(d / 10, 10);
            nSum += d % 10;

            isSecond = !isSecond;
        }
        return (nSum % 10 == 0);
    }

    cancel() {
        this.props.history.push('/');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add CreditCard</h3>
        } else {
            return <h3 className="text-center">Update CreditCard</h3>
        }
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>  Name: </label>
                                        <input placeholder="First Name" name="firstName" className="form-control"
                                            value={this.state.name} onChange={this.changeNameHandler} />
                                    </div>
                                    <div style={{ fontSize: 12, color: "red" }}>
                                        {this.state.nameError}
                                    </div>
                                    <div className="form-group">
                                        <label> Card Number: </label>
                                        <input placeholder="CardNumber" name="lastName" className="form-control" maxLength={19} pattern="[0-9]*"
                                            value={this.state.cardNumber} onChange={this.changeCardNumberHandler} />
                                    </div>
                                    <div style={{ fontSize: 12, color: "red" }}>
                                        {this.state.cardNumberError}
                                    </div>
                                    <div className="form-group">
                                        <label> Limit: </label>
                                        <input placeholder="Limit" name="emailId" maxLength={4} className="form-control"
                                            value={this.state.limit} onChange={this.changeLimitHandler} />
                                    </div>
                                    <div style={{ fontSize: 12, color: "red" }}>
                                        {this.state.limitError}

                                    </div>
                                    <br></br>
                                    <button className="btn btn-success" onClick={this.saveOrUpdateCreditCard}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateCreditCardComponent
