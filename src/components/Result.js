import React, {Component} from 'react';
import { connect } from "react-redux"
import Svg,{ Circle, Path, TSpan, G, Text as SvgText} from 'react-native-svg'
import { StyleSheet, ScrollView, View, Text, TextInput} from 'react-native';
import { Button, List, Toast } from 'antd-mobile-rn'
import { Table, Row } from 'react-native-table-component'
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
    let angle = parentHole.x-childHole.x < 0 ? theta-90 : 90-theta
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
    let { holes, svgHeight, topLinePoints, navigation, table1Head, table1Data, table2Head, table2Data, save, nameChange, name} = this.props
    let topLinePath = ''
    for (let i = 0;i < topLinePoints.length;i++) {
      if (i === 0) topLinePath += "M " + topLinePoints[i].x + ' ' + topLinePoints[i].y + ' '
      if (i !== 0) topLinePath += "T " + topLinePoints[i].x + ' ' + topLinePoints[i].y + ' '
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
    name: state.name,
    svgHeight: state.svgHeight
  }
}

let mapDispatchToProps = dispatch => {
  return {
    save: async () => {
      let state = store.getState()
      let {name, records, holeIndex, gridIndex, holeIndexTable, blastIndexDesign} = state
      if (name === '') return Toast.info('请先填写名称！', 1)
      if (records.find(item => item.name === name)) return Toast.info('名称已存在！', 1)
      storage.save({
        key: 'records',
        id: name,
        data: {
          name,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Result)