import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, InputItem} from 'react-native';
import store from '../store'
import { connect } from "react-redux"
import { List, Button, WhiteSpace, Checkbox } from 'antd-mobile-rn'
import { findMaxAndMin } from '../util'

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
      holesLChange, resistLineLChange, onOk, topLinePoints, addHole, 
      addPoint, holes, resistLine, focusRender, radioData, holeTypeChange,
      deletePoint, deleteHole
    } = this.props
    return (
      <ScrollView style={styles.container}>
        <View style={{marginBottom: (topLinePoints.length-1)*80+30}}>
          <Text style={styles.inputTitle}>坡顶线测点处GPS数据：</Text>
          <List style={styles.list}>
            {topLinePoints.map((item, index) => {
              return <TextInput
                key={index}
                onChangeText={value => topLinePointChange(value, index)}
                style={styles.textInput}
                value={item.GPS}
                placeholder="测点GPS"
              />
            })}
          </List>          
        </View>
        <Button onClick={addPoint} type="primary" style={styles.button}>
          <Text style={{fontSize:30}}>增加测点</Text>
        </Button>
        <Button onClick={deletePoint} type="warning" style={styles.button}>
          <Text style={{fontSize:30}}>删除测点</Text>
        </Button>
        {holes.map((item, index) => {
          return (<View key={index} style={styles.holeTextInputs}>
            <Text style={styles.inputTitle}>炮孔参数：</Text>
            <List renderHeader={() => '炮孔类型'} style={{marginBottom: 20,fontSize: 50}}>
              {radioData.map(i => (
                <CheckboxItem 
                  key={i.value} 
                  checked={item.type.indexOf(i.value) != -1}
                  onChange={() => holeTypeChange(i.value, index)}
                  style={styles.typeRadio}>
                  <Text style={{fontSize: 25}}>{i.value}</Text>
                </CheckboxItem>
              ))}
            </List>
            <List style={styles.list}>
              <TextInput
                onChangeText={value => holesNumberChange(value, index)}
                style={styles.textInput}
                value={item.number}
                placeholder="孔号"
              />
              <TextInput
                onChangeText={value => holesGPSChange(value, index)}
                style={styles.textInput}
                value={item.GPS}
                placeholder="GPS数据"
              />
              <TextInput
                onChangeText={value => holesLChange(value, index)}
                style={styles.textInput}
                value={item.l}
                placeholder="孔深"
              />
              {item.type === '首排炮孔' ? <TextInput
                onChangeText={value => resistLineLChange(value)}
                style={styles.textInput}
                value={resistLine}
                placeholder="首排炮孔抵抗线"
              /> : null}
            </List>
          </View>)
        })}
        <Button onClick={addHole} type="primary" style={styles.button}>
          <Text style={{fontSize:30}}>增加炮孔</Text>
        </Button>
        <Button onClick={deleteHole} type="warning" style={styles.button}>
          <Text style={{fontSize:30}}>删除炮孔</Text>
        </Button>
        <Button onClick={() => onOk(navigation)} type="primary" style={styles.button}>
          <Text style={{fontSize:30}}>生成炮孔布置示意图</Text>
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
    topLinePointChange: value => {
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
        GPS: '',
        resistLine: '',
        type: '',
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
        y: ''
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
    resistLineLChange: value => {
      let state = store.getState()
      let { holes, focusRender } = state.holeIndex
      holes[index].resistLine = value
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
      let { holes, topLinePoints } = state.holeIndex
      let longitudes = [], latitudes = [], holesLen = holes.length
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
      navigation.navigate('Diagram')
    }
  }
}

const styles = StyleSheet.create({
  container: {
    fontSize: 20
  },
  list: {
    height: 80,
    marginBottom: 20
  },
  inputTitle: {
    fontSize: 30,
    margin: 20
  },
  textInput: {
    height:80,
    fontSize:30,
    marginLeft: 20,
  },
  holeTextInputs: {
    marginBottom: 240
  },
  button: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30
  },
  typeRadio: {
    height: 50
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HoleIndex)