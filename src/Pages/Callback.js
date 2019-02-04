import React from 'react';
import { LinearProgress } from '@material-ui/core';
import { webAuth } from './../Services';
import { withRouter } from 'react-router-dom';

export class Callback extends React.Component {
  state = {
    users: null,
  };

  async componentDidMount() {
    webAuth.parseHash((error, result) => {
      if (error) {
        return;
      }

      localStorage.setItem('auth0', JSON.stringify(result));

      this.props.history.push('/');
    });
  }

  render() {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }
}

export const CallbackWithRouter = withRouter(Callback);