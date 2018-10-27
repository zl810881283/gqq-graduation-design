import React, {Component} from 'react';
import { connect } from "react-redux"
import { StyleSheet, ScrollView} from 'react-native';
import Svg,{ Circle, Path, Text, TSpan, G} from 'react-native-svg'
import { Button } from 'antd-mobile-rn'

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
      x: parentHole.x-childHole.x > 0 ? childHole.x + 15*1: childHole.x - 15*1,
      y: parentHole.y-childHole.y > 0 ? childHole.y + 30 : childHole.y - 30 
    }
    let p2 = {
      x: parentHole.x-childHole.x < 0 ? childHole.x + 15*1 : childHole.x - 15*1,
      y: parentHole.y-childHole.y > 0 ? childHole.y + 30 : childHole.y - 30
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
    let { holes, topLinePoints, navigation } = this.props
    let topLinePath = ''
    for (let i = 0;i < topLinePoints.length;i++) {
      if (i === 0) topLinePath += "M " + topLinePoints[i].x + ' ' + topLinePoints[i].y + ' '
      if (i !== 0) topLinePath += "T " + topLinePoints[i].x + ' ' + topLinePoints[i].y + ' '
    }
    return (
      <ScrollView>
        <Svg
          height="1200"
          width="800"
         >
          {holes.map((item, index) => {
            return <G key={item.number}>
              <Circle cx={item.x} cy={item.y} r="20" fill="white" stroke="black" />
              <Text x={item.x-8} y={item.y+10} fontSize="30">
                <TSpan>{item.number}</TSpan>
              </Text>
              {this.getPath(index,holes)}
            </G>
          })}
          <Path d={topLinePath} stroke="black" fill="none"/>
        </Svg>
        {/* <Button onClick={() => navigation.navigate('Home')} type="primary" style={styles.button}>
          <Text style={{fontSize:20}}>返回主页</Text>
        </Button> */}
      </ScrollView>
    )
  }
}

let mapStateToProps = state => {
  return state.holeIndex
}

let mapDispatchToProps = dispatch => {
  return {
  }
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    margin: 30
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Result)