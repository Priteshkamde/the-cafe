package com.example.cafeapi.entity

import org.springframework.data.mongodb.core.mapping.Document

/**
 * @author Pritesh
 */

@Document( collection = "review")
data class Review(
        var snackId: String,
        var rating: Int,
        var text: String
)