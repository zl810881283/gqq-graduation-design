import React, {Component} from 'react';
import { connect } from "react-redux"
import { StyleSheet, ScrollView} from 'react-native';
import Svg,{ Circle, Path, Text, TSpan, G} from 'react-native-svg'
import { Button } from 'antd-mobile-rn'

class Diagram extends Component {
  static navigationOptions = {
    title: '炮孔示意图'
  }

  render() {
    let { holes, topLinePoints, navigation } = this.props
    let topLinePath = ''
    for (let i = 0;i < topLinePoints.length;i++) {
      if (i === 0) topLinePath += "M " + topLinePoints[i].x + ' ' + topLinePoints[i].y + ' '
      if (i !== 0) topLinePath += "T " + topLinePoints[i].x + ' ' + topLinePoints[i].y + ' '
    }
    return (
      <ScrollView>
        <Svg
          height="1200"
          width="800"
        >
          {holes.map((item, index) => {
            return <G key={item.number}>
              <Circle cx={item.x} cy={item.y} r="20" fill="white" stroke="black" />
              <Text x={item.x-8} y={item.y+10} fontSize="30">
                <TSpan>{item.number}</TSpan>
              </Text>
              { index !== 0 && item.type.indexOf('首排炮孔')!=-1 ? <Path d={`M ${holes[index-1].x} ${holes[index-1].y} L ${item.x} ${item.y}`} stroke="black" /> : null }
            </G>
          })}
          <Path d={topLinePath} stroke="black" fill="none"/>
        </Svg>
        {/* <Button onClick={() => navigation.navigate('Home')} type="primary" style={styles.button}>
          <Text style={{fontSize:20}}>返回主页</Text>
        </Button> */}
      </ScrollView>
    )
  }
}

let mapStateToProps = state => {
  return state.holeIndex
}

let mapDispatchToProps = dispatch => {
  return {
  }
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    margin: 30
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Diagram)