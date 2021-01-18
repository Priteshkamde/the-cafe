import React, { useState } from 'react'
import { Button, Card, CardColumns, Row, Col, Badge, Toast } from 'react-bootstrap'; 

const snackCard = {
  borderRadius : 20,
}

const smallTextFontSpace = {
  letterSpacing: '2px',
}

const ratingFont = {
  fontSize : '1rem',
}

function ProductPage(props) {
    const { products, onAddItemToCart } = props
    
    const [show, setShow] = useState(false);

    return (
    <>
    
    {/* <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide
      style={{ position: 'absolute', top : 0, right : 0}}
      >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Cafe API</strong>
            <small>1 seconds ago</small>
          </Toast.Header>
          <Toast.Body>Item Added</Toast.Body>
    </Toast> */}

       <CardColumns className="">
        {
          products.snacks.map(item => 
            {
            return (
              <Card key={item.id} className="m-2 p-4 shadow border-0" style={snackCard}> 
                <h1 className="display-4">{item.name}</h1> 
                <Row className="">
                  <Col>
                    <h3> 
                      <Badge variant="success" style={smallTextFontSpace} className="float-left mt-2 p-3">$ {item.amount}</Badge>
                    </h3>
                      <Button variant="dark" className="float-right m-0"
                      onClick={() => { onAddItemToCart(item); setShow(true); }}>
                      Add 
                      </Button>
                  </Col>
                </Row>
                <hr />
                      {
                        item.reviews.map(reviewsObject => 
                            <Row className="font-weight-bolder" style={smallTextFontSpace} key={reviewsObject.snackId+reviewsObject.text}>
                              <Col>
                                <p>
                                  <Badge variant="danger" style={ratingFont} className="ml-auto mr-3 p-3">{reviewsObject.rating}</Badge>
                                  {reviewsObject.text}
                                </p>
                              </Col>
                            </Row>  
                        )
                      }

              </Card>
            );
            }
          )
        }
      </CardColumns>

    </>
    )
}

export default ProductPage
