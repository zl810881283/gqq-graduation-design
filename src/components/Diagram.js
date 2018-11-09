import React, {Component} from 'react';
import { connect } from "react-redux"
import { StyleSheet, ScrollView, Text} from 'react-native';
import { Button } from 'antd-mobile-rn'
import HoleChart from './HoleChart'

class Diagram extends Component {
  static navigationOptions = {
    title: '炮孔示意图'
  }

  render() {
    let { navigation } = this.props

    return (
      <ScrollView>
        <HoleChart />
        <Button onClick={() => navigation.navigate('BlastIndexDesign')} type="primary" style={styles.button}>
          <Text style={{fontSize:15}}>下一步</Text>
        </Button>        
        <Button onClick={() => navigation.navigate('Home')} type="primary" style={styles.button}>
          <Text style={{fontSize:15}}>返回主页</Text>
        </Button>
      </ScrollView>
    )
  }
}

let mapStateToProps = state => {
  return {}
}

let mapDispatchToProps = dispatch => {
  return {}
}

const styles = StyleSheet.create({
  button: {
    height:30,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15
  },
  inputTitle: {
    fontSize: 15,
    margin: 10
  },
  typeRadio: {
    height: 25
  },
  textInput: {
    height:40,
    fontSize:15,
    marginLeft: 10,
  },
  list: {
    marginBottom: 10
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Diagram)