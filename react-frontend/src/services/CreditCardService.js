import axios from 'axios';

const CREDITCARD_API_BASE_URL = "http://localhost:4455/api/v1/creditcards";

class CreditCardService {

    getCreditCard(){
        return axios.get(CREDITCARD_API_BASE_URL);
    }

    createCreditCard(creditcard){
        return axios.post(CREDITCARD_API_BASE_URL, creditcard);
    }

    getCreditCardById(creditCardId){
        return axios.get(CREDITCARD_API_BASE_URL + '/' + creditCardId);
    }

    updateCreditCard(creditcatrd, creditCardId){
        return axios.put(CREDITCARD_API_BASE_URL + '/' + creditCardId, creditcatrd);
    }

    deleteCreditCard(creditCardId){
        return axios.delete(CREDITCARD_API_BASE_URL + '/' + creditCardId);
    }
}

export default new CreditCardService()