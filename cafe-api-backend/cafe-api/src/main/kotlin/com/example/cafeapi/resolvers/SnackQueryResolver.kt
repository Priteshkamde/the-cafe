package com.example.cafeapi.resolvers

import com.coxautodev.graphql.tools.GraphQLQueryResolver
import com.example.cafeapi.entity.Review
import com.example.cafeapi.entity.Snack
import com.example.cafeapi.repository.SnackRepository
import org.springframework.data.mongodb.core.MongoOperations
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.stereotype.Component

/**
 * @author Pritesh
 */

@Component
class SnackQueryResolver (val snackRepository: SnackRepository, val mongoOperations : MongoOperations) :
        GraphQLQueryResolver {
            fun snacks(): List<Snack> {
                val list = snackRepository.findAll()
                for (item in list) {
                    item.reviews = getReviews(snackId= item.id)
                }
                return list
            }

            fun getReviews(snackId: String) : List<Review> {
                val query = Query()
                query.addCriteria(Criteria.where("snackId").`is`(snackId))
                return mongoOperations.find(query, Review::class.java)
            }
}