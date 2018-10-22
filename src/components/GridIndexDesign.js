import React, {Component} from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import store from '../store'
import { connect } from "react-redux"

class GridIndexDesign extends Component {
  static navigationOptions = {
    title: '起爆网络设计'
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>
          起爆网络设计页面
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

let mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(GridIndexDesign)