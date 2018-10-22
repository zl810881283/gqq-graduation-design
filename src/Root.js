'use strict';

import Home from './components/Home'
import HoleIndex from './components/HoleIndex'
import BlastIndexDesign from './components/BlastIndexDesign'
import GridIndexDesign from './components/GridIndexDesign'
import HistoryRecords from './components/HistoryRecords'
import HoleIndexTable from './components/HoleIndexTable'
import { createStackNavigator } from 'react-navigation';

const Root = createStackNavigator({
  Home: { screen: Home },
  HoleIndexTable: { screen: HoleIndexTable },
  HoleIndex: { screen: HoleIndex },
  BlastIndexDesign: { screen: BlastIndexDesign },
  GridIndexDesign: { screen: GridIndexDesign },
  HistoryRecords: { screen: HistoryRecords },
});

export default Root;
