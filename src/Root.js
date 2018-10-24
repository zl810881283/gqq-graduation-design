'use strict';

import { createStackNavigator } from 'react-navigation'
import Home from './components/Home'
import HoleIndex from './components/HoleIndex'
import BlastIndexDesign from './components/BlastIndexDesign'
import GridIndexDesign from './components/GridIndexDesign'
import HistoryRecords from './components/HistoryRecords'
import HoleIndexTable from './components/HoleIndexTable'
import Diagram from './components/Diagram'

const Root = createStackNavigator({
  Home: { screen: Diagram },
  HoleIndexTable: { screen: HoleIndexTable },
  HoleIndex: { screen: HoleIndex },
  BlastIndexDesign: { screen: BlastIndexDesign },
  GridIndexDesign: { screen: GridIndexDesign },
  HistoryRecords: { screen: HistoryRecords },
  Diagram: { screen: Diagram }
});

export default Root;
