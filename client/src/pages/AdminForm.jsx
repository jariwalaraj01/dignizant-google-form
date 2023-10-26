import React, { useState } from 'react'
import { useEffect } from 'react'
import { Card, Button, Container, Form, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { formThunk, getFormThunk } from '../redux/slice/form'

const initialValue = [{
    question: "",
    type: "textbox",
    required: false,
    options: [{
        value: ""
    }]
}]

const AdminForm = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [questionData, setQuestionData] = useState(initialValue)
    const dispatch = useDispatch()
    const formData = useSelector(state => state.form).data

    useEffect(() => {
        dispatch(getFormThunk())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (formData?._id) {
            setTitle(formData?.title)
            setDescription(formData?.description)
            if (formData?.questionData[0]?.question) {
                setQuestionData(JSON.parse(JSON.stringify(formData?.questionData)))
            }
        }
    }, [formData])

    const handleAddOption = (i) => {
        const data = {
            value: ""
        }
        questionData[i].options.push(data)
        setQuestionData([...questionData])
    }

    const handleRemoveOption = (i, j) => {
        questionData[i].options.splice(j, 1)
        setQuestionData([...questionData])
    }

    const handleUpdateOptionValue = (field, value, i, j) => {
        questionData[i].options[j][field] = value
        setQuestionData([...questionData])
    }

    const handleUpdateValue = (field, value, i) => {
        questionData[i][field] = value
        setQuestionData([...questionData])
    }

    const handleAddQuestion = () => {
        const data = {
            question: "",
            type: "textbox",
            required: false,
            options: [{
                value: ""
            }]
        }
        setQuestionData([...questionData, data])
    }

    const handleRemoveQuestion = (index) => {
        questionData.splice(index, 1)
        setQuestionData([...questionData])
    }

    const handleSubmit = e => {
        e.preventDefault()
        const data = {
            title,
            description,
            questionData
        }
        if (formData?._id) data.id = formData._id
        dispatch(formThunk(data))
            .then((response) => {
                if (response.payload.code === 201) {
                    toast.success(response.payload.message)
                } else {
                    toast.error(response.payload.message)
                }
            })
    }

    return (
        <div>
            <Container>
                <h2 className='my-4 text-center'>Google Form</h2>
                <Form onSubmit={handleSubmit}>
                    <div className='d-flex justify-content-center align-items-center flex-column gap-3'>
                        <Card style={{ width: '40rem' }}>
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" required placeholder="Enter Form Title" value={title} onChange={e => setTitle(e.target.value)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="text" required placeholder="Enter Form Description" as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
                                </Form.Group>
                            </Card.Body>
                        </Card>

                        {questionData.map((data, i) =>
                            <Card key={i} style={{ width: '40rem' }}>
                                <Card.Body>
                                    <div className='d-flex'>
                                        <Form.Control type="text" required placeholder="Enter Question" value={data.question} onChange={e => handleUpdateValue("question", e.target.value, i)} />
                                        <Form.Select className='w-25 ms-3' value={data.type} onChange={e => handleUpdateValue("type", e.target.value, i)}>
                                            <option value="textbox">Textbox</option>
                                            <option value="radio">Radio</option>
                                            <option value="checkbox">Checkbox</option>
                                            <option value="dropdown">Dropdown</option>
                                        </Form.Select>
                                    </div>
                                    <div className='mt-3'>
                                        {data.type === "textbox" ?
                                            <Form.Control type="text" placeholder="Enter Answer" />
                                            :
                                            <div className='d-flex flex-column gap-3'>
                                                {data?.options?.map((value, j) =>
                                                    <InputGroup key={j}>
                                                        <Form.Control type="text" required placeholder="Enter Option value" value={value.value} onChange={e => handleUpdateOptionValue("value", e.target.value, i, j)} />
                                                        {data.options.length !== 1 && <Button variant="danger" onClick={() => handleRemoveOption(i, j)}>Remove</Button>}
                                                    </InputGroup>
                                                )}
                                            </div>
                                        }
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center mt-3'>
                                        {data.type !== "textbox" ? <Button variant="secondary" onClick={() => handleAddOption(i)}>Add Option</Button> : <span></span>}
                                        <div className='d-flex align-items-center gap-3'>
                                            <Form.Check
                                                reverse
                                                type="switch"
                                                label="Required"
                                                checked={data.required}
                                                onChange={e => handleUpdateValue("required", !data.required, i)}
                                            />
                                            {questionData.length !== 1 && <Button variant="danger" onClick={() => handleRemoveQuestion(i)}>Remove Question</Button>}
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        )}

                        <div className="mb-3">
                            <Button variant="secondary" className='me-3' onClick={handleAddQuestion}>Add Question</Button>
                            <Button variant="primary" type="submit">Submit Form</Button>
                        </div>
                    </div>
                </Form>


            </Container>
        </div>
    )
}

export default AdminForm