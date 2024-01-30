import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddClientModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'client',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ClientFirstName:event.target.ClientFirstName.value,
                ClientLastName:event.target.ClientLastName.value,
                ClientCompanyName:event.target.ClientCompanyName.value,
                ClientRequest:event.target.ClientRequest.value,
                ClientRequestStatus:event.target.ClientRequestStatus.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
        
    }
    render(){
        return (
            <div className="container">

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Client
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="ClientFirstName">
                                        <Form.Label>Client First Name</Form.Label>
                                        <Form.Control type="text" name="ClientFirstName" required 
                                            placeholder="Client First Name"/>
                                    </Form.Group>

                                    <Form.Group controlId="ClientLastName">
                                        <Form.Label>Client Last Name</Form.Label>
                                        <Form.Control type="text" name="ClientLastName" required 
                                            placeholder="Client Last Name"/>
                                    </Form.Group>

                                    <Form.Group controlId="ClientCompanyName">
                                        <Form.Label>Client Company Name</Form.Label>
                                        <Form.Control type="text" name="ClientCompanyName" required 
                                            placeholder="Client Company Name"/>
                                    </Form.Group>

                                    <Form.Group controlId="ClientRequest">
                                        <Form.Label>ClientRequest</Form.Label>
                                        <Form.Control type="text" name="ClientRequest" required 
                                            placeholder="Client Request"/>
                                    </Form.Group>

                                    <Form.Group controlId="ClientRequestStatus">
                                        <Form.Label>Client Request Status</Form.Label>
                                        <Form.Control type="text" name="ClientRequestStatus" required 
                                            placeholder="Pending/Terminated/Finished"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Client
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
    
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}