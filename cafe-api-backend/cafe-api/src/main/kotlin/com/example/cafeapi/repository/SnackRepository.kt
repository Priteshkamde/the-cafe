package com.example.cafeapi.repository

import com.example.cafeapi.entity.Snack
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

/**
 * @author Pritesh
 */

@Repository
interface SnackRepository : MongoRepository<Snack, String>