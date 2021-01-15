package com.example.cafeapi

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class CafeApiApplication

fun main(args: Array<String>) {
	runApplication<CafeApiApplication>(*args)
}
