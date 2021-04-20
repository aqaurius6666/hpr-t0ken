import React, { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { Redirect, useHistory } from 'react-router-dom';
import './RegisterPage.scss';

export default function RegisterPage() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const user = useSelector((state:RootStateOrAny) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleImageChange = (e:any) => {
        console.log(e.target.files[0]);
        setImage(e.target.files[0])
    };

    const handleFirstnameBlur = () => {
        if (!firstname) {
            setError("First name must be filled");
            setShow(true);
        } else if (firstname.length < 3) {
            setError("First name must have at least 3 chars length");
            setShow(true);
        } else {
            setError('');
        }
    }

    const handleLastnameblur = () => {
        if (!lastname) {
            setError("Last name must be filled");
            setShow(true);
        } else if (lastname.length < 3) {
            setError("Last name must have at least 3 chars length");
            setShow(true);
        } else {
            setError('');
        }
    }

    const handleEmailBlur = () => {
        if (!email) {
            setError('Fill the email');
            setShow(true);
        } else if (email.indexOf('@') === -1) {
            setError('You must take a email with @ character');
            setShow(true);
        }
    }

    const handleEmailChange = (e:any) => {
        setEmail(e.target.value);
        if (email.indexOf('@') >= 0) {
            setError('');
        }
    }

    const handlePasswordBlur = () => {
        if (!password) {
            setError('Fill the pasword');
            setShow(true);
        } else if (password.length < 6) {
            setError('Your password must have more or equal 6 characters');
            setShow(true);
        }
    }

    const handlePasswordChange = (e:any) => {
        setPassword(e.target.value);
        if (password.length >= 6) {
            setError('');
        }
    }

    const handleConfirmPasswordBlur = () => {
        if (password !== confirmPassword) {
            setError('Password doesn\'t match');
            setShow(true);
        } else {
            setError('');
        }
    }

    const handleSubmit = () => {
        console.log(error)
        if (firstname && lastname && email && password && error.length === 0) {
            const user = {firstname, lastname, email, password}
            dispatch(register(user));
            setFirstname('');
            setLastname('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setImage('');
            history.push('/login');
        } else {
            setShow(true);
            if (!email) {
                setError('Invalid Email');
            } else if (!password) {
                setError('Invalid Password');
            } else if (!firstname) {
                setError('Invalid First name');
            } else if (!lastname) {
                setError('Invalid Last name');
            }
        }
    }
    return <div
        style={{ 
            backgroundImage: "linear-gradient(to right, #a1c4fd, #c2e9fb)",
            height: '100vh',
        }}>
        {
            user.authenticate ? <Redirect to='/' /> :
                <Container fluid>
                    <Row className="justify-content-md-center pt-3">
                        <Col lg={8}>
                            {
                                error && show && <Alert style={{ width: '100%' }} onClose={() => setShow(false)} variant="danger" dismissible>
                                    {error}
                                </Alert>
                            }
                        </Col>
                        <Col className="form-sign-up" lg={8}>
                            <h2>Sign up</h2>
                            <span>Please fill in this form to create an account!</span>
                            <hr />
                            <Form method='POST' style={{ margin: '10px 0' }} encType='multipart/form-data'>
                                <Form.Group className="row">
                                    <Col>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            value={firstname}
                                            name='firstname'
                                            type="text"
                                            placeholder="First Name"
                                            onBlur={handleFirstnameBlur}
                                            onChange={e => setFirstname(e.target.value)}
                                            required />
                                    </Col>
                                    <Col>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            value={lastname}
                                            name='lastname'
                                            type="text"
                                            placeholder="Last Name"
                                            onBlur={handleLastnameblur}
                                            onChange={e => setLastname(e.target.value)}
                                            required />
                                    </Col>
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        value={email}
                                        name='email'
                                        type="email"
                                        placeholder="Enter email"
                                        onBlur={handleEmailBlur}
                                        onChange={handleEmailChange}
                                        required />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        value={password}
                                        name='password'
                                        type="password"
                                        placeholder="Password"
                                        onBlur={handlePasswordBlur}
                                        onChange={handlePasswordChange}
                                        required />
                                </Form.Group>
                                <Form.Group controlId="formBasicConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        value={confirmPassword}
                                        type="password"
                                        placeholder="Comfirm Password"
                                        onBlur={handleConfirmPasswordBlur}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        required />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Avatar</Form.Label>
                                    <Form.Control
                                        name='image'
                                        type="file"
                                        accept='image/*'
                                        onChange={handleImageChange}
                                        required />
                                </Form.Group>
                                {/* <div>{image && JSON.stringify(image.name)}</div> */}
                                <Button variant="primary" onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>}
    </div>
}
