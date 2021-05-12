import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Jumbotron, Button, Card, Row, Col } from 'react-bootstrap';
import DustinPic from '../dustinPic.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Team extends Component {
    render() {
        return <div>
            <Container style={{ textAlign: 'center', border: '1px solid black', backgroundColor: 'black', marginBottom: '1.5rem' }}>
                <h1 style={{ color: 'goldenRod', marginTop: '1.5rem' }}>Our Team</h1>
                <p style={{ color: 'white', marginBottom: '1.5rem' }}>"We have put together a top-notch group of developers to pursue and complete our mission."</p>
            </Container>
            <br />
            <Container>
                <Row>
                    <Col>
                        <Card style={{ width: '11rem' }}>
                            <Card.Img variant="top" src={DustinPic} style={{ height: '100px', width: 'auto', borderRadius: '20%' }} />
                            <Card.Body>
                                <Card.Title>Dustin Lott</Card.Title>
                                <Card.Text style={{ fontSize: '10pt' }}>
                                    Some quick example about what a great guy I am.  Wow so cool.  Wow so skill.  Is he even human?  Best Game of the year 2008.
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='col4'>
                        <Card style={{ width: '11rem' }}>
                            <Card.Img variant="top" src={DustinPic} style={{ height: '100px', width: 'auto', borderRadius: '20%' }} />
                            <Card.Body>
                                <Card.Title>Dustin Lott</Card.Title>
                                <Card.Text style={{ fontSize: '10pt' }}>
                                    Some quick example about what a great guy I am.  Wow so cool.  Wow so skill.  Is he even human?  Best Game of the year 2008.
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Card style={{ width: '11rem' }}>
                            <Card.Img variant="top" src={DustinPic} style={{ height: '100px', width: 'auto', borderRadius: '20%' }} />
                            <Card.Body>
                                <Card.Title>Dustin Lott</Card.Title>
                                <Card.Text style={{ fontSize: '10pt' }}>
                                    Some quick example about what a great guy I am.  Wow so cool.  Wow so skill.  Is he even human?  Best Game of the year 2008.
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='col4'>
                        <Card style={{ width: '11rem' }}>
                            <Card.Img variant="top" src={DustinPic} style={{ height: '100px', width: 'auto', borderRadius: '20%' }} />
                            <Card.Body>
                                <Card.Title>Dustin Lott</Card.Title>
                                <Card.Text style={{ fontSize: '10pt' }}>
                                    Some quick example about what a great guy I am.  Wow so cool.  Wow so skill.  Is he even human?  Best Game of the year 2008.
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <div style={{ textAlign: 'center' }}>
                <FontAwesomeIcon style={{  }} icon={["fas", "chevron-down"]} color="black" opacity=".4" size="3x" onClick={() => window.scrollBy(0, 300) } />
            </div>
        </div>;
    }
}

export default Team;