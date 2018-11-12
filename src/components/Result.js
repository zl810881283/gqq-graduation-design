import React, {Component} from 'react';
import { connect } from "react-redux"
import { StyleSheet, ScrollView, Text, TextInput, Alert} from 'react-native';
import { Button, List, Toast } from 'antd-mobile-rn'
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component'
import HoleChart from './HoleChart'
import Table1 from './Table1'
import store from '../store'

class Result extends Component {
  static navigationOptions = {
    title: '设计结果'
  }

  render() {
    let { 
      navigation, Q2Change, fillLenChange, holes,
      table1Head, table1Data, table2Head, table2Data, 
      save, nameChange, name, tableHead, tableData,
    } = this.props

    const Q2Input = (cellData, index) => {
      return <TextInput onChangeText={value => Q2Change(value, index)}>{cellData}</TextInput>
    }
    const fillLenInput = (cellData, index) => {
      return <TextInput onChangeText={value => fillLenChange(value, index)}>{cellData}</TextInput>
    }
    let table2WidthArr = holes.map(item => 75)
    table2WidthArr.push(75)
    return (
      <ScrollView>
        <HoleChart />
        <ScrollView horizontal={true}>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}} style={styles.table}>
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
        <ScrollView horizontal={true}>
          <Table1></Table1>
        </ScrollView>
        <ScrollView horizontal={true}>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}} style={styles.table}>
            <Row data={table2Head} widthArr={table2WidthArr}></Row>
            <Row data={table2Data} widthArr={table2WidthArr} style={{height:40}}></Row>
          </Table>
        </ScrollView>
        <List style={styles.list}>
          <TextInput
            onChangeText={value => nameChange(value)}
            style={styles.textInput}
            value={name}
            placeholder="输入名称"
          />
        </List> 
        <Button onClick={save} type="primary" style={styles.button}>
          <Text style={{fontSize:15}}>保存</Text>
        </Button>
        <Button onClick={() => navigation.navigate('Home')} type="primary" style={styles.button}>
          <Text style={{fontSize:15}}>返回主页</Text>
        </Button>
      </ScrollView>
    )
  }
}

let mapStateToProps = state => {
  return {
    ...state.holeIndex,
    ...state.gridIndex,
    ...state.holeIndexTable,
    name: state.name,
    svgHeight: state.svgHeight
  }
}

let mapDispatchToProps = dispatch => {
  return {
    save: async () => {
      let state = store.getState()
      let {name, svgHeight, records, holeIndex, gridIndex, holeIndexTable, blastIndexDesign} = state
      if (name === '') return Toast.info('请先填写名称！', 1)
      if (records.find(item => item.name === name)) {
        Alert.alert(
          '',
          '将会覆盖之前的记录，确认吗?',
          [
            {text: 'Cancel', onPress: () => {}, style: 'cancel'},
            {text: 'OK', onPress: async () => {
              storage.save({
                key: 'records',
                id: name,
                data: {
                  name,
                  svgHeight,
                  holeIndex,
                  gridIndex,
                  holeIndexTable,
                  blastIndexDesign
                }
              })
              Toast.info('保存成功', 1)
              records = await storage.getAllDataForKey('records')
              store.dispatch({
                type: 'SET_RECORDS',
                records
              })
            }},
          ],
        )
      } else {
        storage.save({
          key: 'records',
          id: name,
          data: {
            name,
            svgHeight,
            holeIndex,
            gridIndex,
            holeIndexTable,
            blastIndexDesign
          }
        })
        Toast.info('保存成功', 1)
        records = await storage.getAllDataForKey('records')
        store.dispatch({
          type: 'SET_RECORDS',
          records
        })
      }
    },
    nameChange: value => {
      dispatch({
        type: 'SET_NAME',
        name: value
      })
    },
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
      let { table2Data } = state.gridIndex
      table2Data[index+1] = value + 'kg'
      dispatch({
        type: "SET_GRID_INDEX",
        gridIndex: {
          ...state.gridIndex,
          table2Data,
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
  row: { flexDirection: 'row' },
});

export default connect(mapStateToProps, mapDispatchToProps)(Result)