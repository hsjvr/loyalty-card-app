import React from 'react';
import { Paper, Button } from '@material-ui/core';
import { webAuth, getUser } from './../Services';
import { withRouter } from 'react-router-dom';

export class SignIn extends React.Component {
  async componentDidMount() {
    const user = await getUser();

    if (user) {
      this.props.history.push('/');

      return;
    }
  }

  onClickEnter = () => {
    webAuth.authorize();
  };

  render() {
    return (
      <Paper style={{ margin: '8px', padding: '20px', textAlign: 'center' }}>
        <img src={process.env.PUBLIC_URL + '/images/logo.jpg'} alt="Logo" />

        <br />
        <Button color="primary" onClick={this.onClickEnter} variant="contained">
          Enter
        </Button>
      </Paper>
    );
  }
}

export const SignInWithRouter = withRouter(SignIn);
