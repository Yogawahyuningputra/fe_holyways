import React, { useContext } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap';
import IconRight from "../../components/assest/images/iconhome.png"
import IconLeft from "../../components/assest/images/iconhome2.png"
import Funding from './funding';
import { DataContext } from '../../context/dataContext';
function Homepage() {
    const data = useContext(DataContext)
    console.log("data", data)
    return (

        <>
            <div>
                <Row>
                    <Row style={{ backgroundColor: "#C32424", minHeight: "30rem" }}>
                        <Col md={{ span: 7, offset: 1 }} className="text-light">
                            <Card.Text
                                style={{ fontSize: "45px", marginTop: 20, alignContent: "justify" }}>
                                While you are still standing, try to reach out to the people who are falling.
                            </Card.Text>
                            <Card.Text className="fs-6 my-3">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </Card.Text>
                            <a href='#donate'>
                                <Button variant="light" className="text-danger mx-2 fw-bold w-25  mb-5">Donate Now</Button>
                            </a>
                        </Col>
                        <Col md={2} className="mx-5">
                            <img src={IconRight} width="379vh" height="550vh" className="mt-5 rounded-2 mx-4" alt="img" style={{ marginBottom: "-10rem" }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 4, offset: 0 }}>
                            <img src={IconLeft} width="380vh" height="550" className="rounded-2" alt="img" style={{ position: "absolute", marginTop: "-5rem" }} />
                        </Col>

                        <Col md={{ span: 6, offset: 2 }} className="mx-0" style={{ marginTop: "9rem" }}>
                            <Col className="fw-bold fs-1 ">
                                Your donation is very helpful for people affected by forest fires in Kalimantan.
                            </Col>
                            <Row>
                                <Col direction="vertical" className="fs-6 mt-3">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </Col>
                                <Col direction="vertical" className="fs-6 mt-3 ">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                </Col>
                            </Row>

                        </Col>

                    </Row>
                </Row>

                {/* component card funding */}
                <Funding />

            </div>


        </>
    );
}

export default Homepage;
