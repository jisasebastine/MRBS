import React from 'react';

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