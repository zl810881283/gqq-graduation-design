import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import store from '../store'
import { connect } from "react-redux"
import { List, Button, WhiteSpace, Radio } from 'antd-mobile-rn'

const RadioItem = Radio.RadioItem

class HoleIndex extends Component {
  static navigationOptions = {
    title: '炮孔参数'
  }

  componentWillMount = () => {
    this.props.created()
  }

  render() {
    let {
      topLinePointChange, holesGPSChange, holesNumberChange, 
      holesLChange, resistLineLChange, onOk, topLinePoints, addHole, 
      addPoint, holes, resistLine, focusRender, radioData, holeTypeChange
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
            }) }
          </List>          
        </View>
        <Button onClick={addPoint} type="primary" style={styles.button}>
          <Text style={{fontSize:30}}>增加测点</Text>
        </Button>
        {holes.map((item, index) => {
          return (<View key={index} style={styles.holeTextInputs}>
            <Text style={styles.inputTitle}>炮孔参数：</Text>
            <List renderHeader={() => '炮孔类型'} style={{marginBottom: 20,fontSize: 50}}>
              {radioData.map(i => (
                <RadioItem 
                  key={i.value} 
                  checked={item.type === i.value}
                  onChange={() => holeTypeChange(i.value, index)}
                  style={styles.typeRadio}>
                  <Text style={{fontSize: 25}}>{i.value}</Text>
                </RadioItem>
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
        <Button onClick={onOk} type="primary" style={styles.button}>
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
        l: ''
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
    addPoint: () => {
      let state = store.getState()
      let { topLinePoints, focusRender } = state.holeIndex
      topLinePoints.push({ GPS: '' })
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
      holes[index].type = value
      dispatch({
        type: "SET_HOLE_INDEX",
        holeIndex: {
          ...state.holeIndex,
          holes,
          focusRender: !focusRender
        }
      })
    },
    onOk: () => {}
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