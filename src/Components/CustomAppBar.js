import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, IconButton, withStyles } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { CustomDrawer } from './CustomDrawer';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class CustomMenuAppBar extends React.Component {
  state = {
    drawer: {
      open: false,
    },
  };

  onClickMenu = () => {
    this.setState({
      drawer: {
        ...this.state.drawer,
        open: !this.state.drawer.open,
      },
    });
  };

  onCloseDrawer = () => {
    this.setState({
      drawer: {
        ...this.state.drawer,
        open: false,
      },
    });
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={this.props.classes.menuButton} onClick={this.onClickMenu} color="inherit">
              <Menu />
            </IconButton>
            <Typography className={this.props.classes.grow} color="inherit" variant="h6">
              Loyalty Card App
            </Typography>
          </Toolbar>
        </AppBar>
        <CustomDrawer onClose={this.onCloseDrawer} open={this.state.drawer.open} />
      </div>
    );
  }
}

CustomMenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const CustomMenuAppBarWithStyles = withStyles(styles)(CustomMenuAppBar);
