import React, {Component} from 'react';
import { connect } from "react-redux"
import { StyleSheet, ScrollView, Text, TextInput, Alert} from 'react-native';
import { Table, Row, TableWrapper, Cell, Col } from 'react-native-table-component'
import store from '../store'

class Table1 extends React.Component{
  render() {
    let { table1Data, selected, powerClick, underHole, underHoleChange } = this.props

    return (
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}} style={styles.table}>
        <TableWrapper style={styles.row}>
          <Cell data={'爆破器材'} textStyle={styles.text} style={{width: 75, height: 90}}/>
          <TableWrapper style={{flexDirection: 'column'}}>
            <Row data={['炸药(kg)']} style={{width:160}} textStyle={styles.powerText} />
            <TableWrapper style={{flexDirection: 'row'}}>
              <Cell onPress={()=>powerClick('乳化')} data={['乳化' + (selected == '乳化' ? '√' : '')]} style={{width:75}} textStyle={styles.text} />
              <Cell onPress={()=>powerClick('多孔粒状')} data={['多孔粒状' + (selected == '多孔粒状' ? '√' : '')]} style={{width:85}} textStyle={styles.powerSonText} />
            </TableWrapper>
          </TableWrapper>
          <TableWrapper style={{flexDirection: 'column'}}>
            <Row data={['延期雷管(发)']} textStyle={styles.deText} style={{width: 300, height: 30}}/>
            <Row data={['孔内', '西安地表']} widthArr={[75, 225]} textStyle={styles.text} />
            <TableWrapper style={{flexDirection: 'row'}}>
              <Cell data={<TextInput onChangeText={value => underHoleChange(value)}>{underHole}</TextInput>} style={{width: 75}} textStyle={styles.text} />
              <Cell data={['25ms']} widthArr={[75, 75]} textStyle={styles.text} />
              <Cell data={['42ms']} widthArr={[75, 75]} textStyle={styles.text} />
              <Cell data={['65ms']} widthArr={[75, 75]} textStyle={styles.text} />
            </TableWrapper>
          </TableWrapper>
          <Cell data={'导爆索(米)'} textStyle={styles.text} style={{width: 85, height: 90}}/>
          <Cell data={'导爆管(米)'} textStyle={styles.text} style={{width: 85, height: 90}}/>
        </TableWrapper>
        <Row data={table1Data} widthArr={[75,75,85,75,75,75,75,85,85]}></Row>
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
  return {
    powerClick: value => {
      let {gridIndex} = store.getState()
      let {table1Data} = gridIndex
      if (value === '乳化') {
        table1Data[1] = JSON.parse(JSON.stringify(table1Data[2]))
        table1Data[2] = ''
      } else {
        table1Data[2] = JSON.parse(JSON.stringify(table1Data[1]))
        table1Data[1] = ''
      }
      dispatch({
        type: 'SET_GRID_INDEX',
        gridIndex: {
          ...gridIndex,
          table1Data,
          selected: value
        }
      })
    },
    underHoleChange: value => {
      let {gridIndex} = store.getState()
      dispatch({
        type: 'SET_GRID_INDEX',
        gridIndex: {
          ...gridIndex,
          underHole: value
        }
      })
    }
  }
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
