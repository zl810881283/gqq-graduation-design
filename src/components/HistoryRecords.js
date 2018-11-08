import React, {Component} from 'react';
import { StyleSheet, Text, ScrollView, View} from 'react-native';
import store from '../store'
import { connect } from "react-redux"
import { Flex, WhiteSpace, Button, Toast } from 'antd-mobile-rn'
import Modal from "react-native-modal"

class HistoryRecords extends Component {
  static navigationOptions = {
    title: '历史记录'
  }
  render() {
    let { records, navigation, deleteRecord, toResult } = this.props
    return (
      <ScrollView style={styles.container}>
        <Flex>
          <Flex.Item>
            <Text style={styles.header}>名称</Text>
          </Flex.Item>
          <Flex.Item>
            <Text style={styles.header}>操作</Text>
          </Flex.Item>
        </Flex>
        {records.map((item, index) => (
          <Flex key={item.name}>
            <Flex.Item>
              <Text style={styles.header}>{item.name}</Text>
            </Flex.Item>
            <Flex.Item>
              <Flex justify="start">
                <Button style={styles.button} onClick={() => toResult(index, navigation)}>查看</Button>
                <Button style={styles.button} onClick={() => deleteRecord(item.name)}>删除</Button>
              </Flex>
            </Flex.Item>
          </Flex>
        ))}
        <WhiteSpace size="lg" />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  button: {
    width: 75,
    height: 30,
    marginLeft:10
  },
  header: {
    fontSize: 20,
    marginLeft: 10
  }
});

let mapStateToProps = state => {
  return {
    records: state.records
  }
}

let mapDispatchToProps = dispatch => {
  return {
    toResult: (index, navigation) => {
      let { records } = store.getState()
      dispatch({
        type: "SET_NAME",
        name: records[index].name,
      })
      dispatch({
        type: "SET_HOLE_INDEX",
        holeIndex: records[index].holeIndex,
      })
      dispatch({
        type: "SET_GRID_INDEX",
        gridIndex: records[index].gridIndex,
      })
      dispatch({
        type: "SET_HOLE_INDEX_TABLE",
        holeIndexTable: records[index].holeIndexTable
      })
      dispatch({
        type: "SET_BLAST_INDEX_DESIGN",
        blastIndexDesign: records[index].blastIndexDesign
      })
      dispatch({
        type: "SET_SVG_HEIGHT",
        svgHeight: records[index].svgHeight
      })
      navigation.navigate('Result')
    },
    deleteRecord: async (name) => {
      await storage.remove({
        key: 'records',
        id: name
      })
      let records = await storage.getAllDataForKey('records')
      store.dispatch({
        type: 'SET_RECORDS',
        records
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryRecords)