import React, { Component } from 'react';
import {
	Form, Button, Navbar,
	Container, Row, Col, Alert, Tooltip, OverlayTrigger
} from 'react-bootstrap';

import './styles/LoginPage.css'
import { userLogin, redirectRegistration } from '../../api/user.actions';

class LoginPage extends Component {

	 constructor(props){
	   super(props);
	    this.state = {
	     loginForm:{
	   	  email: '',
	   	  password: '',
	     },

	     loginSuccess: false,	
	     message:{
	     	open: false,
	     	description: '',
	     }	         
	   };		 
	 }

	 handleFormSubmit = () =>{
	   userLogin(this.state.loginForm, (data) =>{
	   	this.setState({
	   	 message: { open: false, description: '' } 
	   	});

	   },(errorStatus) => {
	   	if(errorStatus == 401){
	   	 this.setState({
	   	 	message: { open: true, description: 'Invalid Email or Password' } 
	   	 });
	   	}
	   	alert('your login failed!');
	   })
	 };

	 handleFormChange = (event) => {		
	   this.setState({
   	     loginForm:{
   	       ...this.state.loginForm,
   	       [event.target.name]: event.target.value,
   	     },

   	     message:{
   	     	open: false,
   	     	description: '',
   	     }

	   })

     };

	render() {
		const { loginForm , message} = this.state;
		return (
		  <div>
				<Navbar className="p-3" expand="lg" variant="light" bg="light">
					<Navbar.Brand href="#home">Gocery Guy version 1.0</Navbar.Brand>
				</Navbar>


				<Container className="mainContent"> 

				{	
					message.open &&
					<Row className="justify-content-md-center">
					<Col></Col>
					<Col md={8} xs={8}>
					<Alert variant="danger" >
         			 <p className="text-center">         		
         			 	{message.description}
         			 </p>
        			</Alert>
        			</Col>
        			<Col></Col>
        			</Row>
				 }
				

					<Row className="justify-content-md-center">
						<Col></Col>

						<Col md={6} xs={7}>
							<Form className="mb-4">
							  <Form.Group controlId="formBasicEmail">
							  	<Form.Label>Email address</Form.Label>
							  	<Form.Control 
							  	  type="email" 
							  	  name='email'
							  	  placeholder="Enter email" 
							  	  value={loginForm.email}
							  	  onChange={this.handleFormChange.bind(this)}
							  	/>
							  </Form.Group>

							  <Form.Group controlId="formBasicPassword">
							  	<Form.Label>Password</Form.Label>


							  	<Form.Control 
							  	  type="password"
							  	  name='password' 
							  	  placeholder="Password" 
							  	  value={loginForm.password}
							  	  onChange={this.handleFormChange.bind(this)}
							  	/>
							  </Form.Group>
							</Form>
							<Button
							   variant="secondary"
							   type="submit"
							   block
							   onClick={this.handleFormSubmit.bind(this)}
							 >
							   Submit
              				 </Button>

							 <Button
							   variant="success"
							   type="submit"
							   block
							   onClick = {redirectRegistration}
							  >
							   Register
               				 </Button>

							
						</Col>		
			
						<Col></Col>
					</Row>
				</Container>

				<Navbar fixed="bottom">
					<Navbar.Collapse className="justify-content-end">
						<Navbar.Text href="#home">
							Gocery Guy version 1.0
		        </Navbar.Text>
					</Navbar.Collapse>
				</Navbar>
		   </div>
		);
	}
}
export default (LoginPage);