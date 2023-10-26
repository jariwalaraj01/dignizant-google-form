import React from 'react'
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const NavComponent = () => {
    return (
        <div>
            <Nav className="justify-content-center mt-3" variant="tabs" defaultActiveKey="/">
                <Nav.Item>
                    <NavLink className="nav-link" to="/admin/form">Form</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink className="nav-link" to="/admin/answer">Answer</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink className="nav-link" to="/">Preview</NavLink>
                </Nav.Item>
            </Nav>
        </div>
    )
}

export default NavComponent