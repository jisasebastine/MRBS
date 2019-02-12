import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { LoginPage } from '../__components/LoginPage';

// export const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => (
//         localStorage.getItem('user')
//             ? <Component {...props} />
//             : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//     )} />
// );

export default ChildComponent => {
    class ComposedComponent extends React.Component {
        componentDidMount = () => {
            if(!localStorage.getItem('user')) {
                this.props.history.push('/login');
            }
        }

        componentDidUpdate = () => {
            if(!localStorage.getItem('user')) {
                this.props.history.push('/login');
            }
        }

        render() {
            return <ChildComponent {...this.props} />;
        }
    }

    return ComposedComponent;
}