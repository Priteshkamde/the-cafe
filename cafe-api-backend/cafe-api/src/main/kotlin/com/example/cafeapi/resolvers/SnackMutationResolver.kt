package com.example.cafeapi.resolvers

import com.coxautodev.graphql.tools.GraphQLMutationResolver
import com.example.cafeapi.entity.Snack
import com.example.cafeapi.repository.SnackRepository
import org.springframework.stereotype.Component
import java.util.*

/**
 * @author Pritesh
 */

@Component
class SnackMutationResolver( val snackRepository: SnackRepository) : GraphQLMutationResolver {

    fun newSnack(name: String, amount: Float) : Snack {
        val snack = Snack(name, amount)
        snack.id = UUID.randomUUID().toString()
        snackRepository.save(snack)
        return snack
    }

    fun deleteSnack(id: String) : Boolean {
        snackRepository.deleteById(id)
        return true
    }

    fun updateSnack(id: String, name: String , amount: Float) : Snack {
        val snack = snackRepository.findById(id)
        snack.ifPresent{
            it.name = name
            it.amount = amount
            snackRepository.save(it)
        }
        return snack.get()
    }
}