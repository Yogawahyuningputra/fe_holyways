import React from 'react'
import { Container, Col, Card, Row, Stack, Button, ProgressBar } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { API } from '../../config/api'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default function DataFunding() {
    let navigate = useNavigate()
    let { data: myFunding } = useQuery("myFunding", async () => {
        const response = await API.get("/fundingByUser")
        return response.data.data

    })
    // console.log("funding", myFunding)
    const formatIDR = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    })
    const now = 50
    let ID = 0
    if (myFunding?.length !== 0) {
        myFunding?.map((element) => (
            ID = element.id

        ))

    }
    const handleDelete = async () => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })
                .then((result) => {

                    if (result.isConfirmed) {

                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                })
            await API.delete(`/funding/` + ID);
            alert("sucess")
        } catch (error) {
            console.error(error);
        }
    }



    return (

        <Container>
            <Card.Title className="fw-bold fs-1 mb-3 text-start mt-5">My Raise Funding</Card.Title>

            <Button variant="danger" className="text-light fw-bold mt-2" onClick={() => navigate(`/form`)}>Make Raise fund</Button>

            <Row xs="3" className="d-flex justify-content-center gap-2">


                {myFunding?.map((items) => (
                    <Col xs="4" key={items?.id}
                        className="mt-5 mb-5"
                        style={{ width: "22rem", height: "auto", position: "relative" }}
                    >
                        <Card >

                            <Card.Img variant="top" src={items?.image} alt="images" className="p-2" style={{ maxHeight: "15rem", }} />
                            < Card.Body className="py-1 px-2" >

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
                                    <Col className="text-secondary mb-2">
                                        <Button variant="danger" className="text-light fw-bold w-100" onClick={handleDelete} >DELETE</Button>
                                    </Col>
                                </Stack>
                            </Card.Body>

                        </Card>

                    </Col >

                ))}

            </Row >
        </Container>
    )
}