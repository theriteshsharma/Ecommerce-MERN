import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, addCategory, deleteCategories } from "../../actions";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";


/**
 * @author
 * @function Category
 **/

const Category = (props) => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const [categoryName, setcategoryName] = useState("");
  const [parentId, setparentId] = useState("");
  const [categoryImage, setcategoryImage] = useState("");
  const [show, setShow] = useState(false);
  const [selectedCategory,setSelectedCategory] = useState([]);
  const handleClose = () => {

    setShow(false);
  };
  const handleaddCategory = ()=>{
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", parentId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setcategoryName('');
    setparentId('');
    setcategoryImage('');
    handleClose();
  }
  const handleShow = () => setShow(true);


  // const isChecked = (id)=> {
  
  // }
  const handleChecked = (e)=>{
    var updatedState = selectedCategory;
    var index = selectedCategory.indexOf(e.target.value);
    if(index > -1)
    updatedState.splice(index,1);
    else
    updatedState.push(e.target.value)
    setSelectedCategory(updatedState)
  }

  const handleDelete = () =>{
 
    dispatch(deleteCategories({arr: selectedCategory}));
    dispatch(getAllCategory())

  }

  const renderCategories = (categories) => {
    let categoryList = [];
    for (let category of categories) {
      categoryList.push(
        <li key={category.name}>
          <Form.Check
            type={`checkbox`}
            label={category.name}
            value={category._id}
            onChange={(e)=>{handleChecked(e)}}
            
          /> 
          {category.children && category.children.length > 0 ? (
            <ul> {renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }

    return categoryList;
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

  const categoryImageHandler = (e) => {
    setcategoryImage(e.target.files[0]);
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between", margin:"2rem 0" }}>
              <h3>Categories</h3>
              <div>
              <button onClick={handleDelete} className="btn btn-danger mr-2" >Delete</button>
              <button onClick={handleShow} className="btn  btn-primary">Add</button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form><ul>{renderCategories(category.categories)}</ul></Form>
          </Col>
        </Row>
      </Container>
      <Modal show={show} handleClose={handleClose} modalTitle={`Add Category`} handleSubmit={handleaddCategory}>
        <Input
          type="text"
          value={categoryName}
          placeholder="Category Name"
          onChange={(e) => {
            setcategoryName(e.target.value);
          }}
        />
        <select
          className="form-control"
          value={parentId}
          onChange={(e) => setparentId(e.target.value)}
        >
          <option>Select Option</option>
          {createOptionCategories(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          onChange={categoryImageHandler}
          name="categoryImage"
        ></input>
      </Modal>
    </Layout>
  );
};

export default Category;
