package com.example.cafeapi.resolvers

import com.coxautodev.graphql.tools.GraphQLQueryResolver
import com.example.cafeapi.entity.Review
import org.springframework.data.mongodb.core.MongoOperations
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.stereotype.Component

/**
 * @author Pritesh
 */

@Component
class ReviewQueryResolver(val mongoOperations: MongoOperations) : GraphQLQueryResolver {

    fun thereviews(snackId : String) : List<Review> {
        val query = Query()
        query.addCriteria(Criteria.where("snackId").`is`(snackId))

        return mongoOperations.find(query, Review::class.java)
    }
}