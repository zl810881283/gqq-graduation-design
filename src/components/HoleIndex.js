import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import store from '../store'
import { connect } from "react-redux"
import { List, Button, WhiteSpace, Checkbox, InputItem } from 'antd-mobile-rn'
import { findMaxAndMin, latLng2WebMercator } from '../util'

const CheckboxItem = Checkbox.CheckboxItem

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
      holesLChange, WChange, onOk, topLinePoints, addHole, 
      addPoint, holes, focusRender, radioData, holeTypeChange,
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
            <List renderHeader={() => '炮孔类型'} style={{marginBottom: 10,fontSize: 25}}>
              {radioData.map(i => (
                <CheckboxItem 
                  key={i.value} 
                  checked={item.type.indexOf(i.value) != -1}
                  onChange={() => holeTypeChange(i.value, index)}
                  style={styles.typeRadio}>
                  <Text style={{fontSize: 12}}>{i.value}</Text>
                </CheckboxItem>
              ))}
            </List>
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
                placeholder="GPS数据(经度 纬度)"
              />
              <InputItem
                onChange={value => holesLChange(value, index)}
                style={styles.textInput}
                value={item.l}
                placeholder="孔深"
              />
              {item.type.indexOf('首排炮孔') != -1 ? <InputItem
                onChange={value => WChange(value, index)}
                style={styles.textInput}
                value={item.W}
                placeholder="首排炮孔抵抗线"
              /> : null}
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
    WChange: (value, index) => {
      let state = store.getState()
      let { holes, focusRender } = state.holeIndex
      holes[index].W = value
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
      let { holes, focusRender } = state.holeIndex
      holes[index].l = value
      dispatch({
        type: "SET_HOLE_INDEX",
        holeIndex: {
          ...state.holeIndex,
          holes,
          focusRender: !focusRender
        }
      })
    },
    holeTypeChange: (value, index) => {
      let state = store.getState()
      let { holes, focusRender } = state.holeIndex
      let typeIndex = holes[index].type.indexOf(value)
      if (typeIndex != -1) {
        holes[index].type.splice(typeIndex, 1)
      } else {
        holes[index].type.push(value)
      }
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
      let longitudes = [], latitudes = [], holesLen = holes.length
      holes.map(item => {
        let Gps = item.GPS.split(/\s+/)
        Gps = latLng2WebMercator(Gps[0], Gps[1])
        longitudes.push(Number(Gps[0]).toFixed(2))
        latitudes.push(Number(Gps[1]).toFixed(2))
      })
      topLinePoints.map(item => {
        let Gps = item.GPS.split(/\s+/)
        if (Gps.length<2) return 
        Gps = latLng2WebMercator(Gps[0], Gps[1])
        longitudes.push(Number(Gps[0]).toFixed(2))
        latitudes.push(Number(Gps[1]).toFixed(2))
      })
      let longMaxMin = findMaxAndMin(longitudes)
      let maxLong = longMaxMin.max, minLong= longMaxMin.min
      let latiMaxMin = findMaxAndMin(latitudes)
      let minLati = latiMaxMin.min
      let unit = Number(300 / ((maxLong-minLong) * 100)).toFixed(1)  // 比例尺
      holes.forEach((item, index) => {
        item.x = Number(((longitudes[index] - minLong)*100*unit).toFixed(1)) + 25
        item.y = Number(((latitudes[index] - minLati)*100*unit).toFixed(1)) + 25
        if (item.y > svgHeight) svgHeight = item.y
      })
      topLinePoints.forEach((item, index) => {
        item.x = Number(((longitudes[index+holesLen] - minLong)*100*unit).toFixed(1)) + 25
        item.y = Number(((latitudes[index+holesLen] - minLati)*100*unit).toFixed(1)) + 25
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
    }
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
    marginBottom: 120
  },
  button: {
    height:30,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15
  },
  typeRadio: {
    height: 25
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HoleIndex)