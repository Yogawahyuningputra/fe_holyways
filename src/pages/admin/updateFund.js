import React, { useState } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { API } from '../../config/api';
import Swal from 'sweetalert2'

export default function UpdateFund(props) {
    const { show, onHide, selectData, onSaves } = props
    console.log("isi select props", selectData)
    const [message, setMessage] = useState(null)
    const [preview, setPreview] = useState()
    const [fund, setFund] = useState({
        title: '',
        goals: '',
        description: '',
        image: '',

    })

    const handleOnChange = (e) => {
        setFund({
            ...fund, [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value
        })
        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
        }
    }
    const handleOnSubmit = useMutation(async (e) => {
        if (fund.image === "") {
            Swal.fire('Please Choose Images')
        }
        try {
            e.preventDefault()
            const config = {
                headers: {
                    "Content-Type": "application/form-data"
                }
            }
            const formData = new FormData()
            formData.set("title", fund.title)
            formData.set("goals", fund.goals)
            formData.set("description", fund.description)
            formData.set("image", fund.image[0])
            const response = await API.patch(`/funding/${selectData.id}`, formData, config)
            const alert = (
                <Alert variant="success" className='py-1'>Update Success</Alert>
            )
            setMessage(alert)
            onHide()
            onSaves()
            // alert("suksessss bro")
        } catch (error) {
            alert("errorrrrrrrr")
        }
    })


    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Your Raising</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => handleOnSubmit.mutate(e)} >
                        {message}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }}
                                type="text"
                                placeholder="Title"
                                name="title"
                                // defaultValue={selectData.title}
                                onChange={handleOnChange}
                                onFocus

                            />
                        </Form.Group><Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Goals</Form.Label>
                            <Form.Control style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }}
                                type="number"
                                placeholder="Goals"
                                name="goals"
                                // defaultValue={selectData.goals}
                                onChange={handleOnChange}

                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }}
                                // defaultValue={selectData.description}
                                name="description"
                                onChange={handleOnChange}

                            />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload Files</Form.Label>
                            <Form.Control type="file" name="image" style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }} onChange={handleOnChange} />
                        </Form.Group>
                        {preview && (
                            <img src={preview} alt={preview} style={{ width: "15rem" }} />

                        )}

                        <Modal.Footer>
                            <Button variant="danger"
                                type="submit"
                            >
                                Save Changes
                            </Button>
                        </Modal.Footer>

                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}
