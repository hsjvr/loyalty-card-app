import React from 'react';
import { LoyaltyCard } from '../Components';
import { Add } from '@material-ui/icons';
import { List, ListItem, ListSubheader, Fab, LinearProgress, Snackbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { getLoyaltyCards, deleteLoyaltyCard } from './../Services';

export class LoyaltyCards extends React.Component {
  state = {
    loyaltyCards: null,
    message: null,
  };

  componentDidMount = async () => {
    this.setState({
      ...this.state,
      loyaltyCards: await getLoyaltyCards(),
    });
  }

  onCloseSnackbar = async () => {
    this.setState({
      ...this.state,
      message: null,
    });
  };

  onClickLoyaltyCard = async (loyaltyCard) => {
    this.setState({
      ...this.state,
      message: {
        action: [
          <Button key="yes" onClick={() => this.onClickLoyaltyCardYes(loyaltyCard)} color="secondary" size="small">
            YES
          </Button>,
        ],
        text: 'Redeem your loyalty card?',
      },
    });
  };

  onClickLoyaltyCardYes = async (loyaltyCard) => {
    this.setState({
      ...this.state,
      loyaltyCards: null,
      message: null,
    });

    await deleteLoyaltyCard(loyaltyCard);

    this.setState({
      ...this.state,
      loyaltyCards: await getLoyaltyCards(),
    });
  };

  render() {
    return (
      <div>
        <List
          dense={true}
          subheader={
            <ListSubheader disableSticky={true} component="div">
              Loyalty Cards
            </ListSubheader>
          }
        >
          {this.state.loyaltyCards ? (
            this.state.loyaltyCards.map((loyaltyCard) => (
              <ListItem key={loyaltyCard.id}>
                <LoyaltyCard action={this.onClickLoyaltyCard} loyaltyCard={loyaltyCard} />
              </ListItem>
            ))
          ) : (
            <LinearProgress />
          )}
        </List>
        <Fab
          color="primary"
          style={{ bottom: '15px', outline: 'none', position: 'fixed', right: '15px' }}
          component={Link}
          to="/add-loyalty-card"
        >
          <Add />
        </Fab>
        <Snackbar
          open={this.state.message ? true : false}
          autoHideDuration={6000}
          onClose={this.onCloseSnackbar}
          message={this.state.message ? <span>{this.state.message.text}</span> : null}
          action={this.state.message ? this.state.message.action : null}
        />
      </div>
    );
  }
}
