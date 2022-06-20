import React, {Component} from 'react'
import moment from 'moment'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import TodoDataService from '../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService'

class TodoComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.params.id,
            description: "",
            targetDate: moment(new Date()).format("YYYY-MM-DD")
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        if(this.state.id === '-1') return;
        let user = AuthenticationService.getLoggedInUserName();
        TodoDataService.retriveTodo(user, this.state.id)
            .then(response => {
                this.setState(()=> {
                    return {
                        description: response.data.description,
                        targetDate: moment(response.data.targetDate).format("YYYY-MM-DD")
                    }
                })
            })

    }

    render() {
        let {description, targetDate} = this.state;
        return (
            <div>
                <h1>TODO</h1>
                <div className="container">
                    <Formik
                        initialValues={{description, targetDate}}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        validateOnBlur={false}
                        validateOnChange={false}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"/>
                                    </fieldset>
                                    <button type="submit" className="btn btn-success">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }

    onSubmit(values) {
        let user = AuthenticationService.getLoggedInUserName();
        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }

        if(this.state.id === -1) {
            TodoDataService.createTodo(user, todo).then(
                () => this.props.navigate('/todos')
            )
        }
        else {
            TodoDataService.updateTodo(user, this.state.id, todo).then(
                () => this.props.navigate('/todos')
            )
        }
    }

    validate(values) {
        let errors = {};
        if(!values.description) {
            errors.description = "Enter a description";
        }
        else if (values.description.length < 5) {
            errors.description = "Enter at least 5 characters for description";
        }

        if(!moment(values.targetDate).isValid()) {
            errors.targetDate = "Date is not valid";
        }
        return errors;
    }
}

export default TodoComponent