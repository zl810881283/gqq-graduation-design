import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, ScrollView} from 'react-native';
import store from '../store'
import { connect } from "react-redux"
import { List, Button } from 'antd-mobile-rn'

class BlastIndexDesign extends Component {
  static navigationOptions = {
    title: '爆破参数设计'
  }

  render() {
    let { qChange, kChange, HChange, onOk, q, k, H, navigation, lenIndex, lenIndexChange, specChange, spec } = this.props
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.inputTitle}>输入参数：</Text>
        <List style={styles.list}>
          <TextInput
            onChangeText={value => qChange(value)}
            style={styles.textInput}
            value={q}
            placeholder="单耗q"
          />
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
  return state.blastIndexDesign
}

let mapDispatchToProps = dispatch => {
  return {
    qChange: value => {
      let state = store.getState()
      dispatch({
        type: "SET_BLAST_INDEX_DESIGN",
        holeIndex: {
          ...state.blastIndexDesign,
          q: value
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

      // navigation.navigate('HoleIndexTable')
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