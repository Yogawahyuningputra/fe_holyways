import React, { useState, useEffect } from "react"
import { Container, Col, Card, Row, Button, Form, Stack, Modal } from 'react-bootstrap';
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { useNavigate, useParams } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar'
import moment from 'moment'

function DetailFunding() {

    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        money: '',
        funding_id: '',
    })

    const { id } = useParams()
    let { data: detailFunding } = useQuery("detailFunding", async () => {
        const response = await API.get("/funding/" + id)
        return response.data.data

    })
    let { data: Donations } = useQuery("Donations", async () => {
        const response = await API.get("/donationByFunding/" + id)
        return response.data.data

    })
    // console.log("isi fundingID", detailFunding)

    // ==========total donation===========//
    let total = 0;
    let count = Donations?.length

    for (let i = 0; i < Donations?.length; i++) {
        total += Donations[i]?.money;
    }
    // console.log("Total: " + total);

    let fundGoals = detailFunding?.goals
    let percent = (100 / fundGoals) * total;
    let now = Math.round(percent)

    // console.log("persentage", percent)

    const handleOnChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value,
        })
    }
    const handleDonation = async () => {
        try {
            const config = {
                headers: {
                    Authorization: "Basic " + localStorage.token,
                    "Content-Type": "multipart/form-data"
                }
            }
            const formData = new FormData()
            formData.set("money", form.money)
            formData.set("funding_id", detailFunding?.id)

            const response = await API.post("/donation", formData, config)

            const token = response.data.data.token
            // console.log("resp snap =>", response)

            window.snap.pay(token, {
                onSuccess: function (result) {
                    console.log(result)
                    navigate("/profile")
                },
                onPending: function (result) {
                    console.log(result)
                    navigate("/")
                },
                onError: function (result) {
                    console.log(result)
                },
                onClose: function () {
                    alert("you closed the popup without finishing the payment")
                },
            })


        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js"
        //change this according to your client-key
        const myMidtransClientKey = "SB-Mid-client-qHCTl1fy6TJrnF4-"

        let scriptTag = document.createElement("script")
        scriptTag.src = midtransScriptUrl
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey)

        document.body.appendChild(scriptTag)
        return () => {
            document.body.removeChild(scriptTag)
        }
    }, [])



    const formatIDR = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    })


    return (
        <>
            <Container className="my-4">
                <Row className="d-flex justify-content-center">
                    <Col >
                        <img src={detailFunding?.image} width="100%" className="rounded-2 mx-3 " alt="img" style={{ maxHeight: "22rem" }} />
                    </Col>
                    <Col >
                        <Col xs="4" className="mb-5 w-75 mx-5">

                            <Col className="mb-1 py-0 fs-5">
                                {detailFunding?.title}

                            </Col>

                            <Stack direction="horizontal" className="py-2">


                                <Col className="text-danger fw-bold text-start">
                                    {formatIDR.format(total)}
                                </Col>

                                <Col className="">Gathered from </Col>
                                <Col className="text-secondary fw-bold text-end">
                                    {formatIDR.format(detailFunding?.goals)}
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
                            <Col className="my-2" style={{ height: "10rem" }}>
                                {detailFunding?.description}
                            </Col>


                            <Col className="text-secondary mt-3">
                                {percent !== 100 ? (
                                    <Button variant="danger" className="text-light fw-bold w-100" onClick={() => setShow(true)}>Donate</Button>
                                ) : (
                                    <Button variant="danger" className="text-light fw-bold w-100" disabled>Donation Closed</Button>
                                )}
                            </Col>


                        </Col >
                    </Col>
                </Row>
                <Card.Text className="fs-4 fw-bold mx-3">
                    List Donation {"("} {count} {")"}
                </Card.Text>

                <Row className="d-flex justify-content-start w-100 mx-3 overflow-auto mb-5" style={{ height: "40vh" }}>
                    {Donations?.map((items, index) => (

                        <Col md={3} key={index} className="bg-white mt-3 rounded-2 mx-2" style={{ boxShadow: "0px 0px 5px black", backgroundColor: "white", width: "16rem" }}>
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

            </Container>

            <Modal show={show} onHide={setShow}
                size="sm p-1"
                aria-labelledby="contained-modal-title-center"
                centered
            >

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className="mb-3 fw-bold fs-5">Nominal Donation </Form.Label>
                            <Form.Control
                                type="number"
                                name="money"
                                placeholder="nominal donation"
                                autoFocus
                                onChange={handleOnChange}
                                value={form.money}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" className="w-100" onClick={handleDonation}>
                        Donation
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DetailFunding;
