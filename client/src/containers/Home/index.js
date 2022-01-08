import React from "react";
import { Card, Button, Row, Col, Container, Dropdown , Navbar, DropdownButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addtocart } from "../../actions";
import Layout from "../../components/Layout";
import { imageUrl } from "../../urlconfig";
import './style.css'
function Home() {
    const products = useSelector((state) => state.product);
    const categories = useSelector((state) => state.category);
    const dispatch = useDispatch();

    console.log(products);
    const renderCategories = (categories) => {
        let categoryList = [];
        for (let category of categories) {
            categoryList.push(
                <li key={category.name}>
                    {category.name}
                    {category.children && category.children.length > 0 ? (
                        <ul> {renderCategories(category.children)}</ul>
                    ) : null}
                </li>
            );
        }
        return categoryList;
    }

    const handleAddToCart = (product,price) =>{
       const  _product = {
            product:product,
            price:price,
            quantity:1
        }
        dispatch(addtocart(_product))
        
    }








        const renderProductCards = (products) => {

            return products.map((item, index) =>
            <Col md={3}>
                <Card style={{ width: "100%", textAlign: "left" }} key={index}>
                        <Card.Header style={ {maxHeight:"280px",overflow:"hidden"}} >
                           <Card.Img src={imageUrl(item.productPictures[0].img)} variant="top"  />
                        </Card.Header>

                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <p>{item.description.slice(0, 99)}.....</p>
                                <div style={{display:"flex",justifyContent:"space-between", alignItems:"center"}}>
                                <h5>Rs.{item.price}</h5>

                                <Button onClick={(e) =>handleAddToCart(item._id,item.price)}>Add to cart</Button>
                                {/* <Button style={{marginLeft:"1rem"}}>Buy Now</Button> */}
                                </div>
                            </Card.Body>

                </Card>
            </Col>
            );
        };
        return (
            <Layout sidebar>
                <Navbar bg="light" expand="lg" style={{borderTop:"1px solid"}}>
                    
                        <Container>
                            <ul>
                                {renderCategories(categories.categories)}
                            </ul>
                        </Container>
                    </Navbar>
                <Row className={`p-5 `}>
                    {renderProductCards(products.products)}
                </Row>
            </Layout>
        );
    }

    export default Home;
