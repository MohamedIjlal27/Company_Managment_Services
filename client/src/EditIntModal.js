import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class EditIntModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'intern',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                InternId:event.target.InternId.value,
                InternFirstName:event.target.InternFirstName.value,
                InternLastName:event.target.InternLastName.value,
                InternAge:event.target.InternAge.value,
                DepartmentId:event.target.DepartmentId.value.split(' ').shift(),
                DateOfJoining:event.target.DateOfJoining.value,
                PhotoFileName:this.photofilename

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


    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'Intern/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
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
            Edit Intern
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="InternId">
                        <Form.Label>Intern Id</Form.Label>
                        <Form.Control type="text" name="InternId" required 
                        placeholder="Intern Id"
                        disabled
                        defaultValue={this.props.intid}/>
                    </Form.Group>

                    <Form.Group controlId="InternFirstName">
                        <Form.Label>Intern First Name</Form.Label>
                        <Form.Control type="text" name="InternFirstName" required 
                        defaultValue={this.props.intfname}
                        placeholder="Intern First Name"/>
                    </Form.Group>

                    <Form.Group controlId="InternLastName">
                        <Form.Label>Intern Last Name</Form.Label>
                        <Form.Control type="text" name="InternLastName" required 
                        defaultValue={this.props.intlname}
                        placeholder="Intern Last Name"/>
                    </Form.Group>

                    <Form.Group controlId="InternAge">
                        <Form.Label>Intern Age</Form.Label>
                        <Form.Control type="text" name="InternAge" required 
                        defaultValue={this.props.intage}
                        placeholder="Intern Age"/>
                    </Form.Group>

                    <Form.Group controlId="DepartmentId">
                        <Form.Label>Department</Form.Label>
                        <Form.Control as="select" defaultValue={this.props.depmtid}>
                        {this.state.deps.map(dep=>
                            <option key={dep.DepartmentId}>{dep.DepartmentId + ' ' + dep.DepartmentName}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="DateOfJoining">
                        <Form.Label>Date Of Joining</Form.Label>
                        <Form.Control 
                        type="date"
                        name="DateOfJoining"
                        required
                        placeholder="Date Of Joining"
                        defaultValue={this.props.doj}
                        />
                       
                        
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Employee
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            <Col sm={6}>
                <Image width="200px" height="200px" 
                src={process.env.REACT_APP_PHOTOPATH+this.props.photofilename}/>
                <input onChange={this.handleFileSelected} type="File"/>
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