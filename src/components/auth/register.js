import React, { useState } from 'react'
import { Modal, Form, Button, Card, Alert } from "react-bootstrap"

import { useMutation } from 'react-query'
import { API } from '../../config/api'
import '../../App.css'
import Swal from 'sweetalert2'

function Register({ show, onHide, tologin }) {

    const [message, setMessage] = useState(null)

    const [user, setUser] = useState({

        fullname: '',
        email: '',
        password: '',
        phone: '',
        gender: '',
        address: '',
        role: 'user',

    })
    const handleOnChange = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value,
        })

    }


    const handleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
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

            const response = await API.post('/register', formData, user, config)
            console.log(response)

            if (response.data.code === 200) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Register has been saved',
                    showConfirmButton: false,
                    timer: 3000
                })

                setUser({
                    fullname: '',
                    email: '',
                    password: '',
                    gender: '',
                    phone: '',
                    address: '',
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',

            })
            console.log(error)
        }

    })

    return (
        <>
            <Modal
                show={show} onHide={onHide} tologin={tologin}
                size="sm p-1"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >


                <Card className="px-3 fw-bold border border-white">

                    <Form.Label className="fs-3 mt-0 mb-3 fw-bold text-center">
                        Register
                    </Form.Label>

                    {message}

                    <Form onSubmit={(e) => handleOnSubmit.mutate(e)} >
                        <Form.Group className="mb-3 scrollView" controlId="formBasic" style={{ height: '38vh', overflowY: 'scroll' }} >
                            <Form.Group className="mb-3" controlId="formBasicName" >
                                <Form.Label>Fullname</Form.Label>

                                <Form.Control
                                    className="py-1 fs-6"
                                    style={{ borderWidth: "2px", borderColor: "grey", backgroundColor: "#E5E5E5" }}
                                    type="text"
                                    placeholder="Fullname"
                                    name="fullname"
                                    onChange={handleOnChange}
                                    // value={user.fullname}
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
                                    // value={user.email}
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
                                    // value={user.password}
                                    required


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
                                    // value={user.phone}
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
                                    // value={user.address}
                                    required
                                />
                            </Form.Group>
                        </Form.Group>
                        <Button
                            variant="danger"
                            className="w-100 d-grid gap-2 fw-bold mt-3"
                            size="md"
                            type="submit"
                        >
                            Register
                        </Button>
                        <p className="mt-3 text-secondary">Don't have an account ? Klik <a href onClick={tologin} className="fw-bold text-dark text-decoration-none"> Here </a></p>

                    </Form>

                </Card>

            </Modal >
        </>
    )
}

export default Register;