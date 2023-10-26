import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserFormThunk } from '../redux/slice/userForm'
import { Card, Button, Container, Form, Table, Modal } from 'react-bootstrap'
import moment from 'moment'

const AdminAnswer = () => {

    const dispatch = useDispatch()
    const userFormList = useSelector(state => state.userForm)?.list
    const [formData, setFormData] = useState({})

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(getAllUserFormThunk())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleViewForm = (data) => {
        setFormData(data)
        handleShow()
    }

    return (
        <div>
            <Container>
                <Table className="mt-5" bordered hover responsive="sm">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>User Name</th>
                            <th>Created at</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userFormList.length ?
                            userFormList.map((data, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{data.name}</td>
                                    <td>{moment(data.created_at).format("DD-MM-YYYY")}</td>
                                    <td>
                                        <Button variant="primary" onClick={e => handleViewForm(data)}>View</Button>
                                    </td>
                                </tr>
                            )
                            :
                            <tr>
                                <td colSpan={4} className="text-center">No record found</td>
                            </tr>
                        }

                    </tbody>
                </Table>


                {/* Modal */}

                <Modal size='lg' centered show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Form Result</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h2 className='text-center mb-3'>{formData.name}</h2>
                        <Form>
                            <div className='d-flex justify-content-center align-items-center flex-column gap-3'>
                                {
                                    formData?.questionData?.map((data, i) =>
                                        <Card key={i} className="w-100">
                                            <Card.Body>
                                                <p>{data.question} <span className='text-danger'>{data.required ? "*" : ""}</span></p>
                                                <div className='mt-3'>
                                                    {data.type === "textbox" &&
                                                        <Form.Control type="text" disabled placeholder="Enter Answer" required={data.required} value={data?.answer ?? ""} />
                                                    }
                                                    {(data.type === "radio" || data.type === "checkbox") &&
                                                        <div className='d-flex flex-column gap-3'>
                                                            {data?.options?.map((value, j) =>
                                                                <div key={j}>
                                                                    <Form.Check
                                                                        disabled
                                                                        type={data.type}
                                                                        name={data.question}
                                                                        id={`${value.value}`}
                                                                        label={value.value}
                                                                        checked={value.value === data.answer || data?.answer?.includes(value.value) || false}
                                                                    // onChange={() => handleUpdateValue("answer", value.value, i)}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    }
                                                    {
                                                        data.type === "dropdown" &&
                                                        <Form.Select value={data?.answer ?? ""} disabled>
                                                            <option value="">Open this select menu</option>
                                                            {data?.options?.map((value, j) =>
                                                                <option key={j} value={value.value}>{value.value}</option>
                                                            )}
                                                        </Form.Select>
                                                    }
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    )}
                            </div>
                        </Form >
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>




            </Container >
        </div >
    )
}

export default AdminAnswer