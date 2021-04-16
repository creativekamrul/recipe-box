import React from "react";
import {Navbar} from "react-bootstrap";

function NavBar() {
    return(
        <>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand>
                    <a href="/" className="logo"><h2>Recipe Box</h2></a>
                </Navbar.Brand>
            </Navbar>
        </>
    )
}
export default NavBar