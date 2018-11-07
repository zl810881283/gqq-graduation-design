import React, {Component} from 'react';
import { connect } from "react-redux"
import { StyleSheet, ScrollView, Text, Modal, View} from 'react-native';
import Svg,{ Circle, Path, Text as SvgText, TSpan, G} from 'react-native-svg'
import { Button, Checkbox, List, InputItem } from 'antd-mobile-rn'
import store from '../store'

const CheckboxItem = Checkbox.CheckboxItem

class Diagram extends Component {
  static navigationOptions = {
    title: '炮孔示意图'
  }

  render() {
    let { holes, topLinePoints, navigation, svgHeight, 
      holeCilck, holesModal, modalConfirm, radioData,
      holesModalIndex, holeTypeChange, holesNumberChange, WChange } = this.props
    let topLinePath = ''
    for (let i = 0;i < topLinePoints.length;i++) {
      if (i === 0) topLinePath += "M " + topLinePoints[i].x + ' ' + topLinePoints[i].y + ' '
      if (i !== 0) topLinePath += "T " + topLinePoints[i].x + ' ' + topLinePoints[i].y + ' '
    }
    let fisrtLineHoles = holes.filter(item => item.type.indexOf('首排炮孔')!=-1)
    return (
      <ScrollView>
        <Svg
          height={svgHeight}
          width="350"
        >
          {holes.map((item, index) => {
            return <G key={item.number} onPressOut={() => holeCilck(index)}>
              <Circle cx={item.x} cy={item.y} r="10" fill="white" stroke="black" />
              <SvgText x={item.x-4} y={item.y+5} fontSize="15">
                <TSpan>{item.number}</TSpan>
              </SvgText>
            </G>
          })}
          { topLinePoints.length > 1 ? <Path d={topLinePath} stroke="black" fill="none"/> : null }
          {fisrtLineHoles.map((item, index) => index !== 0 ? <Path d={`M ${fisrtLineHoles[index-1].x} ${fisrtLineHoles[index-1].y} L ${item.x} ${item.y}`} stroke="black" key={index}/> : null)}
        </Svg>
        <Button onClick={() => this.props.navigation.navigate('BlastIndexDesign')} type="primary" style={styles.button}>
          <Text style={{fontSize:15}}>下一步</Text>
        </Button>        
        <Button onClick={() => navigation.navigate('Home')} type="primary" style={styles.button}>
          <Text style={{fontSize:15}}>返回主页</Text>
        </Button>
        <Modal
          animationType="slide"
          transparent={false}
          visible={holesModal}>
          <ScrollView style={{marginTop: 40}}>
            <Text style={styles.inputTitle}>炮孔参数：</Text>
            <List renderHeader={() => '炮孔类型'} style={{marginBottom: 10,fontSize: 25}}>
              {radioData.map(i => (
                <CheckboxItem 
                  key={i.value} 
                  checked={holes[holesModalIndex].type.indexOf(i.value) != -1}
                  onChange={() => holeTypeChange(i.value)}
                  style={styles.typeRadio}>
                  <Text style={{fontSize: 12}}>{i.value}</Text>
                </CheckboxItem>
              ))}
            </List>    
            <List style={styles.list}>
              <InputItem
                onChange={value => holesNumberChange(value)}
                style={styles.textInput}
                value={holes[holesModalIndex].number}
                placeholder="孔号"
              />
              {holes[holesModalIndex].type.indexOf('首排炮孔') != -1 ? <InputItem
                onChange={value => WChange(value)}
                style={styles.textInput}
                value={holes[holesModalIndex].W}
                placeholder="首排炮孔抵抗线"
              /> : null}
            </List>
            <Button onClick={modalConfirm} type="primary" style={styles.button}>
              <Text style={{fontSize:15}}>完成</Text>
            </Button>
          </ScrollView>
        </Modal>
      </ScrollView>
    )
  }
}

let mapStateToProps = state => {
  return {
    ...state.holeIndex,
    svgHeight: state.svgHeight,
    holesModal: state.holesModal,
    radioData: state.holeIndex.radioData,
    holesModalIndex: state.holesModalIndex
  }
}

let mapDispatchToProps = dispatch => {
  return {
    holeCilck: index => {
      dispatch({
        type: "SET_HOLES_MODAL_INDEX",
        holesModalIndex: index
      })
      dispatch({
        type: 'SET_HOLES_MODAL',
        holesModal: true
      })
    },
    modalConfirm: () => {
      dispatch({
        type: 'SET_HOLES_MODAL',
        holesModal: false
      })
    },
    holeTypeChange: value => {
      let state = store.getState()
      let { holes, focusRender } = state.holeIndex
      let index = state.holesModalIndex
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
    WChange: value => {
      let state = store.getState()
      let { holes, focusRender } = state.holeIndex
      let index = state.holesModalIndex
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
    holesNumberChange: value => {
      let state = store.getState()
      let { holes, focusRender } = state.holeIndex
      let index = state.holesModalIndex
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
  }
}

const styles = StyleSheet.create({
  button: {
    height:30,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15
  },
  inputTitle: {
    fontSize: 15,
    margin: 10
  },
  typeRadio: {
    height: 25
  },
  textInput: {
    height:40,
    fontSize:15,
    marginLeft: 10,
  },
  list: {
    marginBottom: 10
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Diagram)