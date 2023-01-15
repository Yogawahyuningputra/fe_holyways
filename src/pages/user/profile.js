import React, { useContext, useState } from "react"
import { Container, Row, Stack, Card, Button, Col, Badge } from "react-bootstrap"
import Img from "react-bootstrap/Image";
import { dataContext } from "../../App";
import User from "../../components/assest/images/user.png"
import Gender from "../../components/assest/images/gender.png"
import Phone from "../../components/assest/images/phone.png"
import Mail from "../../components/assest/images/mail.png"
import Address from "../../components/assest/images/address.png"
import ProfileUser from "../../components/assest/images/profileuser.png"
import UpdateUser from "./updateuser";
import { UserContext } from "../../context/userContext"
import { useQuery } from "react-query";
import { API } from "../../config/api";
import moment from 'moment'
import '../../App.css'


export default function Profile() {
    const [update, setUpdate] = useState(false);

    const [state] = useContext(UserContext)
    const { data: History } = useQuery("historyCache", async () => {
        const response = await API.get("/donationByUser")
        return response.data.data
    })
    // console.log("history", History)
    const formatIDR = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    })
    return (
        <Container className="d-flex justify-content-start w-100">

            <Col md={6} className="text-start mt-4">
                <Card.Text style={{ fontWeight: "bold", fontSize: "25px" }}>My Profile</Card.Text>
                <Row className="p-2 my-3 rounded-3" style={{ boxShadow: "0px 0px 5px black", backgroundColor: "white" }}>

                    <Col>
                        <Stack direction="horizontal" gap={5} className="mb-2">

                            <Img src={User} style={{ width: "30px", height: "30px" }} />

                            <Stack direction="vertical">
                                <Card.Text style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "0px" }}>{state.user.fullname}</Card.Text>
                                <Card.Text style={{ fontSize: "14px", color: "#8A8C90" }}>Fullname</Card.Text>
                            </Stack>
                        </Stack>
                        <Stack direction="horizontal" gap={5} className="mb-2">

                            <Img src={Mail} style={{ width: "30px", height: "30px" }} />

                            <Stack direction="vertical">
                                <Card.Text style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "0px" }}>{state.user.email}</Card.Text>
                                <Card.Text style={{ fontSize: "14px", color: "#8A8C90" }}>Email</Card.Text>
                            </Stack>
                        </Stack>
                        <Stack direction="horizontal" gap={5} className="mb-2">
                            <Img src={Gender} style={{ width: "30px", height: "30px" }} />

                            <Stack direction="vertical">
                                <Card.Text style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "0px" }}>{state.user.gender}</Card.Text>
                                <Card.Text style={{ fontSize: "14px", color: "#8A8C90" }}>Gender </Card.Text>
                            </Stack>
                        </Stack>
                        <Stack direction="horizontal" gap={5} className="mb-2">
                            <Img src={Phone} style={{ width: "30px", height: "30px" }} />

                            <Stack direction="vertical">
                                <Card.Text style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "0px" }}>{state.user.phone}</Card.Text>
                                <Card.Text style={{ fontSize: "14px", color: "#8A8C90" }}>Phone </Card.Text>
                            </Stack>
                        </Stack>

                        <Stack direction="horizontal" gap={5} className="mb-1">

                            <Img src={Address} style={{ width: "30px", height: "30px" }} />

                            <Stack direction="vertical">
                                <Card.Text style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "0px" }}>{state.user.address}</Card.Text>
                                <Card.Text style={{ fontSize: "14px", color: "#8A8C90" }}>Address</Card.Text>
                            </Stack>
                        </Stack>

                    </Col>
                    <Col md={4} className="mt-2">
                        <Img className="rounded-3 "
                            src={state.user.image}
                            style={{
                                width: "100%",
                                height: "auto",

                            }}
                        />
                        {/* <Button className="mb-1 mt-3 fw-bold" variant="warning" style={{ color: "white" }} onClick={() => setShow(true)}>Change Photo Profile</Button> */}
                        <Button className="mb-1 mt-3 fw-bold w-100" variant="danger" style={{ color: "white" }} onClick={() => setUpdate(true)}>Change Profile</Button>

                    </Col>
                    <UpdateUser
                        show={update}
                        hide={() => {
                            setUpdate(false)
                        }}


                    />

                </Row>

            </Col >
            <Col md={4} className="mx-5 w-50">
                <Card.Text className="mx-3 fs-3 fw-bold mt-3 ">
                    List Donation
                </Card.Text>
                <Col className="mx-2 col-lg-11 overflow-auto scrollView" style={{ height: '54vh' }} >
                    {History?.map((items, index) => (

                        <Col className="mx-3 rounded-3" style={{ boxShadow: "0px 0px 5px black", backgroundColor: "white" }}>
                            <Card.Text className="mx-2 fw-bold fs-5 my-1">
                                {items?.user?.fullname}
                            </Card.Text>
                            <Card.Text className="mx-2 fw-bold">
                                {moment(items?.created_at).format("DD MMMM YYYY")}
                            </Card.Text>
                            <Row>
                                <Col sm={7} className="mx-2 text-start">{formatIDR.format(items?.money)}</Col>
                                <Col sm={4} className="text-end mx-1 mb-2">
                                    {items?.status === "success" ?
                                        <Badge className="bg-success"> Finished</Badge> :
                                        items?.status !== "success" ?
                                            <Badge className="bg-danger">{items?.status}</Badge> :
                                            null
                                    }</Col>
                            </Row>
                        </Col>
                    ))}

                </Col>
            </Col>
            <UpdateUser
                show={update}
                onHide={setUpdate}

            />
        </Container >
    )
}