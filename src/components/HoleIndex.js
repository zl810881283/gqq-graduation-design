import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import store from '../store'
import { connect } from "react-redux"
import { List, Button, WhiteSpace, InputItem } from 'antd-mobile-rn'
import { findMaxAndMin } from '../util'

class HoleIndex extends Component {
  static navigationOptions = {
    title: '炮孔参数'
  }

  componentWillMount = () => {
    this.props.created()
  }

  render() {
    let {
      topLinePointChange, holesGPSChange, holesNumberChange, navigation,
      holesLChange, onOk, topLinePoints, addHole, 
      addPoint, holes, focusRender,
      deletePoint, deleteHole
    } = this.props
    return (
      <ScrollView style={styles.container}>
        <View style={{marginBottom: (topLinePoints.length-1)*40+15}}>
          <Text style={styles.inputTitle}>坡顶线测点处GPS数据：</Text>
          <List style={styles.list}>
            {topLinePoints.map((item, index) => {
              return <InputItem
                key={index}
                onChange={value => topLinePointChange(value, index)}
                style={styles.textInput}
                value={item.GPS}
                placeholder="测点GPS(经度 纬度)"
              />
            })}
          </List>  
        </View>
        <Button onClick={addPoint} type="primary" style={styles.button}>
          <Text style={{fontSize:15}}>增加测点</Text>
        </Button>
        <Button onClick={deletePoint} type="warning" style={styles.button}>
          <Text style={{fontSize:15}}>删除测点</Text>
        </Button>
        {holes.map((item, index) => {
          return (<View key={index} style={styles.holeTextInputs}>
            <Text style={styles.inputTitle}>炮孔参数：</Text>
            <List style={styles.list}>
              <InputItem
                onChange={value => holesNumberChange(value, index)}
                style={styles.textInput}
                value={item.number}
                placeholder="孔号"
              />
              <InputItem
                onChange={value => holesGPSChange(value, index)}
                style={styles.textInput}
                value={item.GPS}
                placeholder="GPS数据(X Y Z)"
              />
              <InputItem
                onChange={value => holesLChange(value, index)}
                style={styles.textInput}
                value={item.l}
                placeholder="孔深"
              />
            </List>
          </View>)
        })}
        <Button onClick={addHole} type="primary" style={styles.button}>
          <Text style={{fontSize:15}}>增加炮孔</Text>
        </Button>
        <Button onClick={deleteHole} type="warning" style={styles.button}>
          <Text style={{fontSize:15}}>删除炮孔</Text>
        </Button>
        <Button onClick={() => onOk(navigation)} type="primary" style={styles.button}>
          <Text style={{fontSize:15}}>生成炮孔布置示意图</Text>
        </Button>
      </ScrollView>
    );
  }
}

let mapStateToProps = state => {
  return state.holeIndex
}

let mapDispatchToProps = dispatch => {
  return {
    created: () => {},
    topLinePointChange: (value, index) => {
      let state = store.getState()
      let { topLinePoints, focusRender } = state.holeIndex
      topLinePoints[index].GPS = value
      dispatch({
        type: "SET_HOLE_INDEX",
        holeIndex: {
          ...state.holeIndex,
          topLinePoints,
          focusRender: !focusRender
        }
      })
    },
    addHole: () => {
      let state = store.getState()
      let { holes, focusRender } = state.holeIndex
      holes.push({    
        number: '',
        parentNumber: '',
        detonator: '',
        GPS: '',
        resistLine: '',
        type: [],
        q: '',
        Q: '',
        Q2: '',
        W: '',
        b: '',
        a: '',
        l: '',
        h: '',
        mediCount: '',
        mediLen: '',
        fillLen: '',
        x: '',
        y: '',
      })
      dispatch({
        type: "SET_HOLE_INDEX",
        holeIndex: {
          ...state.holeIndex,
          holes,
          focusRender: !focusRender
        }
      })
    },
    deleteHole: () => {
      let state = store.getState()
      let { holes, focusRender } = state.holeIndex
      holes.splice(holes.length-1,1)
      dispatch({
        type: "SET_HOLE_INDEX",
        holeIndex: {
          ...state.holeIndex,
          holes,
          focusRender: !focusRender
        }
      })
    },
    addPoint: () => {
      let state = store.getState()
      let { topLinePoints, focusRender } = state.holeIndex
      topLinePoints.push({ 
        GPS: '',
        x: '',
        y: '' 
      })
      dispatch({
        type: "SET_HOLE_INDEX",
        holeIndex: {
          ...state.holeIndex,
          topLinePoints,
          focusRender: !focusRender
        }
      })
    },
    deletePoint: () => {
      let state = store.getState()
      let { topLinePoints, focusRender } = state.holeIndex
      topLinePoints.splice(topLinePoints.length-1, 1)
      dispatch({
        type: "SET_HOLE_INDEX",
        holeIndex: {
          ...state.holeIndex,
          topLinePoints,
          focusRender: !focusRender
        }
      })
    },
    holesGPSChange: (value, index) => {
      let state = store.getState()
      let { holes, focusRender } = state.holeIndex
      holes[index].GPS = value
      dispatch({
        type: "SET_HOLE_INDEX",
        holeIndex: {
          ...state.holeIndex,
          holes,
          focusRender: !focusRender
        }
      })
    },
    holesNumberChange: (value, index) => {
      let state = store.getState()
      let { holes, focusRender } = state.holeIndex
      holes[index].number = value
      dispatch({
        type: "SET_HOLE_INDEX",
        holeIndex: {
          ...state.holeIndex,
          holes,
          focusRender: !focusRender
        }
      })
    },
    holesLChange: (value, index) => {
      let state = store.getState()
      let { lAndH } = state, h = ''
      let { holes, focusRender } = state.holeIndex
      // 计算超深
      if (value<lAndH[0].l) {
        h = lAndH[0].h
      } else if (value>lAndH[lAndH.length-1].l) {
        h = lAndH[lAndH.length-1].h
      } else {
        for (let i = 0;i < lAndH.length;i++) {
          if (value == lAndH[i].l) {
            h = lAndH[i].h
            break
          } else if (i!=lAndH.length-1 && value>lAndH[i].l && value<lAndH[i+1].l) {
            if (lAndH[i].h === lAndH[i+1].h) {
              h = lAndH[i].h
            } else {
              let ratio = ((value - lAndH[i].l)/(lAndH[i+1].l -lAndH[i].l)).toFixed(1)
              let d = lAndH[i+1].h - lAndH[i].h
              h = lAndH[i].h + d*ratio
            }
            break
          }
        }
      }
      holes[index].l = value
      holes[index].h = h
      dispatch({
        type: "SET_HOLE_INDEX",
        holeIndex: {
          ...state.holeIndex,
          holes,
          focusRender: !focusRender
        }
      })
    },
    onOk: (navigation) => {
      let state = store.getState()
      let {svgHeight} = state
      let { holes, topLinePoints } = state.holeIndex
      let xs = [], ys = [], holesLen = holes.length
      holes.map(item => {
        let Gps = item.GPS.split(/\s+/)
        xs.push(Number(Gps[0]).toFixed(2))
        ys.push(Number(Gps[1]).toFixed(2))
        item.z = Gps[2]
      })
      topLinePoints.map(item => {
        let Gps = item.GPS.split(/\s+/)
        if (Gps.length<3) return
        xs.push(Number(Gps[0]).toFixed(2))
        ys.push(Number(Gps[1]).toFixed(2))
        item.z = Gps[2]
      })
      let xMaxMin = findMaxAndMin(xs)
      let maxX = xMaxMin.max, minX= xMaxMin.min
      let yMaxMin = findMaxAndMin(ys)
      let minY = yMaxMin.min
      let unit = Number(300 / (maxX-minX)).toFixed(1)  // 比例尺
      holes.forEach((item, index) => {
        item.x = Number(((xs[index] - minX)*unit).toFixed(1)) + 25
        item.y = Number(((ys[index] - minY)*unit).toFixed(1)) + 25
        if (item.y > svgHeight) svgHeight = item.y
      })
      topLinePoints.forEach((item, index) => {
        item.x = Number(((xs[index+holesLen] - minX)*unit).toFixed(1)) + 25
        item.y = Number(((ys[index+holesLen] - minY)*unit).toFixed(1)) + 25
        if (item.y > svgHeight) svgHeight = item.y
      })
      dispatch({
        type: "SET_HOLE_INDEX",
        holeIndex: {
          ...state.holeIndex,
          holes
        }
      })
      dispatch({
        type: "SET_SVG_HEIGHT",
        svgHeight: svgHeight + 25
      })
      navigation.navigate('Diagram')
    },
  }
}

const styles = StyleSheet.create({
  container: {
    fontSize: 10
  },
  list: {
    height: 40,
    marginBottom: 10
  },
  inputTitle: {
    fontSize: 15,
    margin: 10
  },
  textInput: {
    height:40,
    fontSize:15,
    marginLeft: 10,
  },
  holeTextInputs: {
    marginBottom: 90
  },
  button: {
    height:30,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15
  },
  typeRadio: {
    height: 25
  },
  hStyle: {
    fontSize: 15,
    margin: 8
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HoleIndex)