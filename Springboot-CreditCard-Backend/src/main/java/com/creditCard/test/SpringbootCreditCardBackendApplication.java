package com.creditCard.test;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@EntityScan("com.creditCard.test.model")
@SpringBootApplication
public class SpringbootCreditCardBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootCreditCardBackendApplication.class, args);
	}

}
