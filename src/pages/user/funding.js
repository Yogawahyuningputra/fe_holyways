import React, { useContext, useState } from 'react';
import { Card, Col, Row, Container, Stack, Button, InputGroup, Form } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { API } from "../../config/api"
import { useNavigate } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar'
import Login from '../../components/auth/login';
import Register from '../../components/auth/register';
import { UserContext } from '../../context/userContext';


function Funding() {
    let navigate = useNavigate()

    const [login, setLogin] = useState(false)
    const [register, setRegister] = useState(false)

    const [state] = useContext(UserContext)
    const { data: Funding } = useQuery("FundingCache", async () => {
        const response = await API.get("/fundings")
        return response.data.data
    })
    const detailFunding = (id) => {
        navigate("/detail-funding/" + id)
    }

    const now = 90
    const formatIDR = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    })
    const [search, setSearch] = useState("")
    console.log("isi filter", search)
    return (
        <Container>
            <Card.Title className="fw-bold fs-1 mb-3 mt-5 text-center">Donate Now</Card.Title>
            <Col md={10}>

                <InputGroup className="d-flex justify-content-center mb-3 w-50 mt-2">
                    <Form.Control
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-secondary" id="button-addon2" onChange={e => { setSearch(e.target.value) }}>
                        Search
                    </Button>
                </InputGroup>
            </Col>

            <Row xs="3" className="d-flex justify-content-center gap-2">


                {Funding?.filter((value) => {
                    if (search === "") {
                        return value
                    } else if (value.title.toLowerCase().includes(search.toLocaleLowerCase())) {
                        return value
                    } else if (value.description.toLocaleLowerCase().includes(search.toLowerCase())) {
                        return value
                    }
                }).map((items) => (

                    <Col xs="4" id="donate" key={items?.id}
                        className="mt-3 mb-5"
                        style={{ width: "23rem", height: "auto" }}>
                        <Card className="shadow bg-white rounded">

                            <Card.Img src={items?.image} alt="images" className="p-2 " style={{ maxHeight: "15rem", borderRadius: "5px", }} />

                            < Card.Body className="py-1 px-2" >
                                <Col className="mt-1 text-secondary" style={{ position: "", width: "auto" }}>
                                    Author : {"  "}
                                    <label>{items?.user?.fullname}</label>
                                </Col>
                                <Col className="mb-1 mt-0 py-0 fs-5">
                                    {items?.title}
                                </Col>
                                <Col className="mb-1 mt-0 py-0">

                                    {items?.description}
                                </Col>
                                <ProgressBar variant="danger" now={now} label={`${now}%`} className="my-2" />
                                <Stack direction="horizontal">
                                    <Col className="text-dark fw-bold text-start">
                                        {formatIDR.format(items?.goals)}
                                    </Col>
                                    <Col className="text-secondary mb-2 mt-1">
                                        <Button variant="danger" className="text-light fw-bold w-100" onClick={() => { state.isLogin === false ? setLogin(true) : detailFunding(items?.id) }}>Donate</Button>
                                    </Col>
                                </Stack>
                            </Card.Body>
                        </Card>

                    </Col >
                ))}



            </Row >
            <Login
                show={login}
                onHide={() => setLogin(false)}
                toregister={() => { setLogin(false); setRegister(true) }}
                loginClose={setLogin}
            />
            <Register
                show={register}
                onHide={setRegister}
                tologin={() => { setRegister(false); setLogin(true) }}
            />
        </Container>

    );
}

export default Funding;