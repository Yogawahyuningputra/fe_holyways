import React, { useState, useContext } from "react"
import { Container, Col, Card, Row, Button, Form, Stack, Modal } from 'react-bootstrap';
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { useNavigate, useParams } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar'
import moment from 'moment'
import { DataContext } from "../../context/dataContext";
function MyFundingDetail() {

    const data = useContext(DataContext)
    console.log("viewData", data)
    // const navigate = useNavigate()
    const [show, setShow] = useState(false);


    const { id } = useParams()
    let { data: ViewFund } = useQuery("viewfundCache", async () => {
        const response = await API.get(`/funding/${id}`)
        return response.data.data

    })
    // console.log("viewdonate", ViewFund)

    let { data: DonationView } = useQuery("DonationView", async () => {
        const response = await API.get(`/donationByFunding/${id}`)
        return response.data.data

    })

    let { data: donationPending } = useQuery("DonationPending", async () => {
        const response = await API.get(`/donationPending/${id}`)
        return response.data.data

    })
    // console.log("isi donations pending", donationPending)

    // // ==========total donation===========//
    let total = 0;
    let count = DonationView?.length
    let count2 = donationPending?.length

    for (let i = 0; i < DonationView?.length; i++) {
        total += DonationView[i]?.money;
    }
    // console.log("Total: " + total);

    let fundGoals = ViewFund?.goals
    let percent = (100 / fundGoals) * total;
    let now = Math.round(percent)

    const formatIDR = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    })

    // let now = 90
    return (
        <>
            <Container className="my-4">
                <Row className="d-flex justify-content-center">
                    <Col >
                        <img src={ViewFund?.image} width="100%" className="rounded-2 mx-4 " alt="img" style={{ maxHeight: "22rem" }} />
                    </Col>
                    <Col >
                        <Col xs="4" className="mb-5 w-75 mx-5">

                            <Col className="mb-1 py-0 fs-5">
                                {ViewFund?.title}

                            </Col>

                            <Stack direction="horizontal" className="py-2">


                                <Col className="text-danger fw-bold text-start">
                                    {formatIDR.format(total)}
                                </Col>

                                <Col className="">Gathered from </Col>
                                <Col className="text-secondary fw-bold text-end">
                                    {formatIDR.format(ViewFund?.goals)}
                                </Col>
                            </Stack>

                            <ProgressBar variant="danger" now={now} label={`${now}%`} />

                            <Stack direction="horizontal">
                                <Col className="text-dark fw-bold text-start mt-2">
                                    {count} donation
                                </Col>
                                <Col className="text-dark fw-bold text-end mt-2">

                                    150 more day
                                </Col>
                            </Stack>
                            <Col className="my-2" style={{ height: "9rem" }}>
                                {ViewFund?.description}
                            </Col>


                            <Col className="text-secondary mt-3">

                                <Button variant="danger" className="text-light fw-bold w-100" onClick={() => setShow(true)}>Donate</Button>


                            </Col>


                        </Col >
                    </Col>
                </Row>
                <Card.Text className="fs-4 fw-bold mx-3">
                    List Donation {"("} {count} {")"}
                </Card.Text>

                <Row className="d-flex justify-content-start w-100 mx-3 overflow-auto mb-5" style={{ height: "28vh" }}>
                    {DonationView?.map((items, index) => (

                        <Col md={3} className="bg-white mt-3 rounded-2 mx-2" style={{ boxShadow: "0px 0px 5px black", backgroundColor: "white", width: "16rem" }}>
                            <Card.Text className="fw-bold fs-5 py-0">
                                {items?.user?.fullname}
                            </Card.Text>
                            <Card.Text className="fw-bold py-0">
                                {moment(items?.created_at).format("DD MMMM YYYY")}
                            </Card.Text>
                            <Card.Text className="text-danger fs-5 mb-2">
                                {formatIDR.format(items?.money)}
                            </Card.Text>
                        </Col>

                    ))}

                </Row>
                <Card.Text className="fs-4 fw-bold mx-3">
                    List Donation Has Not Been Approve {"( "} {count2} {" )"}
                </Card.Text>

                <Row className="d-flex justify-content-start w-100 mx-3 overflow-auto mb-5" style={{ height: "28vh" }}>
                    {donationPending?.map((data, index) => (

                        <Col md={3} className="bg-white mt-3 rounded-2 mx-2" style={{ boxShadow: "0px 0px 5px black", backgroundColor: "white", width: "16rem", height: "auto" }}>
                            <Card.Text className="fw-bold fs-5 py-0">
                                {data?.user?.fullname}
                            </Card.Text>
                            <Card.Text className="fw-bold py-0">
                                {moment(data?.created_at).format("DD MMMM YYYY")}
                            </Card.Text>
                            <Card.Text className="text-danger fs-5 mb-2">
                                {formatIDR.format(data?.money)}
                            </Card.Text>
                        </Col>

                    ))}

                </Row>

            </Container>

            <Modal show={show} onHide={setShow}
                size="md p-1"
                aria-labelledby="contained-modal-title-center"
                centered
            >

                <Modal.Body>
                    <Col>
                        INI MODAL VIEW DONATIONS
                    </Col>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default MyFundingDetail;
