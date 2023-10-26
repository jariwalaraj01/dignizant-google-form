import React, { useState } from 'react'
import { useEffect } from 'react'
import { Card, Button, Container, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getUserFormThunk, userFormThunk } from '../redux/slice/userForm'
import { useNavigate } from 'react-router-dom'

const initialValue = [{
    question: "",
    type: "textbox",
    required: false,
    options: [{
        value: ""
    }]
}]

const UserForm = () => {

    const [name, setName] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [questionData, setQuestionData] = useState(initialValue)
    const dispatch = useDispatch()
    const userFormData = useSelector(state => state.userForm).data
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getUserFormThunk())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (userFormData?.code === 200) {
            setTitle(userFormData?.data.title)
            setDescription(userFormData?.data.description)
            if (userFormData?.data.questionData[0]?.question) {
                setQuestionData(JSON.parse(JSON.stringify(userFormData?.data.questionData)))
            }
        }
    }, [userFormData])

    const handleUpdateValue = (field, value, i) => {
        if (questionData[i].type === "checkbox" && questionData[i]?.answer?.length) {
            let answerList = questionData[i].answer.split(",")
            if (answerList.includes(value)) {
                answerList = answerList.filter(a => a !== value)
            } else {
                answerList.push(value)
            }
            value = answerList.toString()
        }
        questionData[i][field] = value
        setQuestionData([...questionData])
    }

    const handleSubmit = e => {
        e.preventDefault()

        const requireData = questionData.find(data => data.required && !data?.answer?.trim())
        if (requireData?.question || !name.trim()) {
            return toast.error("Please fill required field.")
        }

        const data = {
            name: name.trim(),
            questionData
        }

        dispatch(userFormThunk(data))
            .then((response) => {
                if (response.payload.code === 201) {
                    toast.success(response.payload.message)
                    navigate("/submitted")
                } else {
                    toast.error(response.payload.message)
                }
            })
    }

    return (
        <div>
            {title &&
                <Container>
                    <h2 className='my-4 text-center'>Google Form For User</h2>
                    <Form onSubmit={handleSubmit}>
                        <div className='d-flex justify-content-center align-items-center flex-column gap-3'>
                            <Card style={{ width: '40rem' }}>
                                <Card.Body>
                                    <h3>{title}</h3>
                                    <p>{description}</p>
                                </Card.Body>
                            </Card>

                            <Card style={{ width: '40rem' }}>
                                <Card.Body>
                                    <Form.Group>
                                        <Form.Control required type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} />
                                    </Form.Group>
                                </Card.Body>
                            </Card>

                            {questionData.map((data, i) =>
                                <Card key={i} style={{ width: '40rem' }}>
                                    <Card.Body>
                                        <p>{data.question} <span className='text-danger'>{data.required ? "*" : ""}</span></p>
                                        <div className='mt-3'>
                                            {data.type === "textbox" &&
                                                <Form.Control type="text" placeholder="Enter Answer" required={data.required} value={data?.answer ?? ""} onChange={e => handleUpdateValue("answer", e.target.value, i)} />
                                            }
                                            {(data.type === "radio" || data.type === "checkbox") &&
                                                <div className='d-flex flex-column gap-3'>
                                                    {data?.options?.map((value, j) =>
                                                        <div key={j}>
                                                            <Form.Check
                                                                type={data.type}
                                                                name={data.question}
                                                                id={`${value.value}`}
                                                                label={value.value}
                                                                checked={value.value === data.answer || data?.answer?.includes(value.value) || false}
                                                                onChange={() => handleUpdateValue("answer", value.value, i)}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            }
                                            {
                                                data.type === "dropdown" &&
                                                <Form.Select value={data?.answer ?? ""} onChange={e => handleUpdateValue("answer", e.target.value, i)}>
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

                            <div className="mb-3">
                                <Button variant="primary" type="submit">Submit Form</Button>
                            </div>
                        </div>
                    </Form>
                </Container>
            }
            <button onClick={e => navigate("/admin")}>Admin Form</button>
        </div>
    )
}

export default UserForm