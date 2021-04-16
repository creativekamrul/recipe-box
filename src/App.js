import Axios from 'axios'
import React, {useEffect, useState} from "react";
import {Container, Row, Col, Form, Image, Card, Button, Modal, Spinner} from "react-bootstrap";
import NavBar from "./NavBar";

function App() {
  const [query, setQuery] =   useState('');
  const [ingList, setIngList]   =   useState([])
  const [showModal, setShowModal]   =   useState(false);
  const [recpUrl, setRecpUrl]   =   useState('')
  const [loading, setLoading]   =   useState(true)
  const openModal =  (list, recipeUrl) =>{
      setRecpUrl(recipeUrl)
      setIngList(list)
      setShowModal(true)
  }
  const closeModal =  () =>{
      setShowModal(false)
  }
  const [recipeData, setRecipeData]   =   useState([])
  const YOUR_APP_ID = `49402085`;
  const YOUR_APP_KEY = "60152c913c4a510d34864ab65aa4887d";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
  const getData = async (e)  => {
    e.preventDefault()
    var result = await Axios.get(url);
    setRecipeData(result.data.hits)
      if (!recipeData){
          setLoading(true)
      }
      setLoading(false)
    return result

  }
  var num = 0;
  return (
      <>
        <NavBar/>
        <Container className="mt-5">
        <Form onSubmit={getData} >
          <Row>
            <Col md="4"></Col>
            <Col md="4" className="d-flex">
              <Form.Control type="text" placeholder="Search Recipe" value={query} onChange={(e)=>setQuery(e.target.value)} />

              <button type="submit" className="btn btn-primary ml-4">Search</button>
            </Col>
            <Col md="4"></Col>
          </Row>
        </Form>
        </Container>
        <Container className="mt-5 main-content">
            <Row>
                <Col md="12">
                    <div className="text-center">
                        {loading?(
                            <Spinner animation="grow" />
                        ):''}
                    </div>
                </Col>
            </Row>
            <Row>

                {recipeData.map((item, index)=>{

                    const {recipe} = item;
                    const {label, image, url, source, calories, ingredientLines} = recipe;
                    return(

                            <Col md="4" key={calories}>
                                <Card className="mb-4 main-card">
                                    <Card.Img variant="top" src={image} />
                                    <Card.Body>
                                        <Card.Title>{label}</Card.Title>
                                        <Card.Text className="mb-3">
                                            {source}
                                        </Card.Text>
                                        <Button variant="primary" className="mr-3" onClick={()=> openModal(ingredientLines, url)}>Ingredients List</Button>
                                        <Button variant="primary" href={url} target="_blank">See Full Recipe</Button>
                                    </Card.Body>
                                </Card>
                            </Col>

                    )
                })}

                <Modal  aria-labelledby="contained-modal-title-vcenter"
                        centered show={showModal} onHide={closeModal} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>List Of Ingredients </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {

                            ingList.map((item)=>{
                                num++;
                                return(
                                    <p className="p-2" key={ingList.length+num}><b>{num}</b>-  {item}</p>
                                )
                            })
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                        <Button variant="primary" href={recpUrl} target="_blank">
                            See Full Recipe
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Row>

        </Container>
          <div className="footer">
              <Row className="text-center blockquote-footer">
                  <Col md="12"><p>Copyright @ Kamrul Islam | 2021</p></Col>
              </Row>
          </div>
      </>
  )
}
export default App
