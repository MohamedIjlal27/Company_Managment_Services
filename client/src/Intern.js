import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddIntModal} from './AddIntModal';
import {EditIntModal} from './EditIntModal';

export class Intern extends Component{
    constructor(props){
        super(props);
        this.state={ints:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'intern')
        .then(response=>response.json())
        .then(data=>{
            this.setState({ints:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(intid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'intern/'+intid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {ints, intid,intfname,intlname,intage,depmt,depmtid,photofilename,doj}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Intern ID</th>
                            <th>Intern First Name</th>
                            <th>Intern Last Name</th>
                            <th>Intern Age</th>
                            <th>Department</th>
                            <th>DOJ</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ints.map(int=>
                            <tr key={int.InternId}>
                                <td>{int.InternId}</td>
                                <td>{int.InternFirstName}</td>
                                <td>{int.InternLastName}</td>
                                <td>{int.InternAge}</td>
                                <td>{int.DepartmentName}</td>
                                <td>{int.DateOfJoining}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        intid:int.InternId,intfname:int.InternFirstName,
        intlname:int.InternLastName,intage:int.InternAge,depmt:int.DepartmentName,depmtid:int.DepartmentId,
        photofilename:int.PhotoFileName,doj:int.DateOfJoining})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEmp(int.InternId)}>
            Delete
        </Button>

        <EditIntModal show={this.state.editModalShow}
        onHide={editModalClose}
        intid={intid}
        intfname={intfname}
        intlname={intlname}
        intage={intage}
        depmt={depmt}
        depmtid={depmtid}
        photofilename={photofilename}
        doj={doj}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Intern</Button>

                    <AddIntModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}