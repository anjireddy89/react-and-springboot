package com.creditCard.test.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.creditCard.test.exception.ResourceNotFoundException;
import com.creditCard.test.model.CreditCard;
import com.creditCard.test.repository.CreditCardRepository;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping(value = "/api/v1")
public class CreditCardController {

	@Autowired
	private CreditCardRepository cardRepository;

	@GetMapping("/creditcards")
	public List<CreditCard> getAllCreditCardDetails() {
		return cardRepository.findAll();
	}

	// Save Credit Details rest api
	@PostMapping("/creditcards")
	public CreditCard createCardDetails(@RequestBody CreditCard  card) {

		return cardRepository.save(card);

	}
	// get Creditcard by id rest api
		@GetMapping("/creditcards/{id}")
		public ResponseEntity<CreditCard> getCreditCardById(@PathVariable Long id) {
			CreditCard card = cardRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("CreditCard not exist with id :" + id));
			return ResponseEntity.ok(card);
		}
		
		// update Creditcard rest api
		
		@PutMapping("/creditcards/{id}")
		public ResponseEntity<CreditCard> updateCreditCard(@PathVariable Long id, @RequestBody CreditCard cardDetails){
			CreditCard card = cardRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("CreditCard not exist with id :" + id));
			
			card.setName(cardDetails.getName());
			card.setCardNumber(cardDetails.getCardNumber());
			card.setLimit(cardDetails.getLimit());
			
			CreditCard updatedEmployee = cardRepository.save(card);
			return ResponseEntity.ok(updatedEmployee);
		}
		
		// delete Creditcard rest api
		@DeleteMapping("/creditcards/{id}")
		public ResponseEntity<Map<String, Boolean>> deleteCreditCard(@PathVariable Long id){
			CreditCard card = cardRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("CreditCard not exist with id :" + id));
			
			cardRepository.delete(card);
			Map<String, Boolean> response = new HashMap<>();
			response.put("deleted", Boolean.TRUE);
			return ResponseEntity.ok(response);
		}
		

}
