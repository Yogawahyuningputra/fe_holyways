import React from 'react'
import { Container, Col, Card, Row, Stack, Button, ProgressBar } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { API } from '../../config/api'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useNavigate } from 'react-router-dom'


export default function DataFunding() {
    const navigate = useNavigate()
    let { data: dataFunding, refetch: refetchFund } = useQuery("dataFunding", async () => {
        const response = await API.get("/fundings")
        return response.data.data

    })
    console.log("funding", dataFunding)



    const formatIDR = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    })
    // let ID = 0
    // if (dataFunding !== null) {
    //     dataFunding?.map((element) => (
    //         ID = element.id

    //     ))

    // }
    // console.log("Id", ID)
    let { data: Donationss } = useQuery("Donationss", async () => {
        const response = await API.get("/donations")
        return response.data.data

    })
    // console.log("datadons", Donationss)
    // ==========total donation===========//
    // let total = 0;
    // let count = Donationss?.length

    // for (let i = 0; i < Donationss?.length; i++) {
    //     total += Donationss[i]?.money;
    // }
    // console.log("Total: " + count);

    // let fundGoals = dataFunding?.goals
    // let percent = (100 / fundGoals) * total;
    // let now = Math.round(percent)

    let now = 0


    const handleDelete = (itemId) => {

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
                .then(async (result) => {

                    if (result.isConfirmed) {
                        await API.delete(`/funding/${itemId}`)
                        refetchFund()
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                })

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',

            })
        }
    }

    // function untuk mengambil id dari map berdasarkan params
    const handleClick = (itemId) => {
        navigate(`/detail-funding/${itemId}`)
    }
    return (

        <Container>
            <Card.Title className="fw-bold fs-1 mb-3 text-center mt-2">Data Raise Funding</Card.Title>
            <Row xs="3" className="d-flex justify-content-center gap-2">

                {dataFunding?.map((items) => (

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
                                {/* <ProgressBar variant="danger" now={now} label={`${now}%`} className="my-2" /> */}
                                <Col className="text-dark fw-bold text-start">
                                    {formatIDR.format(items?.goals)}
                                </Col>
                                <Stack direction="horizontal">

                                    <Col className="text-secondary mb-2 d-flex justify-content-center">
                                        <Button variant="danger" className="text-light fw-bold w-75" onClick={() => handleDelete(items.id)}>DELETE</Button>
                                    </Col>
                                    <Col className="text-secondary mb-2 d-flex justify-content-center">
                                        <Button variant="danger" className="text-light fw-bold w-75" onClick={() => handleClick(items.id)}>VIEW</Button>
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