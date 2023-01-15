import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { API } from '../../config/api';

export default function UpdateFund(props) {
    const { show, onHide, selectData } = props
    console.log("isi select props", selectData)
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
            const response = await API.patch(`/funding/${selectData.id}`, config)
            alert("suksessss bro")
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

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                name="title"
                            // defaultValue={selectData.title}
                            // onChange={handleOnChange}

                            />
                        </Form.Group><Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Goals</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Goals"
                                name="goals"
                            // defaultValue={selectData.goals}
                            // onChange={handleOnChange}

                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                // defaultValue={selectData.description}
                                name="description"
                            // onChange={handleOnChange}

                            />
                        </Form.Group>

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
