import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Badge, Button, Col, Container, Row, Table } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct } from "../../actions";
import Modal from "../../components/UI/Modal";
import { imageUrl } from "../../urlconfig";

function Product(props) {
  const category = useSelector((state) => state.category);
  const products = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [pictures, setPictures] = useState([]);

  const [productDetailsModal, setProductDetailsModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const addproduct = () =>{
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("category", categoryId);
    for (let pic of pictures) {
      form.append("productPictures", pic);
    }
    console.log(form);
    dispatch(addProduct(form));
    setName('')
    setPrice('')
    setQuantity('')
    setDescription('')
    setCategoryId('')
    setPictures([])
    handleClose();
  }
  const handleShow = () => setShow(true);

  const imageHandler = (e) => {
    setPictures([...pictures, e.target.files[0]]);
    console.log(pictures);
  };

  const createOptionCategories = (categories, option = []) => {
    for (let category of categories) {
      option.push({
        value: category._id,
        name: category.name,
      });
      if (category.children && category.children.length > 0)
        createOptionCategories(category.children, option);
    }
    return option;
  };

  const closeProductDetials = () => {
    setProductDetailsModal(false);
  };
  const showProductModel = (product) => {
    setProductDetails(product);
    setProductDetailsModal(true);
  };

  const renderProductModal = () => {
    if (!productDetails) return null;
    return (
      <Modal
        modalTitle={`Detials`}
        show={productDetailsModal}
        handleClose={closeProductDetials}
      >
        <Row>
          <Col md={12}>
            <b>Name</b>
            <p>{productDetails.name}</p>
          </Col>
          <Col md={12}>
            <p>
              {productDetails.productPictures != undefined &&
                productDetails.productPictures.map((pic) => (
                  <img src={imageUrl(pic.img)} alt="picture" height="100px" style={{padding:".5rem"}}/>
                ))}
            </p>
          </Col>
          <Col md={12}>
            <b>Description</b>
            <p>{productDetails.description}</p>
          </Col>
          <Col md={6}>
            <b>Price</b>
            <p>{productDetails.price}</p>
          </Col>
          <Col md={6}>
            <b>Quantity</b>
            <p>{productDetails.quantity}</p>
          </Col>
          <Col md={6}>
            <b>Category</b>
            <p>
              <Badge pill variant="dark">
                {productDetails.category.name}
              </Badge>
            </p>
          </Col>
        </Row>
      </Modal>
    );
  };



  const renderProductTable = (products) => {
    console.log(products)
    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Qunatity</th>
            <th>category</th>
            <th>delete</th>

          </tr>
        </thead>
        <tbody>
          {products.map((product,index) =>{
            return (
              <tr >
              <td>{index}</td>
              <td key={index} onClick={() => showProductModel(product)}>{product.name}</td>
              <td>Rs. {product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.category && product.category.name}</td>
              <td><button onClick={()=>{dispatch(deleteProduct({id:product._id}))}} className="btn btn-sm btn-danger">delete</button></td>
            </tr>
            ) 
          })}
          
        </tbody>
      </Table>
    );
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Product</h3>
              <button onClick={handleShow}>add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              { renderProductTable(products.products) }
            </div>
          </Col>
        </Row>
      </Container>

      {renderProductModal()}

      <Modal show={show} handleClose={handleClose} modalTitle={`Add Product`} handleSubmit={addproduct}>

        <Input
          label={`Name`}
          type={`text`}
          value={name}
          placeholder={`Product Name`}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          label={`Description`}
          type={`text`}
          value={description}
          placeholder={`Product Description`}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <Input
          label={`Price`}
          type={`text`}
          value={price}
          placeholder={`Product Price`}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <Input
          label={`Quantity`}
          type={`text`}
          value={quantity}
          placeholder={`Product Quantity`}
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>Select Option</option>
          {createOptionCategories(category.categories).map((option) => (
            <option key={option._id} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {pictures.length > 0
          ? pictures.map((img, index) => <li key={index}>{img.name}</li>)
          : null}
        <input type="file" onChange={imageHandler}></input>
      </Modal>
    </Layout>
  );
}

export default Product;
