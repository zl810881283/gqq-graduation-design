import React, {Component} from 'react';
import { connect } from "react-redux"
import { StyleSheet, ScrollView, Text, Modal} from 'react-native';
import Svg,{ Circle, Path, Text as SvgText, TSpan, G} from 'react-native-svg'
import { Button, Checkbox, List, InputItem, Radio } from 'antd-mobile-rn'
import store from '../store'

const CheckboxItem = Checkbox.CheckboxItem
const RadioItem = Radio.RadioItem

class HoleChart extends Component {
  static navigationOptions = {
    title: '炮孔示意图'
  }

  getPath = (index, holes) => {
    let parentNumber = holes[index].parentNumber
    if (parentNumber === '') return null
    let parentIndex = holes.findIndex(item => item.number === parentNumber)
    let parentHole = holes[parentIndex], childHole = holes[index]
    if(!parentHole) return
    if(parentNumber==holes[index].number) return 
    // 计算箭头两点的位置
    let dx = parentHole.x-childHole.x
    let dy = parentHole.y-childHole.y
    let theta = Math.atan(Math.abs(dy)/Math.abs(dx))
    theta *= 180 / Math.PI
    let angle = theta-90
    if (dx>0 && dy<0) angle = 90-theta
    let p1 = {
      x: dx > 0 ? childHole.x + 5*1.5: childHole.x - 5*1.5,
      y: dy > 0 ? childHole.y + 15 : childHole.y - 15 
    }
    let p2 = {
      x: dx < 0 ? childHole.x + 5*1.5 : childHole.x - 5*1.5,
      y: dy > 0 ? childHole.y + 15 : childHole.y - 15
    }
    // 根据雷管类型绘制不同的路径线
    let strokeDasharray = 0
    if (childHole.detonator === '25ms') strokeDasharray = 5
    if (childHole.detonator === '42ms') strokeDasharray = 0
    return (
      <G key={index+'holePath'}>
        <Path key={index+'holePath1'} d={`M ${parentHole.x} ${parentHole.y} L ${childHole.x} ${childHole.y}`} stroke="black" strokeDasharray={strokeDasharray} />
        <Path key={index+'holePath2'} transform={`rotate(${angle},${childHole.x},${childHole.y})`} d={`M ${childHole.x} ${childHole.y} L ${p1.x} ${p1.y}`} stroke="black" />
        <Path key={index+'holePath3'} transform={`rotate(${angle},${childHole.x},${childHole.y})`} d={`M ${childHole.x} ${childHole.y} L ${p2.x} ${p2.y}`} stroke="black" />
      </G>
    )
  }

  render() {
    let { holes, topLinePoints, svgHeight, 
      holeCilck, holesModal, modalConfirm, radioData, parentNumberChange,
      holesModalIndex, holeTypeChange, holesNumberChange, WChange, 
      focusRender, onModalClose, detonators, detonatorChange } = this.props
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
            if (!item.x) return null
            return <G key={index+'holes'} onPressOut={() => holeCilck(index)}>
              <Circle cx={item.x} cy={item.y} r="10" fill="white" stroke="black" />
              <SvgText x={item.x-4*item.number.length} y={item.y+5} fontSize="15">
                <TSpan>{item.number}</TSpan>
              </SvgText>
              { item.parentNumber ? this.getPath(index,holes) : null }
            </G>
        })}
          { topLinePoints.length > 1 ? <Path d={topLinePath} stroke="black" fill="none"/> : null }
        </Svg>
        <Modal
          title="炮孔参数"
          animationType="slide"
          transparent={false}
          visible={holesModal}
          onRequestClose={onModalClose}>
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
            <List>
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
              <InputItem
                onChange={value => parentNumberChange(value)}
                style={styles.textInput}
                value={holes[holesModalIndex].parentNumber}
                placeholder="前一炮孔编号(起始炮孔不填)"
              />
            </List>
            <List renderHeader={() => '雷管类型'} style={styles.list}>
              {detonators.map(i => (
                <RadioItem 
                  key={i.value} 
                  checked={i.value === holes[holesModalIndex].detonator}
                  onChange={() => detonatorChange(i.value)}>
                  <Text style={{fontSize: 12}}>{i.value}</Text>
                </RadioItem>
              ))}
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
    ...state.gridIndex,
    svgHeight: state.svgHeight,
    holesModal: state.holesModal,
    radioData: state.holeIndex.radioData,
    holesModalIndex: state.holesModalIndex,
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
    parentNumberChange: value => {
      let state = store.getState()
      let { holes, focusRender } = state.holeIndex
      let index = state.holesModalIndex
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
    detonatorChange: value => {
      let state = store.getState()
      let { holes, focusRender } = state.holeIndex
      let index = state.holesModalIndex
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
    onModalClose: () => {}
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

export default connect(mapStateToProps, mapDispatchToProps)(HoleChart)