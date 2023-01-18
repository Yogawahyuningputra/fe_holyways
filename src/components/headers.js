import React, { useState, useContext } from "react"
import Container from 'react-bootstrap/Container';
import { Navbar, Button } from 'react-bootstrap';
import Holyways from "./assest/images/holyways.svg"
import Login from '../components/auth/login'
import Register from '../components/auth/register'
import MenuUser from "./menuUser";
import MenuAdmin from "./menuAdmin";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useQuery } from "react-query";
import { API } from "../config/api";
const Swal2 = withReactContent(Swal)
function Headers() {
    const [state, dispatch] = useContext(UserContext)

    let { data: userNavs } = useQuery("usernavs", async () => {
        const response = await API.get(`/user/${state.user.id}`)
        return response.data.data
    })
    console.log(userNavs?.image)


    const navigate = useNavigate()

    const [login, setLogin] = useState(false)
    const [register, setRegister] = useState(false)

    const logout = (() => {
        Swal2.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes '
        })
            .then((result) => {
                if (result.isConfirmed) {
                    dispatch({
                        type: "LOGOUT_SUCCESS"
                    })
                    navigate("/")
                    Swal.fire(
                        'Logout!',
                        'Your account has been logout.',
                        'success'
                    )
                }
            })
    })
    return (
        <>

            <Navbar style={{ backgroundColor: "#C32424" }} className="navbar fixed-top">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={Holyways}
                            width="85"
                            height="60"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>

                    <Navbar.Brand>
                        {state.isLogin === true ? (
                            <Navbar.Brand>
                                {state.user.role === "admin" ? (

                                    <MenuAdmin logout={logout} />

                                ) : (

                                    <MenuUser logout={logout} img={userNavs?.image} />

                                )}
                            </Navbar.Brand>
                        ) : (
                            <Navbar.Brand>
                                <Button variant="outline-white" className='text-white fw-bold px-4' onClick={() => setLogin(true)} >Login</Button>

                                <Button variant="light" className="text-danger mx-2 fw-bold" onClick={() => setRegister(true)}>Register</Button>
                            </Navbar.Brand>
                        )}
                    </Navbar.Brand>

                </Container>
                <Login
                    show={login}
                    onHide={() => setLogin(false)}
                    toregister={() => { setLogin(false); setRegister(true) }}
                    loginClose={setLogin}
                />
                <Register
                    show={register}
                    onHide={setRegister}
                    tologin={() => { setRegister(false); setLogin(true) }}
                />
            </Navbar>
        </>
    );
}

export default Headers;