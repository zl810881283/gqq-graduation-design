const initialState = {
  svgHeight: 0,
  name: '',
	holeIndex: {
    focusRender: false,
    radioData: [
      { value: '首排炮孔' },
      { value: '特殊炮孔' },
      { value: '边角炮孔' },
      { value: '其他炮孔' }
    ],
    topLinePoints: [
      { 
        GPS: '',
        x: '',
        y: '' 
      },
    ],
    holes: [
      {
        number: '',
        parentNumber: '',
        detonator: '',
        GPS: '132.111165 132.111158',
        type: [],
        q: '',
        Q: '',
        Q2: '',
        W: '',
        b: '',
        a: '',
        l: '',
        h: '',
        mediCount: '',
        mediLen: '',
        fillLen: '',
        x: '',
        y: ''
      },
      {
        number: '',
        parentNumber: '',
        detonator: '',
        GPS: '132.111179 132.111132',
        type: [],
        q: '',
        Q: '',
        Q2: '',
        W: '',
        b: '',
        a: '',
        l: '',
        h: '',
        mediCount: '',
        mediLen: '',
        fillLen: '',
        x: '',
        y: ''
      },
      {
        number: '',
        parentNumber: '',
        detonator: '',
        GPS: '132.111195 132.111110',
        type: [],
        q: '',
        Q: '',
        Q2: '',
        W: '',
        b: '',
        a: '',
        l: '',
        h: '',
        mediCount: '',
        mediLen: '',
        fillLen: '',
        x: '',
        y: ''
      },
    ]
  },
  blastIndexDesign: {
    k: '',
    H: '',
    lenIndex: '',
    spec: ''
  },
  holeIndexTable: {
    tableHead: ['孔号', '抵抗线W(m)', '排距b(m)', '孔距a(m)', '孔深l(m)', '超深h(m)', '设计单耗q(kg/m3)', '设计装药量Q(kg)', "调整装药量Q'(kg)", '药卷数量(支)', '装药长度(m)', '填塞长度(m)'],
    tableData: [],
    focusRender: false
  },
  gridIndex: {
    detonators: [
      { value: '25ms' },
      { value: '42ms' },
      { value: '65ms' },
    ],
    table1Head: ['爆破器材', '乳化炸药(kg)', '多孔粒状炸药(kg)', '400ms雷管(发)', '25ms雷管(发)', '42ms雷管(发)', '65ms雷管(发)', '导爆索(米)', '导爆管(米)'],
    table1Data: ['合计', '', '', '', '', '', '', '', '300' ],
    table2Head: ['孔号'],
    table2Data: ['装药量']
  },
  deleteModal: false,
  records: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_HOLE_INDEX": 
      return {
        ...state,
        holeIndex: action.holeIndex
      }
    case "SET_BLAST_INDEX_DESIGN": 
      return {
        ...state,
        blastIndexDesign: action.blastIndexDesign
      }
    case 'SET_HOLE_INDEX_TABLE':
      return {
        ...state,
        holeIndexTable: action.holeIndexTable
      }
    case 'SET_GRID_INDEX':
      return {
        ...state,
        gridIndex: action.gridIndex
      }
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      }      
    case 'SET_RECORDS':
      return {
        ...state,
        records: action.records
      }          
    case 'SET_SVG_HEIGHT':
      return {
        ...state,
        svgHeight: action.svgHeight
      }        
    default:
      return state;
  }
}

export default reducer