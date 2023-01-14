import React, { useState } from "react";
import { Container, Form, Button, Card, Alert, Stack } from 'react-bootstrap';
import { useMutation } from "react-query";
import { API } from "../../config/api"

function FormFunding() {

    const [preview, setPreview] = useState(null)
    const [message, setMessage] = useState(null)

    const [funding, setFunding] = useState({
        title: '',
        goals: '',
        description: '',
        image: '',
    })
    // console.log(funding)

    const handleOnChange = (e) => {
        setFunding({
            ...funding, [e.target.name]:
                e.target.type === 'file' ? e.target.files : e.target.value
        })
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
        }
    }
    const handleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }
            const formData = new FormData()
            formData.set("title", funding.title)
            formData.set("goals", funding.goals)
            formData.set("description", funding.description)
            formData.set("image", funding.image[0])

            const response = await API.post("/funding", formData, config, funding)

            const alert = (<Alert variant='success' className='py-1'>
                Success
            </Alert>)
            setFunding({
                title: '',
                goals: '',
                description: '',
                image: '',
            })
            setMessage(alert)

            // console.log(formData)
        } catch (error) {
            const alert = (
                <Alert variant='danger' className="py-1">Failed</Alert>
            )
            setMessage(alert)
        }
    })

    return (
        <Container className="w-50 fw-bold bg-light rounded-2">


            <Form className="mx-5" style={{ marginTop: "110px" }} onSubmit={(e) => handleOnSubmit.mutate(e)}>
                <Form.Label className="text-start fw-bold fs-3 mb-5">Make Raise Fund</Form.Label>
                {message}
                <Form.Group controlId="formGridName" onChange={handleOnChange}>
                    <Form.Control name="title" type="text" placeholder="Title" style={{ backgroundColor: "#e1e1e1" }} />
                </Form.Group>


                {preview && (
                    <Card.Img
                        variant="bottom"
                        src={preview}
                        alt={preview}
                        style={{ width: "100px", height: "60px", marginTop: "10px" }}
                    />
                )}

                <Form.Control onChange={handleOnChange}
                    className="my-2 border-light"
                    style={{ borderColor: "#C32424", width: "100px" }}
                    type="file"
                    placeholder="Attachment Files"
                    name="image"
                    required
                />


                <Form.Group controlId="formGridName" onChange={handleOnChange}>
                    <Form.Control name="goals" type="text" placeholder="Goals" style={{ backgroundColor: "#e1e1e1" }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={handleOnChange}
                        as="textarea"
                        name="description"
                        placeholder="Leave a comment here"
                        style={{ height: '100px', backgroundColor: "#e1e1e1" }}
                    />
                </Form.Group>
                <div className='d-flex justify-content-end mt-5'>
                    <Button style={{ backgroundColor: "#C32424", marginBottom: "20px" }}
                        variant="danger"
                        className="w-50"
                        size="md"
                        type="submit"
                    >
                        Send
                    </Button>
                </div>
            </Form>

        </Container >

    )
}


export default FormFunding;