import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import store from '../store'
import { connect } from "react-redux"
import { List, InputItem, Button, Radio } from 'antd-mobile-rn'

const RadioItem = Radio.RadioItem

class GridIndexDesign extends Component {
  static navigationOptions = {
    title: '起爆网络设计'
  }
  render() {
    let {holes, detonators, parentNumberChange, detonatorChange, onOk, navigation, focusRender} = this.props
    return (
      <ScrollView style={styles.container}>
        {holes.map((item, index) => {
          return <View key={index}>
            <Text style={styles.inputTitle}>炮孔编号：{item.number}</Text>
            <List style={{marginBottom:20}}>
              <TextInput
                onChangeText={value => parentNumberChange(value, index)}
                style={styles.textInput}
                value={item.parentNumber}
                placeholder="前一炮孔编号"
              />
            </List>
            <List renderHeader={() => '雷管类型'}>
              {detonators.map(i => (
                <RadioItem 
                  key={i.value} 
                  checked={i.value === item.detonator}
                  onChange={() => detonatorChange(i.value, index)}>
                  <Text style={{fontSize: 25}}>{i.value}</Text>
                </RadioItem>
              ))}
            </List>
          </View>
        })}
        <Button onClick={() => onOk(navigation)} type="primary" style={styles.button}>
          <Text style={{fontSize:30}}>完成</Text>
        </Button>
      </ScrollView>
    );
  }
}

let mapStateToProps = state => {
  return {
    ...state.gridIndex,
    holes: state.holeIndex.holes,
    focusRender: state.holeIndex.focusRender
  }
}

let mapDispatchToProps = dispatch => {
  return {
    parentNumberChange: (value, index) => {
      let state = store.getState()
      let { holes, focusRender } = state.holeIndex
      holes[index].parentNumber = value
      dispatch({
        type: "SET_HOLE_INDEX",
        holeIndex: {
          ...state.holeIndex,
          holes,
          focusRender: !focusRender
        }
      })
    },
    detonatorChange: (value, index) => {
      let state = store.getState()
      let { holes, focusRender } = state.holeIndex
      holes[index].detonator = value
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
      navigation.navigate('Result')
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
    margin: 30
  },
  typeRadio: {
    height: 50
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GridIndexDesign)