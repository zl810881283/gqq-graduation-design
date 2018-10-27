const initialState = {
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
        GPS: '132.6666633 22.1231221',
        x: '',
        y: '' 
      },
      { 
        GPS: '132.6666611 22.1231211',
        x: '',
        y: '' 
      },
      { 
        GPS: '132.6666600 22.1231200',
        x: '',
        y: '' 
      },
    ],
    holes: [
      {
        number: '1',
        parentNumber: '',
        detonator: '25ms',
        GPS: '132.6666677 22.1231235',
        resistLine: '',
        type: ['边角炮孔', '首排炮孔'],
        q: '2',
        Q: '',
        Q2: '',
        W: '1',
        b: '',
        a: '',
        l: '10',
        h: '',
        mediCount: '',
        mediLen: '',
        fillLen: '',
        x: '',
        y: ''
      },
      {
        number: '2',
        parentNumber: '1',
        detonator: '25ms',
        GPS: '132.6666680 22.1231256',
        resistLine: '',
        type: ['首排炮孔'],
        q: '2',
        Q: '',
        Q2: '',
        W: '1',
        b: '',
        a: '',
        l: '10',
        h: '',
        mediCount: '',
        mediLen: '',
        fillLen: '',
        x: '',
        y: ''
      },
      {
        number: '3',
        parentNumber: '2',
        detonator: '25ms',
        GPS: '132.6666682 22.1231274',
        resistLine: '',
        type: ['首排炮孔', '边角炮孔'],
        q: '2',
        Q: '',
        Q2: '',
        W: '1',
        b: '',
        a: '',
        l: '10',
        h: '',
        mediCount: '',
        mediLen: '',
        fillLen: '',
        x: '',
        y: ''
      },
      {
        number: '4',
        parentNumber: '3',
        detonator: '65ms',
        GPS: '132.6666656 22.1231292',
        resistLine: '',
        type: ['边角炮孔'],
        q: '2',
        Q: '',
        Q2: '',
        W: '',
        b: '',
        a: '',
        l: '10',
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
    k: '4',
    H: '4',
    lenIndex: '3',
    spec: '1'
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
    ]
  }
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
    default:
      return state;
  }
}

export default reducer