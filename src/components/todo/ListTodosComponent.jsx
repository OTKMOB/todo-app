import React, {Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService';
import moment from 'moment';

class ListTodosComponent extends Component {
	constructor() {
		super();
		this.state= {
			todos: [],
			message: null
		}
		this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
		this.refreshTodos = this.refreshTodos.bind(this);
		this.updateTodoClicked = this.updateTodoClicked.bind(this);
		this.addTodoCliked = this.addTodoCliked.bind(this);
	}

	componentDidMount() {
		this.refreshTodos();
	}

	render() {
		return (
			<div>
				<h1>Todo List</h1>
				{this.state.message && <div className="alert alert-success">{this.state.message}</div>}
				<div className="container">
					<table className="table">
						<thead>
							<tr>
								<th>description</th>
								<th>is completed?</th>
								<th>target date</th>
								<th>Update</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.todos.map(
									todo=>
									<tr key={todo.id}>
										<td>{todo.description}</td>
										<td>{todo.done.toString()}</td>
										<td>{moment(todo.targetDate).format("YYYY-MM-DD")}</td>
										<td><button onClick={()=>this.updateTodoClicked(todo.id)} className='btn btn-success'>Update</button></td>
										<td><button onClick={()=>this.deleteTodoClicked(todo.id)} className='btn btn-warning'>Delete</button></td>
									</tr>
								)
							}
						</tbody>
					</table>
					<div className="row">
							<button className="btn btn-success" onClick={this.addTodoCliked}>Add</button>
					</div>
				</div>
			</div>
		)
	}

	addTodoCliked() {
		this.props.navigate('/todos/-1')
	}

	deleteTodoClicked(id) {
		let name = AuthenticationService.getLoggedInUserName();
		TodoDataService.deleteTodo(name, id)
			.then(
				respones => {
					this.setState(()=> {return {message: `Delete Succesful`}});
					this.refreshTodos();
				}
			)
	}

	updateTodoClicked(id) {
		this.props.navigate(`/todos/${id}`);
	}

	refreshTodos() {
		let user = AuthenticationService.getLoggedInUserName();
		TodoDataService.retriveAllTodos(user)
			.then(response => {
				this.setState(()=>{return {todos: response.data}})
			});
	}
}

export default ListTodosComponent