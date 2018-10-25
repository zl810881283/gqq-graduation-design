import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, ScrollView, View} from 'react-native';
import store from '../store'
import { connect } from "react-redux"
import { List, Button } from 'antd-mobile-rn'
import { GetDistance, getVerticalLen } from '../util'

class BlastIndexDesign extends Component {
  static navigationOptions = {
    title: '爆破参数设计'
  }

  render() {
    let { qChange, kChange, HChange, onOk, q, k, H, navigation, lenIndex, lenIndexChange, specChange, spec, holes } = this.props
    return (
      <ScrollView style={styles.container}>
        {holes.map((item, index) => {
          return <View key={index}>
            <Text style={styles.inputTitle}>炮孔编号：{item.number}</Text>
            <List style={{marginBottom:20}}>
              <TextInput
                onChangeText={value => qChange(value, index)}
                style={styles.textInput}
                value={q}
                placeholder="设计单耗q"
              />
            </List> 
          </View>  
        })}
        <Text style={styles.inputTitle}>输入参数：</Text>
        <List style={styles.list}>
          <TextInput
            onChangeText={value => kChange(value)}
            style={styles.textInput}
            value={k}
            placeholder="岩石参数k"
          />
          <TextInput
            onChangeText={value => HChange(value)}
            style={styles.textInput}
            value={H}
            placeholder="台阶高度H"
          />
          <TextInput
            onChangeText={value => specChange(value)}
            style={styles.textInput}
            value={spec}
            placeholder="药卷规格(kg/支)"
          />
          <TextInput
            onChangeText={value => lenIndexChange(value)}
            style={styles.textInput}
            value={lenIndex}
            placeholder="装药长度系数"
          />
        </List>
        <Button onClick={() => onOk(navigation)} type="primary" style={styles.button}>
          <Text style={{fontSize:30}}>生成炮孔参数设计表</Text>
        </Button>
      </ScrollView>
    );
  }
}

let mapStateToProps = state => {
  return {
    ...state.blastIndexDesign,
    ...state.holeIndex
  }
}

let mapDispatchToProps = dispatch => {
  return {
    qChange: (value, index) => {
      let state = store.getState()
      let { holes, focusRender } = state.holeIndex
      holes[index].q = value
      dispatch({
        type: "SET_HOLE_INDEX",
        holeIndex: {
          ...state.holeIndex,
          holes,
          focusRender: !focusRender
        }
      })
    },
    kChange: value => {
      let state = store.getState()
      dispatch({
        type: "SET_BLAST_INDEX_DESIGN",
        holeIndex: {
          ...state.blastIndexDesign,
          k: value
        }
      })
    },
    HChange: value => {
      let state = store.getState()
      dispatch({
        type: "SET_BLAST_INDEX_DESIGN",
        holeIndex: {
          ...state.blastIndexDesign,
          H: value
        }
      })
    },
    lenIndexChange: value => {
      let state = store.getState()
      dispatch({
        type: "SET_BLAST_INDEX_DESIGN",
        holeIndex: {
          ...state.blastIndexDesign,
          lenIndex: value
        }
      })
    },
    specChange: value => {
      let state = store.getState()
      dispatch({
        type: "SET_BLAST_INDEX_DESIGN",
        holeIndex: {
          ...state.blastIndexDesign,
          spec: value
        }
      })
    },
    onOk: (navigation) => {
      let state = store.getState()
      let { holeIndex, blastIndexDesign } = state
      let { holes } = holeIndex, { k, H, lenIndex, spec } = blastIndexDesign
      let tableData = []
      holes.forEach((item,index) => {
        // 排距b
        if (item.type.indexOf('首排炮孔') != -1) {
          item.b = item.W
        } else {
          // 找到最近的两个首排炮孔，在他们的连线上做垂足
          let firstHoles = holes.filter(i => i.type.indexOf('首排炮孔')!=-1)
          let distances = firstHoles.map((i, index2) => {
            return {
              len: GetDistance(i.x, i.y, item.x, item.y).toFixed(2),
              index: index2
            }
          })
          distances.sort((a, b) => a.len - b.len)  // 升序排序
          let firstLen = GetDistance(firstHoles[distances[0].index].x, firstHoles[distances[0].index].y, firstHoles[distances[1].index].x, firstHoles[distances[1].index].y)
          item.b = getVerticalLen(Number(distances[0].len),Number(firstLen),Number(distances[1].len))
        }
        // 孔距a
        if (item.type.indexOf('边角炮孔') != -1) {
          if (index!==holes.length-1) {
            item.a = GetDistance(holes[index+1].x, holes[index+1].y, item.x, item.y).toFixed(2)
          } else {
            item.a = GetDistance(holes[index-1].x, holes[index-1].y, item.x, item.y).toFixed(2)
          }
        } else {
          let a1 = GetDistance(holes[index+1].x, holes[index+1].y, item.x, item.y).toFixed(2)
          let a2 = GetDistance(holes[index-1].x, holes[index-1].y, item.x, item.y).toFixed(2)
          item.a = ((Number(a1) + Number(a2))/2).toFixed(2)
        }

        tableData.push([
          item.number,
          item.W,
          item.b,
          item.a,
          item.l,
          item.h,
          item.q,
          item.Q,
          item.Q2,
          item.mediCount,
          item.mediLen,
          item.fillLen
        ])
      })
      dispatch({
        type: 'SET_HOLE_INDEX_TABLE',
        holeIndexTable: {
          ...state.holeIndexTable,
          tableData
        }
      })
      navigation.navigate('HoleIndexTable')
    }
  }
}

const styles = StyleSheet.create({
  container: {
    fontSize: 20
  },
  list: {
    height: 80,
    marginBottom: 350
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
    marginBottom: 180
  },
  button: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BlastIndexDesign)