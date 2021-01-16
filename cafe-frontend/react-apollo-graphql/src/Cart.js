import React from 'react'
import {  Button, Card } from 'react-bootstrap'; 

const cartCard = {
  borderRadius : 20,
}

const smallTextFontSpace = {
  letterSpacing: '2px',
}

function Cart(props) {

    let invoiceNumber = Math.round(Math.random() * 100)

    const { cartItems, onAddItemToCart, onRemoveItemFromCart } = props
    console.log("cart page START");
    console.log(cartItems);
    console.log(cartItems.length);
    console.log("cart page END");

    const itemsPrice = cartItems.reduce((accu, curr)=> accu + curr.amount * curr.qty, 0)
    const taxPrice = itemsPrice * 0.5;
    const shippingPrice = itemsPrice > 2000 ? 0 : 50
    const totalPrice = itemsPrice + taxPrice + shippingPrice

    return (
        <div>
            {
                cartItems.length === 0 && <h2>Cart Empty</h2>
            }
            <br />
            {
            cartItems.map((item) => (
            <div>
                <Card key={item.id} style={cartCard} className="shadow border-0 p-1 mb-2">
                <Card.Body style={smallTextFontSpace} 
                className="font-weight-bold justify-content-around">
                    {item.name}
                    <p>{item.qty} x $ {item.amount.toFixed(2)}</p>
                    <p className="float-right m-0">

                    <Button className="font-weight-bolder mt-2 mr-3" variant="primary" 
                        onClick={() => onAddItemToCart(item)}> 
                        + 
                    </Button>

                    <Button className="font-weight-bolder mt-2" variant="dark"
                        onClick={() => onRemoveItemFromCart(item)}>
                        - 
                    </Button>
                    </p>
                </Card.Body>
                </Card>
            </div>
            ))
            }   
                {
                    cartItems.length!==0 && 
                    (
                        <Card style={cartCard} 
                        className='shadow border-0 p-4 mt-4 bg-dark text-white'>
                        <Card.Body>
                            <h2>Invoice # {invoiceNumber}</h2>

                            <hr />

                            <div> Items Price $ {itemsPrice.toFixed(2)}</div>
                            <div> Tax Price $ {taxPrice.toFixed(2)}</div>
                            <div> Shipping Price $ {shippingPrice.toFixed(2)}</div>

                            <h1 className="mx-auto">Grand Total $ {totalPrice.toFixed(2)}</h1>
                            
                            <Button className="mt-4" variant="light">
                                Place Order >
                            </Button>
                        </Card.Body>
                        </Card>
                    )
            
                }
                            
        </div>
    ) //return ends (LAST brace)
}

export default Cart
