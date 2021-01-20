import React from 'react'
import {  Button, Card } from 'react-bootstrap'; 
import { jsPDF } from "jspdf";
import "jspdf-autotable";

import Order from './Order';

const cartCard = {
  borderRadius : 20,
}

const smallTextFontSpace = {
  letterSpacing: '2px',
}


function Cart(props) {

    let invoiceNumber = Math.round(Math.random() * 100)

    const { cartItems, onAddItemToCart, onRemoveItemFromCart } = props
    // console.log("cart page START");
    // console.log(cartItems);
    // console.log(cartItems.length);
    // console.log("cart page END");

    const itemsPrice = cartItems.reduce((accu, curr)=> accu + curr.amount * curr.qty, 0)
    const taxPrice = itemsPrice * 0.5;
    const shippingPrice = itemsPrice > 2000 ? 0 : 50
    const totalPrice = itemsPrice + taxPrice + shippingPrice

        
    const printPDF = (cartItems) => {
        // console.log("print purpose");
        // console.log(cartItems[0]);
        // console.log("print purpose END");

        var doc = new jsPDF();

        doc.setFont("courier");
        doc.text( 15, 10, 'The Cafe Invoice ');
        doc.text( 15, 20, `${invoiceNumber}`);
        var date = new Date();
        doc.setFontSize(10);
        doc.text( 15, 30, `${date}`);

        // Table 1
        const tableColumn = ["Name", "Qty", "Rate","Amount"];
        const tableRows = [];
        cartItems.forEach(cartItem => {
        const invoiceData = [
        cartItem.name,
        cartItem.qty,
        cartItem.amount,
        cartItem.qty*cartItem.amount,
        ];
        tableRows.push(invoiceData);
        });

        // Table 2
        const tableColumn2 = ["Items Price", "Tax Price", "Shipping Price","Total Price"];
        const tableRows2 = [];
        const priceData = [itemsPrice.toFixed(2), taxPrice.toFixed(2), shippingPrice.toFixed(2), totalPrice.toFixed(2)];
        tableRows2.push(priceData);

        // Add Table 1 & Table 2 to Doc & print both tables
        doc.autoTable(tableColumn, tableRows, { startY: 40 });
        doc.autoTable(tableColumn2, tableRows2, 
            { 
            endY: -40, 
            }
        );
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dayName = days[date.getDay()];
        doc.save(`invoice_${invoiceNumber}_${dayName}@${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.pdf`);
    }

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
                    <Card style={{...cartCard, ...smallTextFontSpace}}
                    className='shadow border-0 p-4 mt-4 bg-dark text-white'>
                    <Card.Body>
                        <h1 className='display-4'>Invoice # {invoiceNumber}</h1>

                        <hr />

                        <div>

                        <div> Items Price $ {itemsPrice.toFixed(2)}</div>
                        <div> Tax Price $ {taxPrice.toFixed(2)}</div>
                        <div> Shipping Price $ {shippingPrice.toFixed(2)}</div>

                        </div>
                        
                        <h1 className="mx-auto">Grand Total $ {totalPrice.toFixed(2)}</h1>
                        
                        <Button className="mt-4 mr-3" variant="light">
                            Place Order >
                        </Button>

                        <Button className="mt-4" variant="primary" onClick={() => printPDF(cartItems)}>
                            Print Order
                        </Button>

                    </Card.Body>
                    </Card>
                )
            }
                            
        </div>
    ) //return ends (LAST brace)
}

export default Cart
