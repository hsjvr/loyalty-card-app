import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { CustomDrawerItemsWithStylesWithRouter } from './CustomDrawerItems';
import PropTypes from 'prop-types';

export class CustomDrawer extends React.Component {
  render() {
    return (
      <Drawer onClose={this.props.onClose} open={this.props.open}>
        <CustomDrawerItemsWithStylesWithRouter onClose={this.props.onClose} />
      </Drawer>
    );
  }
}

CustomDrawer.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
