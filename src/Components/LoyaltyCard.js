import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import * as moment from 'moment';

export class LoyaltyCard extends React.Component {
  render() {
    return (
      <Card onClick={() => this.props.action(this.props.loyaltyCard)} style={{ width: '100%' }}>
        <CardActionArea>
          <CardMedia
            style={{ height: '150px' }}
            image={process.env.PUBLIC_URL + '/images/loyalty-card-bg.jpg'}
            title="Loyalty Card Background"
          />
          <CardContent>
            <Typography gutterBottom variant="h6">
              Loyalty Card
            </Typography>
            <Typography color="textSecondary">{moment(this.props.loyaltyCard.date).format('DD MMMM YYYY')}</Typography>
            <Typography component="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac ex sollicitudin, dictum sapien
              eget, aliquam mi.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}
