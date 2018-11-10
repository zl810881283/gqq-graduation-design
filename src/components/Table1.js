import React, {Component} from 'react';
import { connect } from "react-redux"
import { StyleSheet, ScrollView, Text, TextInput, Alert} from 'react-native';
import { Table, Row, TableWrapper, Cell, Col } from 'react-native-table-component'
import store from '../store'

class Table1 extends React.Component{
  render() {
    let { table1Data } = this.props

    return (
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}} style={styles.table}>
        <TableWrapper style={styles.row}>
          <Cell data={'爆破器材'} textStyle={styles.text} style={{width: 75, height: 90}}/>
          <TableWrapper style={{flexDirection: 'column'}}>
            <Row data={['炸药(kg)']} style={{width:150}} textStyle={styles.powerText} />
            <Row data={['乳化', '多孔粒状']} widthArr={[75, 75]} textStyle={styles.powerSonText} />
          </TableWrapper>
          <TableWrapper style={{flexDirection: 'column'}}>
            <Row data={['延期雷管(发)']} textStyle={styles.deText} style={{width: 300, height: 30}}/>
            <Row data={['孔内', '西安地表']} widthArr={[75, 225]} textStyle={styles.text} />
            <Row data={['400ms', '25ms', '42ms', '65ms']} widthArr={[75, 75, 75, 75]} textStyle={styles.text} />
          </TableWrapper>
          <Cell data={'导爆索(米)'} textStyle={styles.text} style={{width: 85, height: 90}}/>
          <Cell data={'导爆管(米)'} textStyle={styles.text} style={{width: 85, height: 90}}/>
        </TableWrapper>
        <Row data={table1Data} widthArr={[75,75,75,75,75,75,75,85,85]}></Row>
      </Table>
    )
  }
}

let mapStateToProps = state => {
  return {
    ...state.gridIndex,
  }
}

let mapDispatchToProps = dispatch => {
  return {}
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    height:30
  },
  table: {
    marginBottom: 15
  },
  textInput: {
    height:40,
    fontSize:15,
    marginLeft: 10,
  },
  list: {
    height: 40,
    marginBottom: 10
  },
  text: { margin: 6 },
  deText: { margin: 6, marginLeft: 100 },
  powerText: { margin: 6, marginLeft: 40 },
  powerSonText: { margin: 6, marginTop: 20, marginBottom: 20 },
  row: { flexDirection: 'row' },
});

export default connect(mapStateToProps, mapDispatchToProps)(Table1)
