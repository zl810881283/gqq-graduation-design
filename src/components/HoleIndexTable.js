import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import store from '../store'
import { connect } from "react-redux"
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component'
import { Button } from 'antd-mobile-rn'

class HoleIndexTable extends Component {
  render() {
    let { tableHead, tableData, Q2Change, fillLenChange, focusRender } = this.props
    const Q2Input = (cellData, index) => {
      return <TextInput onChangeText={value => Q2Change(value, index)}>{cellData}</TextInput>
    }
    const fillLenInput = (cellData, index) => {
      return <TextInput onChangeText={value => fillLenChange(value, index)}>{cellData}</TextInput>
    }
    return (
      <ScrollView>
        <ScrollView horizontal={true}>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={tableHead} widthArr={[75,75,75,75,75,75,75,75,75,75,75,75]}/>
            {
              tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {
                    rowData.map((cellData, cellIndex) => (
                      <Cell 
                      style={{width:75}}
                      key={cellIndex} 
                      data={cellIndex === 8 ? Q2Input(cellData, index) : (cellIndex === 11 ? fillLenInput(cellData, index) : cellData)} 
                      textStyle={styles.text}/>
                    ))
                  }
                </TableWrapper>
              ))
            }
          </Table>
        </ScrollView>
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
      let { holes } = state.holeIndex
      let { lenIndex } = state.blastIndexDesign
      holes[index].Q2 = value
      holes[index].mediLen = Number((value/lenIndex).toFixed(2))
      holes[index].fillLen = Number((holes[index].l - holes[index].mediLen).toFixed(2))
      dispatch({
        type: "SET_HOLE_INDEX",
        holeIndex: {
          ...state.holeIndex,
          holes
        }
      })
      let { tableData, focusRender } = state.holeIndexTable
      tableData[index][8] = value
      tableData[index][10] = holes[index].mediLen
      tableData[index][11] = holes[index].fillLen
      dispatch({
        type: "SET_HOLE_INDEX_TABLE",
        holeIndexTable: {
          ...state.holeIndexTable,
          tableData,
          focusRender: !focusRender
        }
      })
    },
    fillLenChange: (value, index) => {
      let state = store.getState()
      let { holes } = state.holeIndex
      holes[index].fillLen = value
      holes[index].mediLen = holes[index].l - value
      dispatch({
        type: "SET_HOLE_INDEX",
        holeIndex: {
          ...state.holeIndex,
          holes
        }
      }) 
      let { tableData, focusRender } = state.holeIndexTable
      tableData[index][10] = holes[index].mediLen
      tableData[index][11] = value
      dispatch({
        type: "SET_HOLE_INDEX_TABLE",
        holeIndexTable: {
          ...state.holeIndexTable,
          tableData,
          focusRender: !focusRender
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