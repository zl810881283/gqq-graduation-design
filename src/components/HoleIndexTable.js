import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import store from '../store'
import { connect } from "react-redux"
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component'
import { Button } from 'antd-mobile-rn'

class HoleIndexTable extends Component {
  render() {
    let { tableHead, tableData, Q2Change, Len2Change } = this.props
    const Q2Input = (cellData, index) => {
      return <TextInput onChangeText={value => Q2Change(value, index)}>{cellData}</TextInput>
    }
    const Len2Input = (cellData, index) => {
      return <TextInput onChangeText={value => Len2Change(value, index)}>{cellData}</TextInput>
    }
    return (
      <ScrollView>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={tableHead}/>
          {
            tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell 
                    key={cellIndex} 
                    data={cellIndex === 8 ? Q2Input(cellData, index) : (cellIndex === 11 ? Len2Input(cellData, index) : cellData)} 
                    textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
        <Button onClick={() => this.props.navigation.navigate('Home')} type="primary" style={styles.button}>
          <Text style={{fontSize:20}}>返回主页</Text>
        </Button>
      </ScrollView>
    )
  }
}

let mapStateToProps = state => {
  return state.holeIndexTable
}

let mapDispatchToprops = dispatch => {
  return {
    Q2Change: (value, index) => {
      let state = store.getState()
      let { tableData } = state.holeIndexTable
      tableData[index][8] = value
      dispatch({
        type: "SET_HOLE_INDEX_TABLE",
        holeIndexTable: {
          ...state.holeIndexTable,
          tableData
        }
      })
    },
    Len2Change: (value, index) => {
      let state = store.getState()
      let { tableData } = state.holeIndexTable
      tableData[index][11] = value
      dispatch({
        type: "SET_HOLE_INDEX_TABLE",
        holeIndexTable: {
          ...state.holeIndexTable,
          tableData
        }
      })
    },
  }
}

const styles = StyleSheet.create({
  text: { margin: 6 },
  row: { flexDirection: 'row' },
  button: {
    height: 40,
    margin: 30
  }
});

export default connect(mapStateToProps, mapDispatchToprops)(HoleIndexTable)