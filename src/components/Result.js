import React, {Component} from 'react';
import { connect } from "react-redux"
import Svg,{ Circle, Path, TSpan, G, Text as SvgText} from 'react-native-svg'
import { StyleSheet, ScrollView, View, Text, TextInput} from 'react-native';
import { Button, List, Toast } from 'antd-mobile-rn'
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component'
import store from '../store'

class Result extends Component {
  static navigationOptions = {
    title: '炮孔示意图'
  }

  getPath = (index, holes) => {
    let parentNumber = holes[index].parentNumber
    if (parentNumber === '') return null
    let parentIndex = holes.findIndex(item => item.number === parentNumber)
    let parentHole = holes[parentIndex], childHole = holes[index]
    // 计算箭头两点的位置
    let dx = Math.abs(parentHole.x-childHole.x)
    let dy = Math.abs(parentHole.y-childHole.y)
    let theta = Math.atan(dy/dx)
    theta *= 180 / Math.PI
    let angle = theta+270
    let p1 = {
      x: parentHole.x-childHole.x > 0 ? childHole.x + 5*1: childHole.x - 5*1,
      y: parentHole.y-childHole.y > 0 ? childHole.y + 10 : childHole.y - 10 
    }
    let p2 = {
      x: parentHole.x-childHole.x < 0 ? childHole.x + 5*1 : childHole.x - 5*1,
      y: parentHole.y-childHole.y > 0 ? childHole.y + 10 : childHole.y - 10
    }
    // 根据雷管类型绘制不同的路径线
    let strokeDasharray = 0
    if (childHole.detonator === '25ms') strokeDasharray = 5
    if (childHole.detonator === '42ms') strokeDasharray = 15
    return (
      <G key={index}>
        <Path d={`M ${parentHole.x} ${parentHole.y} L ${childHole.x} ${childHole.y}`} stroke="black" strokeDasharray={strokeDasharray} />
        <Path transform={`rotate(${angle},${childHole.x},${childHole.y})`} d={`M ${childHole.x} ${childHole.y} L ${p1.x} ${p1.y}`} stroke="black" />
        <Path transform={`rotate(${angle},${childHole.x},${childHole.y})`} d={`M ${childHole.x} ${childHole.y} L ${p2.x} ${p2.y}`} stroke="black" />
      </G>
    )
  }

  render() {
    let { 
      holes, svgHeight, topLinePoints, navigation, 
      table1Head, table1Data, table2Head, table2Data, 
      save, nameChange, name, tableHead, tableData,
      Q2Change, fillLenChange
    } = this.props
    let topLinePath = ''
    for (let i = 0;i < topLinePoints.length;i++) {
      if (i === 0) topLinePath += "M " + topLinePoints[i].x + ' ' + topLinePoints[i].y + ' '
      if (i !== 0) topLinePath += "T " + topLinePoints[i].x + ' ' + topLinePoints[i].y + ' '
    }
    const Q2Input = (cellData, index) => {
      return <TextInput onChangeText={value => Q2Change(value, index)}>{cellData}</TextInput>
    }
    const fillLenInput = (cellData, index) => {
      return <TextInput onChangeText={value => fillLenChange(value, index)}>{cellData}</TextInput>
    }
    return (
      <ScrollView>
        <Svg
          height={svgHeight}
          width="350"
         >
          {holes.map((item, index) => {
            return <G key={item.number}>
              <Circle cx={item.x} cy={item.y} r="10" fill="white" stroke="black" />
              <SvgText x={item.x-4} y={item.y+5} fontSize="15">
                <TSpan>{item.number}</TSpan>
              </SvgText>
              <SvgText x={item.x-25} y={item.y+4} fontSize="10">
                <TSpan>{item.l}</TSpan>
              </SvgText>
              {this.getPath(index,holes)}
            </G>
          })}
          { topLinePoints.length > 1 ? <Path d={topLinePath} stroke="black" fill="none"/> : null }
        </Svg>
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
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}} style={styles.table}>
            <Row data={table1Head} widthArr={[75,75,75,75,75,75,75,75,75]}></Row>
            <Row data={table1Data} widthArr={[75,75,75,75,75,75,75,75,75]}></Row>
          </Table>
        </ScrollView>
        <ScrollView horizontal={true}>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}} style={styles.table}>
            <Row data={table2Head} widthArr={[75,75,75,75,75,75,75,75,75]}></Row>
            <Row data={table2Data} widthArr={[75,75,75,75,75,75,75,75,75]}></Row>
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
      if (records.find(item => item.name === name)) return Toast.info('名称已存在！', 1)
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