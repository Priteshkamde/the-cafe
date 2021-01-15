package com.example.cafeapi.repository

import com.example.cafeapi.entity.Review
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

/**
 * @author Pritesh
 */

@Repository
interface ReviewRepository : MongoRepository<Review, String>