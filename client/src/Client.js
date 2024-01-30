import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddClientModal} from './AddClientModal';
import {EditClientModal} from './EditClientModal';

export class Client extends Component{

    constructor(props){
        super(props);
        this.state={clis:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'client')
        .then(response=>response.json())
        .then(data=>{
            this.setState({clis:data})
        })
    }

    componentDidMout(){
        this.refreshList()
    }

    componentDidUpdate(){
        this.refreshList()
    }

    deleteDep(clientid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'client/'+clientid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){
        const {clis, clientid,clientfname,clientlname,clientcname,clientreq,clientreqst} = this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false})

        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Client ID</th>
                            <th>Client First Name</th>
                            <th>Client Last Name</th>
                            <th>Client Company Name</th>
                            <th>Client Request</th>
                            <th>Client Request Status</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clis.map(dep =>
                            <tr key={dep.ClientId}>
                                <td>{dep.ClientId}</td>
                                <td>{dep.ClientFirstName}</td>
                                <td>{dep.ClientLastName}</td>
                                <td>{dep.ClientCompanyName}</td>
                                <td>{dep.ClientRequest}</td>
                                <td>{dep.ClientRequestStatus}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,
                                                clientid:dep.ClientId,clientfname:dep.ClientFirstName,
                                                clientlname:dep.ClientLastName,clientcname:dep.ClientCompanyName,
                                                clientreq:dep.ClientRequest,clientreqst:dep.ClientRequestStatus})}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteDep(dep.ClientId)}>
                                            Delete
                                        </Button>

                                        <EditClientModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            clientid={clientid}
                                            clientfname={clientfname}
                                            clientlname={clientlname}
                                            clientcname={clientcname}
                                            clientreq={clientreq}
                                            clientreqst={clientreqst}
                                            />
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Client</Button>

                    <AddClientModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}