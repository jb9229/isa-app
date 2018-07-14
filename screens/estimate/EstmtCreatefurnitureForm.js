import React from 'react'
import {View, TouchableHighlight} from 'react-native'
import { Icon } from 'expo';
import Colors from '../../constants/Colors';

export default class EstmtCreateFunitureForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = { 
      bed: false
    }
  }

  _onPressButton = () => {
    this.setState({
      bed: !this.state.bed
    })
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this._onPressButton}>
          <Icon.FontAwesome
            name={'bed'}
            size={26}
            style={{ marginBottom: -3 }}
            color={this.state.bed ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        </TouchableHighlight>

        <Icon.FontAwesome
          name={'bicycle'}
          size={26}
          style={{ marginBottom: -3 }}
          color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
      </View>
    )
  }
}
