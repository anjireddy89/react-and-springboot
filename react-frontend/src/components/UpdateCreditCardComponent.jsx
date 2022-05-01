import React, { Component } from 'react'
import CreditCardService from '../services/CreditCardService';

class UpdateCreditCardComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            cardNumber: '',
            limit: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeCardNumberHandler = this.changeCardNumberHandler.bind(this);
        this.changeLimitHandler = this.changeLimitHandler.bind(this);
        this.updateCreditCard = this.updateCreditCard.bind(this);
    }

    componentDidMount(){
        CreditCardService.getCreditCardById(this.state.id).then( (res) =>{
            let creditcard = res.data;
            this.setState({name: creditcard.name,
                cardNumber: creditcard.cardNumber,
                limit : creditcard.limit
            });
        });
    }

    updateCreditCard = (e) => {
        e.preventDefault();
        let creditcatrd = {name: this.state.name, cardNumber: this.state.cardNumber, limit: this.state.limit};
        console.log('creditcatrd => ' + JSON.stringify(creditcatrd));
        console.log('id => ' + JSON.stringify(this.state.id));
        CreditCardService.updateCreditCard(creditcatrd, this.state.id).then( res => {
            this.props.history.push('/creditcards');
        });
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeCardNumberHandler= (event) => {
        this.setState({cardNumber: event.target.value});
    }

    changeLimitHandler= (event) => {
        this.setState({limit: event.target.value});
    }

    cancel(){
        this.props.history.push('/creditcard');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update CreditCard</h3>
                                <div className = "card-body">
                                    <form>
                                        dgasga
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateCreditCardComponent
