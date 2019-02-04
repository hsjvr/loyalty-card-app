import React from 'react';
import { Paper, Button } from '@material-ui/core';
import { webAuth } from './../Services';

export class SignIn extends React.Component {
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
