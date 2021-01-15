import './App.css';
import { useQuery, gql } from '@apollo/client';
import { Container, Button, Card, CardColumns, Spinner, Row, Col, Badge, Jumbotron } from 'react-bootstrap'; 

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

const snackCard = {
  borderRadius : 20,
}

const jumbotronGrad = { 
  color : 'black',
}

// const flame = {
//   color : 'black',
// }

const smallTextFontSpace = {
  letterSpacing: '2px',
}

const ratingFont = {
  fontSize : '1rem',
}

const bannerStyle = [
  'color: white', 
  'background: darkslateblue',
  'font-size: 3rem',
  'font-family: DejaVu Sans Mono, monospace',
].join(';');

function App() {

  const {loading, error, data} = useQuery(ALL_SNACKS);
  if (loading) { return <Spinner animation="border" variant="primary" /> }
  if (error) { return <code>Error... {error.message} </code> }
  
  // console.log(data);
  // console.log(data.snacks.length);
  // console.log(data.snacks[0].id);
  // console.log(data.snacks[0].name);
  // console.log(data.snacks[0].amount);
  // console.log(data.snacks[2].reviews);

  console.log('%c The Cafe !', 'color:white; background:darkslateblue; font-size: 3rem; font-family:DejaVu Sans Mono, monospace');
  console.log('%c << Checkout The Menu ', bannerStyle);

  let totalAmount = 0
  data.snacks.forEach(element => { totalAmount += element.amount });

  return (
    <Container fluid={true} className="">
      <Jumbotron className="bg-transparent" style={jumbotronGrad}>
        <h1 className="display-3 font-weight-bolder" style={{letterSpacing: '4px'}}>The Cafe API - Snacks</h1>
        <h2>We have {data.snacks.length} delicacies ~ worth $ {Math.round(totalAmount)}</h2>
      </Jumbotron>
      <br/ >
       <CardColumns className="">
        {
          data.snacks.map(item => 
            {
            return (
              <Card key={item.id} className="m-2 p-4 shadow border-0" style={snackCard}> 
                <h1 className="display-4">{item.name}</h1> 
                <Row className="">
                  <Col>
                    <h3> 
                      <Badge variant="success" style={smallTextFontSpace} className="float-left mt-2 p-3">$ {item.amount}</Badge>
                    </h3>
                      <Button variant="dark" className="float-right m-0"> Add </Button>
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
    </Container>
  );
}

export default App;
