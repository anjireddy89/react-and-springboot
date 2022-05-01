import React, { Component } from 'react'
import CreditCardsService from '../services/CreditCardService'

class ListCreditCardComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            creditcards: []
        }
        this.addCreditCard = this.addCreditCard.bind(this);
        this.editCreditCard = this.editCreditCard.bind(this);
        this.deleteCreditCard = this.deleteCreditCard.bind(this);
    }

    deleteCreditCard(id) {
        CreditCardsService.deleteCreditCard(id).then(res => {
            this.setState({ creditcards: this.state.creditcards.filter(creditcard => creditcard.id !== id) });
        });
    }
    viewCreditCard(id) {
        this.props.history.push(`/view-creditcard/${id}`);
    }
    editCreditCard(id) {
        this.props.history.push(`/add-creditcard/${id}`);
    }

    componentDidMount() {
        CreditCardsService.getCreditCard().then((res) => {
            this.setState({ creditcards: res.data });
        });
    }

    addCreditCard() {
        this.props.history.push('/add-creditcard/_add');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">CreditCard List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addCreditCard}> Add CreditCard</button>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th>  Name</th>
                                <th>  CardNumber</th>
                                <th> Limit</th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.creditcards.map(
                                    card =>
                                        <tr key={card.id}>
                                            <td> {card.name} </td>
                                            <td> {card.cardNumber}</td>
                                            <td> {card.limit}</td>
                                            <td>
                                                <button onClick={() => this.editCreditCard(card.id)} className="btn btn-info">Update </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteCreditCard(card.id)} className="btn btn-danger">Delete </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.viewCreditCard(card.id)} className="btn btn-info">View </button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}

export default ListCreditCardComponent
