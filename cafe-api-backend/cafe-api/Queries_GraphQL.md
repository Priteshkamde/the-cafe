## GraphQL Queries 

#### To add a Snack Item
````
mutation {
   newSnack(name: "Cheese Burger", amount: 77.5) {
     id
     name
     amount
   }
 }
````
#### To add a Review for Corresponding => Snack Item (link via <SNACK_ID>)
````
mutation {
     newReview(snackId:"<SNACK_ID>",
     text: "Salty & Crispy", rating:7
     ){
         snackId, text, rating
     }
}
````
#### To Get ALL snacks + Reviews
````
query {
   snacks {
     name,
     reviews {
       text, rating
     }
   }
 }
````

#### Update Snack amount
````
mutation {
     updateSnack(
       id:"<SNACK_ID>",
     	amount : 120.75
     ){
         id, name ,amount
     }
 }
````

#### Delete Snack
````
mutation {
   deleteSnack(id:"<SNACK_ID>")
}
````

#### Get all reviews of a Snack
````
query {
   thereviews(snackId : "<SNACK_ID>") {
     text
     rating
   }
}
````

> Reference [link](https://auth0.com/blog/building-graphql-apis-with-kotlin-spring-boot-and-mongodb/) 