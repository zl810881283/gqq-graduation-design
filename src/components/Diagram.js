import React, {Component} from 'react';
import { connect } from "react-redux"
import store from '../store'
import { StyleSheet, ScrollView} from 'react-native';
import Svg,{ Circle, Path, Text, TSpan, G} from 'react-native-svg'
import { findMaxAndMin } from '../util'

class Diagram extends Component {
  static navigationOptions = {
    title: '炮孔示意图'
  }

  componentWillMount() {
    // this.props.initGpsData()
  }

  render() {
    let { holes, topLinePoints } = this.props
    return (
      <ScrollView>
        <Svg
          height="1000"
          width="1000"
        >
          {holes.map(item => {
            return <G key={item.number}>
              <Circle cx={item.x} cy={item.y} r="20" fill="white" stroke="black" />
              <Text x={item.x-8} y={item.y+10} fontSize="30">
                <TSpan>{item.number}</TSpan>
              </Text>
            </G>
          })}
          {/* <Path d=" M 50 50 L 60 60 " stroke="black" /> */}
        </Svg>
      </ScrollView>
    )
  }
}

let mapStateToProps = state => {
  return state.holeIndex
}

let mapDispatchToProps = dispatch => {
  return {
    initGpsData: () => {
      let state = store.getState()
      let { holes, topLinePoints } = state.holeIndex
      let longitudes = [], latitudes = [], holesLen = holes.length
      holes = holes.sort((a, b) => {      // 根据经度进行升序排序
        let aLong = a.GPS.split(' ')[0]
        let bLong = b.GPS.split(' ')[0]
        return aLong - bLong
      })
      topLinePoints = topLinePoints.sort((a, b) => {    // 根据经度进行升序排序
        let aLong = a.GPS.split(' ')[0]
        let bLong = b.GPS.split(' ')[0]
        return aLong - bLong
      })
      holes.map(item => {
        let Gps = item.GPS.split(' ')
        longitudes.push(Number(Gps[0]).toFixed(7))
        latitudes.push(Number(Gps[1]).toFixed(7))
      })
      topLinePoints.map(item => {
        let Gps = item.GPS.split(' ')
        longitudes.push(Number(Gps[0]).toFixed(7))
        latitudes.push(Number(Gps[1]).toFixed(7))
      })
      let longMaxMin = findMaxAndMin(longitudes)
      let maxLong = longMaxMin.max, minLong= longMaxMin.min
      let latiMaxMin = findMaxAndMin(latitudes)
      let minLati = latiMaxMin.min
      let unit = Number(700 / ((maxLong-minLong) * 10000000)).toFixed(1)  // 比例尺
      holes.forEach((item, index) => {
        item.x = Number(((longitudes[index] - minLong)*10000000*unit).toFixed(1)) + 50
        item.y = Number(((latitudes[index] - minLati)*10000000*unit).toFixed(1)) + 50
      })
      topLinePoints.forEach((item, index) => {
        item.x = Number(((longitudes[index+holesLen] - minLong)*10000000*unit).toFixed(1)) + 50
        item.y = Number(((latitudes[index+holesLen] - minLati)*10000000*unit).toFixed(1)) + 50
      })
      dispatch({
        type: "SET_HOLE_INDEX",
        holeIndex: {
          ...state.holeIndex,
          holes
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Diagram)