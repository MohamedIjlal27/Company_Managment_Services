import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditClientModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'client',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ClientId:event.target.ClientId.value,
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
                            Edit Client
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="ClientId">
                                        <Form.Label>Client Id</Form.Label>
                                        <Form.Control type="text" name="ClientId" required
                                            disabled
                                            defaultValue={this.props.clientid} 
                                            placeholder="ClientId"/>
                                    </Form.Group>

                                    <Form.Group controlId="ClientFirstName">
                                        <Form.Label>Client First Name</Form.Label>
                                        <Form.Control type="text" name="ClientFirstName" required 
                                            defaultValue={this.props.clientfname}
                                            placeholder="Client First Name"/>
                                    </Form.Group>

                                    <Form.Group controlId="ClientLastName">
                                        <Form.Label>Client Last Name</Form.Label>
                                        <Form.Control type="text" name="ClientLastName" required 
                                            defaultValue={this.props.clientlname}
                                            placeholder="Client Last Name"/>
                                    </Form.Group>

                                    <Form.Group controlId="ClientCompanyName">
                                        <Form.Label>Client Company Name</Form.Label>
                                        <Form.Control type="text" name="ClientCompanyName" required 
                                            defaultValue={this.props.clientcname}
                                            placeholder="Client Company Name"/>
                                    </Form.Group>

                                    <Form.Group controlId="ClientRequest">
                                        <Form.Label>Client Request</Form.Label>
                                        <Form.Control type="text" name="ClientRequest" required 
                                            defaultValue={this.props.clientreq}
                                            placeholder="Client Request"/>
                                    </Form.Group>

                                    <Form.Group controlId="ClientRequestStatus">
                                        <Form.Label>Client Request Status</Form.Label>
                                        <Form.Control type="text" name="ClientRequestStatus" required 
                                            defaultValue={this.props.clientreqst}
                                            placeholder="Client Request Status"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Client
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