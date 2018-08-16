import React from 'react';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

export default class TabBarFoundationIcon extends React.Component {
  render() {
    return (
      <Icon.Foundation
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}
