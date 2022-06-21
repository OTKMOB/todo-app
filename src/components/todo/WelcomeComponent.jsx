import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService';

class WelcomeComponent extends Component {
	constructor() {
		super();
		this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
		this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
		this.handleError = this.handleError.bind(this);
		this.state = {
			welcomeMessage: "",
			errorMessage: ""
		}
	}

	render() {
		return (
			<>
				<h1>Welcome!</h1>
				<div className="container">
					Welcome {this.props.params.username}. You can manage your todos <Link to="/todos">here</Link>.
				</div>
				<div className="container">
					Click here for a welcome message
					<button onClick={this.retrieveWelcomeMessage} 
						className="btn btn-success">Get welcome message</button>
				</div>
				<div className="container">
					{this.state.errorMessage}
				</div>
				<div className="container">
					{this.state.welcomeMessage}
				</div>
			</>	
		);
	}

	retrieveWelcomeMessage() {
		HelloWorldService.executeHelloWorldPathVariableService(this.props.params.username)
		.then(response => this.handleSuccessfulResponse(response))
		.catch(error => this.handleError(error));
	}

	handleSuccessfulResponse(response) {
		console.log(response);
		this.setState(()=> {return {welcomeMessage: response.data.message}});
	}

	handleError(error) {
		console.log(error.response);
		let errorMessage = '';
		if(error.message) {
			errorMessage += error.message;
		}
		if(error.response && error.response.data) {
			errorMessage += error.response.data.message;
		}

		this.setState(()=> {return {errorMessage: errorMessage}});
	}
}

export default WelcomeComponent