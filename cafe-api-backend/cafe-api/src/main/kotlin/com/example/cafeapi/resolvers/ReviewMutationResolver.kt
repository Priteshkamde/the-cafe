package com.example.cafeapi.resolvers

import com.coxautodev.graphql.tools.GraphQLMutationResolver
import com.example.cafeapi.entity.Review
import com.example.cafeapi.repository.ReviewRepository
import org.springframework.stereotype.Component

/**
 * @author Pritesh
 */

@Component
class ReviewMutationResolver(val reviewRepository: ReviewRepository) : GraphQLMutationResolver {
    fun newReview(snackId: String, rating: Int, text: String) : Review {
        val review = Review(snackId, rating, text)
        reviewRepository.save(review)

        return review
    }
}