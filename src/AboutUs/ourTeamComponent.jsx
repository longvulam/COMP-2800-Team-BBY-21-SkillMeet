import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Jumbotron, Button, Card, Row, Col } from 'react-bootstrap';
import DustinPic from '../img/dustinPic.jpg';
import LamPic from '../img/lamPic.jpg';
import ArunabPic from '../img/arunabPic.jpg';
import OwenPic from '../img/owenPic.jpg';
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
                        <Card style={{ width: '10rem' }}>
                            <Card.Img variant="top" src={DustinPic} style={{ height: '100px', width: 'auto', borderRadius: '20%' }} />
                            <Card.Body>
                                <Card.Title>Dustin Lott</Card.Title>
                                <Card.Text style={{ fontSize: '10pt' }}>
                                    Dustin a new member to the team.  He brings energy and hardwork, and is a welcomed asset to our company.
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='col4'>
                        <Card style={{ width: '10rem' }}>
                            <Card.Img variant="top" src={LamPic} style={{ height: '100px', width: 'auto', borderRadius: '20%' }} />
                            <Card.Body>
                                <Card.Title>Lam Long Vu</Card.Title>
                                <Card.Text style={{ fontSize: '10pt' }}>
                                    Lam brings a wealth of knowledge and experience to our team.  He is a quick thinker and excellent developer.
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Card style={{ width: '10rem' }}>
                            <Card.Img variant="top" src={ArunabPic} style={{ height: '100px', width: 'auto', borderRadius: '20%' }} />
                            <Card.Body>
                                <Card.Title>Arunab Singh</Card.Title>
                                <Card.Text style={{ fontSize: '10pt' }}>
                                    Arunab is a great asset to our team, and we are happy to have him on.  He brings skills and tenacity to the team.
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='col4'>
                        <Card style={{ width: '10rem' }}>
                            <Card.Img variant="top" src={OwenPic} style={{ height: '100px', width: 'auto', borderRadius: '20%' }} />
                            <Card.Body>
                                <Card.Title>Owen Arando</Card.Title>
                                <Card.Text style={{ fontSize: '10pt' }}>
                                    Owen is a smart hardworking developer, who were glad had joined our team.  He is driven and passionate.
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