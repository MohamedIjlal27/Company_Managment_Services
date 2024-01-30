import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class EditEmpModal extends Component{
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
        fetch(process.env.REACT_APP_API+'employee',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmployeeId:event.target.EmployeeId.value,
                EmployeeFirstName:event.target.EmployeeFirstName.value,
                EmployeeLastName:event.target.EmployeeLastName.value,
                EmployeeAge:event.target.EmployeeAge.value,
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

        fetch(process.env.REACT_APP_API+'Employee/SaveFile',{
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
            Edit Employee
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="EmployeeId">
                        <Form.Label>Employee Id</Form.Label>
                        <Form.Control type="text" name="EmployeeId" required 
                        placeholder="Employee Id"
                        disabled
                        defaultValue={this.props.empid}/>
                    </Form.Group>

                    <Form.Group controlId="EmployeeFirstName">
                        <Form.Label>Employee First Name</Form.Label>
                        <Form.Control type="text" name="EmployeeFirstName" required 
                        defaultValue={this.props.empfname}
                        placeholder="Employee First Name"/>
                    </Form.Group>

                    <Form.Group controlId="EmployeeLastName">
                        <Form.Label>Employee Last Name</Form.Label>
                        <Form.Control type="text" name="EmployeeLastName" required 
                        defaultValue={this.props.emplname}
                        placeholder="Employee Last Name"/>
                    </Form.Group>

                    <Form.Group controlId="EmployeeAge">
                        <Form.Label>Employee Age</Form.Label>
                        <Form.Control type="text" name="EmployeeAge" required 
                        defaultValue={this.props.empage}
                        placeholder="Employee Age"/>
                    </Form.Group>

                    <Form.Group controlId="DepartmentId">
                        <Form.Label>Department</Form.Label>
                        <Form.Control as="select" defaultValue={this.props.depmtid}>
                        {this.state.deps.map(dep=>
                            <option key={dep.DepartmentId}>{dep.DepartmentId + ' ' + dep.DepartmentName}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="DateOfJoining">
                        <Form.Label>DateOfJoining</Form.Label>
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