import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import withNavigation from './withNavigation';
import withParams from './withParams';
import AuthenticatedRoute from './AuthenticatedRoute';
import LoginComponent from './LoginComponent';
import ListTodosComponent from './ListTodosComponent';
import HeaderComponent from './HeaderComponent';
import WelcomeComponent from './WelcomeComponent';
import FooterComponent from './FooterComponent';
import LogoutComponent from './LogoutComponent';
import ErrorComponent from './ErrorComponent';


class TodoApp extends Component {
	render() {
		const LoginComponentWithNavigation = withNavigation(LoginComponent);
		const WelcomeComponentWithParams = withParams(WelcomeComponent);
		const HeaderComponentWithNavigation = withNavigation(HeaderComponent);

		return (
			<div className="TodoApp">
				<Router>
					<HeaderComponentWithNavigation/>
					<Routes>
						<Route path="/" element={<LoginComponentWithNavigation/>}/>
						<Route path="/login" element={<LoginComponentWithNavigation/>}/>
						<Route path="/welcome/:username" element={<AuthenticatedRoute><WelcomeComponentWithParams/></AuthenticatedRoute>}/>
						<Route path="/todos" element={<AuthenticatedRoute><ListTodosComponent/></AuthenticatedRoute>}/>
						<Route path="/logout" element={<LogoutComponent/>}/>
						<Route path="*" element={<ErrorComponent/>}/>
					</Routes>
					<FooterComponent/>
				</Router>
			</div>
		)
	}
}

export default TodoApp