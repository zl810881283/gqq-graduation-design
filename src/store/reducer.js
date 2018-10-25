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
        GPS: '132.6666677 22.1231235',
        resistLine: '',
        type: ['边角炮孔', '首排炮孔'],
        q: '',
        Q: '',
        Q2: '',
        W: '1',
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
        number: '2',
        GPS: '132.6666680 22.1231256',
        resistLine: '',
        type: ['首排炮孔'],
        q: '',
        Q: '',
        Q2: '',
        W: '1',
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
        number: '3',
        GPS: '132.6666682 22.1231274',
        resistLine: '',
        type: ['首排炮孔', '边角炮孔'],
        q: '',
        Q: '',
        Q2: '',
        W: '1',
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
        number: '4',
        GPS: '132.6666656 22.1231292',
        resistLine: '',
        type: ['边角炮孔'],
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