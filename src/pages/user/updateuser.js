import React, { useContext, useState } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { API } from '../../config/api';
import { UserContext } from '../../context/userContext';
import { Swal } from 'sweetalert2/dist/sweetalert2';
export default function UpdateUser({ show, onHide }) {

    const [state] = useContext(UserContext)
    const [preview, setPreview] = useState(null)
    const [message, setMessage] = useState(null)
    const [user, setUser] = useState({

        fullname: '',
        email: '',
        password: '',
        phone: '',
        gender: '',
        address: '',
        image: '',

    })
    // console.log(user)
    const handleOnChange = (e) => {
        setUser({
            ...user, [e.target.name]:
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
                    "Content-type": "multipart/form-data"
                }
            }
            const formData = new FormData()
            formData.set("fullname", user.fullname)
            formData.set("email", user.email)
            formData.set("password", user.password)
            formData.set("gender", user.gender)
            formData.set("phone", user.phone)
            formData.set("address", user.address)
            formData.set("role", user.role)
            formData.set("image", user.image[0])
            const response = await API.patch("/user", formData, config)

            const alert = (
                <Alert variant="success" className='py-1'>Update Success</Alert>
            )
            setMessage(alert)
            setUser({
                fullname: '',
                email: '',
                password: '',
                phone: '',
                gender: '',
                address: '',
                image: '',
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',

            })
        }
    })





    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Your Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => handleOnSubmit.mutate(e)} >

                        <Form.Group className="mb-3 scrollView fw-bold" controlId="formBasic" style={{ height: '38vh', overflowY: 'scroll' }} >
                            {message}
                            <Form.Group className="mb-3" controlId="formBasicName" >
                                <Form.Label>Fullname</Form.Label>

                                <Form.Control
                                    className="py-1 fs-6"
                                    style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }}
                                    type="text"
                                    placeholder="Fullname"
                                    name="fullname"
                                    onChange={handleOnChange}
                                    defaultValue={state.user.fullname}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email </Form.Label>

                                <Form.Control
                                    className="py-1 fs-6"
                                    style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }}
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    onChange={handleOnChange}
                                    defaultValue={state.user.email}
                                    required

                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password </Form.Label>

                                <Form.Control
                                    className="py-1 fs-6"
                                    style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }}
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleOnChange}
                                    defaultValue={state.user.password}


                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicGender">
                                <Form.Label>Gender </Form.Label>
                                <Form.Select className="py-1 fs-6 text-secondary" type="number" name='gender' style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }} onChange={handleOnChange} required>

                                    <option hidden>Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>

                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPhone">
                                <Form.Label>Phone </Form.Label>
                                <Form.Control
                                    className="py-1 fs-6"
                                    style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }}
                                    type="text"
                                    placeholder="Phone"
                                    name="phone"
                                    onChange={handleOnChange}
                                    defaultValue={state.user.phone}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicAddress">
                                <Form.Label>Address </Form.Label>

                                <Form.Control
                                    className="py-1 fs-6"
                                    style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }}
                                    type="text"
                                    placeholder="Address"
                                    name="address"
                                    onChange={handleOnChange}
                                    defaultValue={state.user.address}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Upload Files</Form.Label>
                                <Form.Control type="file" name="image" style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }} onChange={handleOnChange} />
                            </Form.Group>
                            {preview && (
                                <img src={preview} alt={preview} style={{ width: "15rem" }} defaultValue={state?.user?.image} />

                            )}

                        </Form.Group>
                        <Button
                            variant="danger"
                            className="w-100 d-grid gap-2 fw-bold mt-3"
                            size="md"
                            type="submit"
                        >
                            Save
                        </Button>


                    </Form>

                </Modal.Body>

            </Modal>
        </>
    );
}

