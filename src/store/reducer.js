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
        l: '',
        resistLine: '',
        type: '其它炮孔',
        x: '',
        y: ''
      },
      {
        number: '2',
        GPS: '132.6666682 22.1231274',
        l: '',
        resistLine: '',
        type: '其它炮孔',
        x: '',
        y: ''
      },
      {
        number: '3',
        GPS: '132.6666656 22.1231292',
        l: '',
        resistLine: '',
        type: '其它炮孔',
        x: '',
        y: ''
      },
    ]
  },
  blastIndexDesign: {
    q: '',
    k: '',
    H: '',
    lenIndex: '',
    spec: ''
  },
  holeIndexTable: {
    tableHead: ['孔号', '抵抗线', '排距', '孔距', '孔深', '超深', '设计单耗', '设计装药量', '调整装药量', '药卷数量', '装药长度', '填塞长度'],
    tableData: [
      ['1', '2', '3', '4', '2', '3', '4', '2', '3', '4', '2', '2'],
      ['a', 'b', 'c', 'd', '2', '3', '4', '2', '3', '4', '2', '2'],
      ['1', '2', '3', '4', '2', '3', '4', '2', '3', '4', '2', '2'],
      ['a', 'b', 'c', 'd', '2', '3', '4', '2', '3', '4', '2', '2']
    ],
    data: [
      { W: '', b: '', a: '', l: '', h: '', q: '', Q: '', Q2: '', count: '', len1: '', len2: '' }
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