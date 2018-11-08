'use strict';

import { createStackNavigator } from 'react-navigation'
import Home from './components/Home'
import HoleIndex from './components/HoleIndex'
import BlastIndexDesign from './components/BlastIndexDesign'
import HistoryRecords from './components/HistoryRecords'
import HoleIndexTable from './components/HoleIndexTable'
import Diagram from './components/Diagram'
import Result from './components/Result'
import Storage from 'react-native-storage'
import {AsyncStorage} from 'react-native'

var storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
  sync: {
    records: () => {
      return []
    }
  }
})
global.storage = storage

const Root = createStackNavigator({
  Home: { screen: Home },
  HoleIndexTable: { screen: HoleIndexTable },
  HoleIndex: { screen: HoleIndex },
  BlastIndexDesign: { screen: BlastIndexDesign },
  HistoryRecords: { screen: HistoryRecords },
  Diagram: { screen: Diagram },
  Result: { screen: Result }
});

export default Root;
