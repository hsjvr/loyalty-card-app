import React from 'react';
import { FormControl, InputLabel, Input, Fab, LinearProgress, Snackbar } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { postLoyaltyCard, getGeolocation } from './../Services';
import { withRouter } from 'react-router-dom';

export class AddLoyaltyCard extends React.Component {
  state = {
    loading: false,
    loyaltyCardCode: '',
    message: null,
  };

  onChangeLoyaltyCardCode = (event) => {
    this.setState({
      ...this.state,
      loyaltyCardCode: event.target.value,
    });
  };

  onClickFab = async () => {
    if (!this.state.loyaltyCardCode) {
      this.setState({
        ...this.state,
        message: {
          text: 'Please enter your loyalty card code',
        },
      });

      return;
    }

    let geolocation;

    try {
      geolocation = await getGeolocation();
    } catch {
      this.setState({
        ...this.state,
        message: {
          text: 'Please enable your location',
        },
      });

      return;
    }

    this.setState({
      ...this.state,
      loading: true,
    });

    await postLoyaltyCard(
      this.state.loyaltyCardCode,
      geolocation.coords.latitude,
      geolocation.coords.longitude,
      geolocation.coords.accuracy,
    );

    this.props.history.push('/');

    this.setState({
      ...this.state,
      loading: false,
    });
  };

  onCloseSnackbar = () => {
    this.setState({
      ...this.state,
      message: null,
    });
  };

  render() {
    return (
      <div style={{ padding: '16px' }}>
        {this.state.loading ? <LinearProgress /> : null}
        <FormControl style={{ width: '100%' }}>
          <InputLabel> Loyalty Card Code </InputLabel>
          <Input onChange={this.onChangeLoyaltyCardCode} value={this.state.loyaltyCardCode} />
        </FormControl>
        <Fab
          color="primary"
          onClick={this.onClickFab}
          style={{ bottom: '15px', outline: 'none', position: 'fixed', right: '15px' }}
        >
          <Check />
        </Fab>
        <Snackbar
          autoHideDuration={6000}
          onClose={this.onCloseSnackbar}
          open={this.state.message ? true : false}
          message={this.state.message ? <span>{this.state.message.text}</span> : null}
        />
      </div>
    );
  }
}

export const AddLoyaltyCardWithRouter = withRouter(AddLoyaltyCard);
