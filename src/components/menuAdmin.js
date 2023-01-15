import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Logout from "../components/assest/images/logout.png";
import Raise from "../components/assest/images/raisefund.png";
import Profile from "../components/assest/images/iconuser.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const MenuUsers = ({ logout }) => {
    const [state] = useContext(UserContext)
    console.log(state)
    const navigate = useNavigate()
    return (
        <OverlayTrigger delay={{ show: 250, hide: 3000 }} placement="bottom" className="mt-1 py-1" overlay={

            <Popover id="popover-basic" style={{ width: "auto", height: "auto", fontWeight: "bold" }}>

                <Popover.Body className="mt-1 mb-1 py-1" onClick={() => navigate(`/admin/form`)}>
                    <img src={Raise} alt="" style={{ width: "30px", height: "30px", marginRight: "30px" }} />Make Raise
                </Popover.Body>

                <hr className="mt-1 mb-1 py-1" />
                <Popover.Body className="mt-1 mb-1 py-1" onClick={logout}>
                    <Nav.Link ><img src={Logout} alt="" style={{ width: "30px", height: "30px", marginRight: "30px" }} />Logout</Nav.Link>
                </Popover.Body>
            </Popover>
        }>
            <img src={Profile} alt="" style={{ width: "50px", height: "50px" }} className="rounded-circle" />
        </OverlayTrigger>

    );
}
export default MenuUsers;