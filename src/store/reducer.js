const initialState = {
  svgHeight: 0,
  name: '',
	holeIndex: {
    focusRender: false,
    radioData: [
      { value: '首排炮孔' },
      { value: '特殊炮孔' },
      { value: '边角炮孔' },
      { value: '普通炮孔' }
    ],
    topLinePoints: [
      { 
        GPS: '',
        x: '',
        y: '' 
      },
    ],
    holes: [
      // {
      //   number: '1',
      //   parentNumber: '',
      //   detonator: '',
      //   GPS: '504548.189 3501676.345 -45.846',
      //   type: ['首排炮孔', '边角炮孔'],
      //   q: '',
      //   Q: '',
      //   Q2: '',
      //   W: '5',
      //   b: '',
      //   a: '',
      //   l: '16',
      //   h: '',
      //   mediCount: '',
      //   mediLen: '',
      //   fillLen: '',
      //   x: '',
      //   y: '',
      //   z: ''
      // },
      // {
      //   number: '2',
      //   parentNumber: '1',
      //   detonator: '25ms',
      //   GPS: '504544.651 3501672.163 -46.057',
      //   type: ['首排炮孔'],
      //   q: '',
      //   Q: '',
      //   Q2: '',
      //   W: '5',
      //   b: '',
      //   a: '',
      //   l: '16',
      //   h: '',
      //   mediCount: '',
      //   mediLen: '',
      //   fillLen: '',
      //   x: '',
      //   y: '',
      //   z: ''
      // },
      // {
      //   number: '3',
      //   parentNumber: '2',
      //   detonator: '25ms',
      //   GPS: '504545.985 3501664.527 -46.13',
      //   type: ['首排炮孔'],
      //   q: '',
      //   Q: '',
      //   Q2: '',
      //   W: '5',
      //   b: '',
      //   a: '',
      //   l: '16',
      //   h: '',
      //   mediCount: '',
      //   mediLen: '',
      //   fillLen: '',
      //   x: '',
      //   y: '',
      //   z: ''
      // },
      // {
      //   number: '4',
      //   parentNumber: '3',
      //   detonator: '25ms',
      //   GPS: '504546.972 3501656.375 -45.824',
      //   type: ['首排炮孔'],
      //   q: '',
      //   Q: '',
      //   Q2: '',
      //   W: '5',
      //   b: '',
      //   a: '',
      //   l: '16',
      //   h: '',
      //   mediCount: '',
      //   mediLen: '',
      //   fillLen: '',
      //   x: '',
      //   y: '',
      //   z: ''
      // },
      // {
      //   number: '5',
      //   parentNumber: '4',
      //   detonator: '25ms',
      //   GPS: '504548.439 3501648.903 -45.975',
      //   type: ['首排炮孔'],
      //   q: '',
      //   Q: '',
      //   Q2: '',
      //   W: '5',
      //   b: '',
      //   a: '',
      //   l: '16',
      //   h: '',
      //   mediCount: '',
      //   mediLen: '',
      //   fillLen: '',
      //   x: '',
      //   y: '',
      //   z: ''
      // },
      // {
      //   number: '6',
      //   parentNumber: '5',
      //   detonator: '25ms',
      //   GPS: '504549.532 3501641.049 -45.776',
      //   type: ['首排炮孔'],
      //   q: '',
      //   Q: '',
      //   Q2: '',
      //   W: '5',
      //   b: '',
      //   a: '',
      //   l: '16',
      //   h: '',
      //   mediCount: '',
      //   mediLen: '',
      //   fillLen: '',
      //   x: '',
      //   y: '',
      //   z: ''
      // },
      // {
      //   number: '7',
      //   parentNumber: '6',
      //   detonator: '25ms',
      //   GPS: '504550.883 3501633.292 -45.959',
      //   type: ['首排炮孔'],
      //   q: '',
      //   Q: '',
      //   Q2: '',
      //   W: '5',
      //   b: '',
      //   a: '',
      //   l: '16',
      //   h: '',
      //   mediCount: '',
      //   mediLen: '',
      //   fillLen: '',
      //   x: '',
      //   y: '',
      //   z: ''
      // },
      // {
      //   number: '8',
      //   parentNumber: '7',
      //   detonator: '25ms',
      //   GPS: '504552.008 3501625.711 -45.821',
      //   type: ['首排炮孔', '边角炮孔'],
      //   q: '',
      //   Q: '',
      //   Q2: '',
      //   W: '5',
      //   b: '',
      //   a: '',
      //   l: '16',
      //   h: '',
      //   mediCount: '',
      //   mediLen: '',
      //   fillLen: '',
      //   x: '',
      //   y: '',
      //   z: ''
      // },
      // {
      //   number: '9',
      //   parentNumber: '8',
      //   detonator: '25ms',
      //   GPS: '504546.533 3501628.337 -45.82',
      //   type: ['边角炮孔'],
      //   q: '',
      //   Q: '',
      //   Q2: '',
      //   W: '',
      //   b: '',
      //   a: '',
      //   l: '16',
      //   h: '',
      //   mediCount: '',
      //   mediLen: '',
      //   fillLen: '',
      //   x: '',
      //   y: '',
      //   z: ''
      // },
      // {
      //   number: '10',
      //   parentNumber: '7',
      //   detonator: '42ms',
      //   GPS: '504545.459 3501636.113 -45.91',
      //   type: ['普通炮孔'],
      //   q: '',
      //   Q: '',
      //   Q2: '',
      //   W: '',
      //   b: '',
      //   a: '',
      //   l: '16',
      //   h: '',
      //   mediCount: '',
      //   mediLen: '',
      //   fillLen: '',
      //   x: '',
      //   y: '',
      //   z: ''
      // },
      // {
      //   number: '11',
      //   parentNumber: '6',
      //   detonator: '42ms',
      //   GPS: '504544.282 3501644.008 -45.816',
      //   type: ['普通炮孔'],
      //   q: '',
      //   Q: '',
      //   Q2: '',
      //   W: '',
      //   b: '',
      //   a: '',
      //   l: '16',
      //   h: '',
      //   mediCount: '',
      //   mediLen: '',
      //   fillLen: '',
      //   x: '',
      //   y: '',
      //   z: ''
      // },
      // {
      //   number: '12',
      //   parentNumber: '5',
      //   detonator: '42ms',
      //   GPS: '504543.046 3501651.761 -45.971',
      //   type: ['普通炮孔'],
      //   q: '',
      //   Q: '',
      //   Q2: '',
      //   W: '',
      //   b: '',
      //   a: '',
      //   l: '16',
      //   h: '',
      //   mediCount: '',
      //   mediLen: '',
      //   fillLen: '',
      //   x: '',
      //   y: '',
      //   z: ''
      // },
      // {
      //   number: '13',
      //   parentNumber: '4',
      //   detonator: '42ms',
      //   GPS: '504542.309 3501659.559 -45.954',
      //   type: ['普通炮孔'],
      //   q: '',
      //   Q: '',
      //   Q2: '',
      //   W: '',
      //   b: '',
      //   a: '',
      //   l: '16',
      //   h: '',
      //   mediCount: '',
      //   mediLen: '',
      //   fillLen: '',
      //   x: '',
      //   y: '',
      //   z: ''
      // },
      // {
      //   number: '14',
      //   parentNumber: '3',
      //   detonator: '42ms',
      //   GPS: '504540.77 3501667.49 -46.225',
      //   type: ['边角炮孔'],
      //   q: '',
      //   Q: '',
      //   Q2: '',
      //   W: '',
      //   b: '',
      //   a: '',
      //   l: '16',
      //   h: '',
      //   mediCount: '',
      //   mediLen: '',
      //   fillLen: '',
      //   x: '',
      //   y: '',
      //   z: ''
      // },
      // {
      //   number: '15',
      //   parentNumber: '13',
      //   detonator: '42ms',
      //   GPS: '504536.207 3501663.335 -45.059',
      //   type: ['边角炮孔'],
      //   q: '',
      //   Q: '',
      //   Q2: '',
      //   W: '',
      //   b: '',
      //   a: '',
      //   l: '16',
      //   h: '',
      //   mediCount: '',
      //   mediLen: '',
      //   fillLen: '',
      //   x: '',
      //   y: '',
      //   z: ''
      // },
      // {
      //   number: '16',
      //   parentNumber: '12',
      //   detonator: '42ms',
      //   GPS: '504537.41 3501655.563 -45.78',
      //   type: ['普通炮孔'],
      //   q: '',
      //   Q: '',
      //   Q2: '',
      //   W: '',
      //   b: '',
      //   a: '',
      //   l: '16',
      //   h: '',
      //   mediCount: '',
      //   mediLen: '',
      //   fillLen: '',
      //   x: '',
      //   y: '',
      //   z: ''
      // },
      // {
      //   number: '17',
      //   parentNumber: '11',
      //   detonator: '42ms',
      //   GPS: '504538.402 3501647.761 -45.875',
      //   type: ['普通炮孔'],
      //   q: '',
      //   Q: '',
      //   Q2: '',
      //   W: '',
      //   b: '',
      //   a: '',
      //   l: '16',
      //   h: '',
      //   mediCount: '',
      //   mediLen: '',
      //   fillLen: '',
      //   x: '',
      //   y: '',
      //   z: ''
      // },
      // {
      //   number: '18',
      //   parentNumber: '10',
      //   detonator: '42ms',
      //   GPS: '504539.65 3501639.85 -45.753',
      //   type: ['普通炮孔'],
      //   q: '',
      //   Q: '',
      //   Q2: '',
      //   W: '',
      //   b: '',
      //   a: '',
      //   l: '16',
      //   h: '',
      //   mediCount: '',
      //   mediLen: '',
      //   fillLen: '',
      //   x: '',
      //   y: '',
      //   z: ''
      // },
      // {
      //   number: '19',
      //   parentNumber: '9',
      //   detonator: '42ms',
      //   GPS: '504540.835 3501632.122 -45.812',
      //   type: ['边角炮孔'],
      //   q: '',
      //   Q: '',
      //   Q2: '',
      //   W: '',
      //   b: '',
      //   a: '',
      //   l: '16',
      //   h: '',
      //   mediCount: '',
      //   mediLen: '',
      //   fillLen: '',
      //   x: '',
      //   y: '',
      //   z: ''
      // },
      {
        number: '',
        parentNumber: '',
        detonator: '',
        GPS: '',
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
        y: '',
        z: ''
      },
    ]
  },
  blastIndexDesign: {
    q: '0.5',
    k: '1',
    H: '12',
    lenIndex: '10',
    spec: '28'
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
    table1Data: ['合计', '', '', '', '', '', '', '', '300' ],
    table2Head: ['孔号'],
    table2Data: ['装药量'],
    selected: '乳化',
    underHole: '400ms'
  },
  deleteModal: false,
  holesModal: false,
  holesModalIndex: 0,
  records: [],
  lAndH: [
    { l: 2.8, h: 1 },
    { l: 3.5, h: 1 },
    { l: 4, h: 1 },
    { l: 4.5, h: 2 },
    { l: 5, h: 1 },
    { l: 5.5, h: 2 },
    { l: 6, h: 2 },
    { l: 6.5, h: 2 },
    { l: 7, h: 1.5 },
    { l: 7.5, h: 1.5 },
    { l: 8, h: 1.5 },
    { l: 8.5, h: 2 },
    { l: 9, h: 2 },
    { l: 9.5, h: 2 },
    { l: 10, h: 2 },
    { l: 11, h: 2 },
    { l: 12, h: 2 },
    { l: 13, h: 2 },
    { l: 14, h: 2 },
    { l: 15, h: 2 },
    { l: 16, h: 2 },
    { l: 17, h: 2 },
    { l: 18, h: 2 },
    { l: 19, h: 2 },
    { l: 20, h: 2 },
    { l: 21, h: 2 },
    { l: 22, h: 2 },
  ]
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
    case 'SET_HOLES_MODAL':
      return {
        ...state,
        holesModal: action.holesModal
      }
    case 'SET_HOLES_MODAL_INDEX':
      return {
        ...state,
        holesModalIndex: action.holesModalIndex
      }
    default:
      return state;
  }
}

export default reducer