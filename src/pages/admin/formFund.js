import React, { useState } from "react";
import { Container, Form, Button, Card, } from 'react-bootstrap';
import { useMutation } from "react-query";
import { API } from "../../config/api"
import Swal from 'sweetalert2'
import { RotatingLines } from 'react-loader-spinner'

<RotatingLines
    strokeColor="grey"
    strokeWidth="5"
    animationDuration="0.75"
    width="96"
    visible={true}
/>


function FormFunding() {

    const [preview, setPreview] = useState(null)

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

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            })
            setFunding({
                title: '',
                goals: '',
                description: '',
                image: '',
            })
            e.target.reset()

            // console.log(formData)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',

            })
        }
    })

    return (
        <Container className="w-50 fw-bold rounded-2 shadow mb-5">


            <Form className="mx-5 mt-1" onSubmit={(e) => handleOnSubmit.mutate(e)}>
                <Form.Label className="text-start fw-bold fs-3 my-3">Make Raise Fund</Form.Label>

                <Form.Group controlId="formGridName" onChange={handleOnChange}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="title" type="text" placeholder="Title" style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }} autoFocus />
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
                    className="my-3 border-grey"
                    style={{ width: "100px", borderWidth: "2px", borderColor: "grey", }}
                    type="file"
                    placeholder="Attachment Files"
                    name="image"
                    required

                />


                <Form.Group controlId="formGridName" onChange={handleOnChange}>
                    <Form.Label>Goals</Form.Label>
                    <Form.Control name="goals" type="text" placeholder="Goals" style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={handleOnChange}
                        as="textarea"
                        name="description"
                        placeholder="Leave a comment here"
                        style={{ height: '100px', backgroundColor: "#e1e1e1", borderWidth: "2px", borderColor: "grey", }}
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