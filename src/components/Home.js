import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { connect } from "react-redux"
import { Button, WhiteSpace, WingBlank } from 'antd-mobile-rn'

class Home extends Component {
  static navigationOptions = {
    title: '主页'
  }

  render() {
    return (
      <WingBlank>
        <Text style={styles.title}>露天矿垂直深孔爆破</Text>
        <WhiteSpace size='xl' />
        <Button onClick={() => this.props.navigation.navigate('HoleIndex')} type="primary" style={styles.button}>
          <Text style={{fontSize:30}}>炮孔参数</Text>
        </Button><WhiteSpace />
        <WhiteSpace size='xl' />
        <Button onClick={() => this.props.navigation.navigate('BlastIndexDesign')} type="primary" style={styles.button}>
          <Text style={{fontSize:30}}>爆破参数设计</Text>
        </Button>
        <WhiteSpace size='xl' />
        <Button onClick={() => this.props.navigation.navigate('GridIndexDesign')} type="primary" style={styles.button}>
          <Text style={{fontSize:30}}>起爆网络设计</Text>
        </Button>
        <WhiteSpace size='xl' />
        <Button onClick={() => this.props.navigation.navigate('HistoryRecords')} type="primary" style={styles.button}>
          <Text style={{fontSize:30}}>历史记录</Text>
        </Button>
      </WingBlank>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 100,
    fontSize: 40,
    marginBottom: 30,
    textAlign: 'center'
  },
  button: {
    height: 70,
    marginBottom: 20
  }
});

let mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(Home)