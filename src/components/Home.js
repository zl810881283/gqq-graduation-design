import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { connect } from "react-redux"
import { Button, WhiteSpace, WingBlank } from 'antd-mobile-rn'
import store from '../store'

class Home extends Component {
  static navigationOptions = {
    title: '露天矿垂直深孔爆破'
  }

  async componentWillMount() {
    let records = await storage.getAllDataForKey('records')
    store.dispatch({
      type: 'SET_RECORDS',
      records
    })
  }

  render() {
    return (
      <WingBlank>
        <Button 
          onClick={() => this.props.navigation.navigate('HoleIndex')} 
          type="primary" 
          style={styles.startDesignButton}>
          <Text style={{fontSize:20}}>开始设计</Text>
        </Button>
        <WhiteSpace size='xl'/>
        <Button 
          onClick={() => this.props.navigation.navigate('HistoryRecords')} 
          type="primary" 
          style={styles.button}>
          <Text style={{fontSize:20}}>历史记录</Text>
        </Button>
      </WingBlank>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 50,
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center'
  },
  button: {
    height: 40,
    marginBottom: 10
  },
  startDesignButton: {
    height: 40,
    marginBottom: 10,
    marginTop: 200  
  }
});

let mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(Home)