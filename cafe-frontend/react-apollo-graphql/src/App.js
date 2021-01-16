import './App.css';
import { useState } from 'react'; 
import { useQuery, gql } from '@apollo/client';
import { Container, Button, Spinner, Badge, Jumbotron, Row, Col } from 'react-bootstrap'; 
import ProductPage from './ProductPage'
import Cart from './Cart'
const ALL_SNACKS = gql
`
query {
  snacks {
    id, 
    name,
    amount,
    reviews {
      snackId,
      text, 
      rating
    }
  }
}
`;

// const snackCard = {
//   borderRadius : 20,
// }

// const cardSectionVertical = {
//   borderRadius : 20,
// }

const jumbotronGrad = { 
  color : 'black',
}

// const smallTextFontSpace = {
//   letterSpacing: '2px',
// }

// const ratingFont = {
//   fontSize : '1rem',
// }

// const bannerStyle = [
//   'color: white', 
//   'background: darkslateblue',
//   'font-size: 3rem',
//   'font-family: DejaVu Sans Mono, monospace',
//].join(';');

function App() {
  

  const [ cartItems, setCartItems ] = useState([])

  // Fetch from GraphQL => store in 'data'
  const {loading, error, data} = useQuery(ALL_SNACKS);
  if (loading) { return <Spinner animation="border" variant="primary" /> }
  if (error) { return <code>Error... {error.message} </code> }

  // Add To Cart
  const onAddItemToCart = (product) => {
    const exist = cartItems.find(x => x.id===product.id)
    console.log(exist);
    
    if (exist) {
      setCartItems(cartItems.map(x => x.id===product.id 
      ? // already present
        { ...exist, qty : exist.qty + 1 }
      : 
        x
      ))
    } else { // new product to be added, so qty set to one
      setCartItems([...cartItems, {...product, qty : 1}])
    }
  };

  // Remove From Cart
  const onRemoveItemFromCart = (product) => {
    const exist = cartItems.find(x => x.id===product.id)
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id!==product.id))
    } else {
      setCartItems(cartItems.map((x)=>x.id===product.id 
        ?
          { ...exist, qty : exist.qty - 1 }
        :
          x 
      ))
    }
  };

  // console.log(data);
  // console.log(data.snacks.length);
  // console.log(data.snacks[0].id);
  // console.log(data.snacks[0].name);
  // console.log(data.snacks[0].amount);
  // console.log(data.snacks[2].reviews);

  // console.log('%c The Cafe !', 'color:white; background:darkslateblue; font-size: 3rem; font-family:DejaVu Sans Mono, monospace');
  // console.log('%c << Checkout The Menu ', bannerStyle);

  let totalAmount = 0
  data.snacks.forEach(element => { totalAmount += element.amount });

  return (
    <Container fluid={true} className="">
      <Jumbotron className="bg-transparent" style={jumbotronGrad}>
        <h1 className="display-3 font-weight-bolder" style={{letterSpacing: '4px'}}>The Cafe API - Snacks</h1>
        <h2>We have {data.snacks.length} delicacies ~ worth $ {Math.round(totalAmount)}</h2>

        <Button variant="dark" size="lg" className="float-right"> 
          Cart 
          <Badge variant="light" className="mx-3 px-3">
            {cartItems.length}
          </Badge> 
        </Button>
      </Jumbotron>

      <br/ >
      <Row className="justify-content-center">
      
      <Col xs={12} sm={12} md={12} lg={8}>
      <ProductPage 
        products={data} 
        onAddItemToCart={onAddItemToCart}
      />
      </Col>
      
      <Col xs={12} sm={12} md={12} lg={4} 
      // className='bg-light border-0'
      // style={cardSectionVertical}
      >
      <h1 className="display-4 text-center pb-3"> Order Summary </h1>
      <Cart 
        cartItems={cartItems} 
        onAddItemToCart={onAddItemToCart}
        onRemoveItemFromCart={onRemoveItemFromCart}
      />
      </Col>
      
      </Row>
    </Container>
  )
}

export default App;
