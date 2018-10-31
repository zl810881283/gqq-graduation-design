import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { connect } from "react-redux"
import { Button, WhiteSpace, WingBlank } from 'antd-mobile-rn'
import store from '../store'

class Home extends Component {
  static navigationOptions = {
    title: '主页'
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
        <Text style={styles.title}>露天矿垂直深孔爆破</Text>
        <WhiteSpace size='xl' />
        <Button onClick={() => this.props.navigation.navigate('HoleIndex')} type="primary" style={styles.button}>
          <Text style={{fontSize:15}}>炮孔参数</Text>
        </Button><WhiteSpace />
        <WhiteSpace size='xl' />
        <Button onClick={() => this.props.navigation.navigate('BlastIndexDesign')} type="primary" style={styles.button}>
          <Text style={{fontSize:15}}>爆破参数设计</Text>
        </Button>
        <WhiteSpace size='xl' />
        <Button onClick={() => this.props.navigation.navigate('GridIndexDesign')} type="primary" style={styles.button}>
          <Text style={{fontSize:15}}>起爆网络设计</Text>
        </Button>
        <WhiteSpace size='xl' />
        <Button onClick={() => this.props.navigation.navigate('HistoryRecords')} type="primary" style={styles.button}>
          <Text style={{fontSize:15}}>历史记录</Text>
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
    height: 35,
    marginBottom: 10
  }
});

let mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(Home)