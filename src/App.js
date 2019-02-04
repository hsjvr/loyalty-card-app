import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { CustomMenuAppBarWithStyles } from './Components';
import { AddLoyaltyCardWithRouter, Leaderboard, LoyaltyCards, SignInWithRouter, CallbackWithRouter } from './Pages';
import * as moment from 'moment';
import { getGeolocation, getUser } from './Services';

moment.locale('af', {
  months: [
    'Januarie',
    'Februarie',
    'Maart',
    'April',
    'Mei',
    'Junie',
    'Julie',
    'Augustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ],
});

// moment.locale('af');

class App extends Component {
  state = {
    loggedIn: null,
  };

  async componentDidMount() {
    getGeolocation().catch(() => {
      // TODO: Add snackbar
    });

    this.setState({
      ...this.state,
      loggedIn: (await getUser()) ? true : false,
    });
  }

  authenticate = (component) => {
    switch (this.state.loggedIn) {
      case true:
        return component;
      case false:
        return <Redirect to="/sign-in" />;
      default:
        return null;
    }
  };

  onAuthenticate = () => {
    return new Promise(async (resolve) => {
      this.setState(
        {
          ...this.state,
          loggedIn: (await getUser()) ? true : false,
        },
        resolve,
      );
    });
  };

  render() {
    return (
      <Router>
        <div>
          <CustomMenuAppBarWithStyles />
          <Route path="/add-loyalty-card" render={() => this.authenticate(<AddLoyaltyCardWithRouter />)} />
          <Route path="/callback" render={() => <CallbackWithRouter onAuthenticate={this.onAuthenticate} />} />
          <Route path="/leaderboard" render={() => this.authenticate(<Leaderboard />)} />
          <Route exact path="/" render={() => this.authenticate(<LoyaltyCards />)} />
          <Route path="/sign-in" component={SignInWithRouter} />
        </div>
      </Router>
    );
  }
}

export default App;
