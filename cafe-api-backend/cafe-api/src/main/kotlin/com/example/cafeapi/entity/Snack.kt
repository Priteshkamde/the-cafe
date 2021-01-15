package com.example.cafeapi.entity

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

/**
 * @author Pritesh
 */

@Document(collection = "snack")
data class Snack(
        var name: String,
        var amount: Float
){
    @Id
    var id: String = ""

    @Transient
    var reviews: List<Review> = ArrayList()
}