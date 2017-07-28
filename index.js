import * as _ from 'lodash'

/** 로또 번호 **/
_(1).range(46).sampleSize(5).sortBy().value()



/** 쿼리스트링 파싱 **/
let query = 'http://foo.net/bar?name=abc&empty&empty2=&id=someId'.split('?')[1]
_(query).split('&').compact().map(x => x.split('=')).fromPairs().value()



/** object key,value를 배열로 **/
let obj = {a: 10, b: 20}
_.map(obj, (value, key) => ({key, value}))



/** 부모 아이디를 가진 노드 배열을 트리로 만들기 **/
let treeNodeArr = [
  {id: 1, parentId: null},
  {id: 2, parentId: 1},
  {id: 3, parentId: 1},
  {id: 4, parentId: 2},
  {id: 5, parentId: 2},
  {id: 6, parentId: 2},
]
let tree = (() => {
  let nodeOf = _.keyBy(treeNodeArr, 'id')
  return _(treeNodeArr).groupBy('parentId').filter((children, id) => {
    if (!nodeOf[id]) return true
    nodeOf[id].children = children
    // _.forEach(children, node => node.parent = nodeOf[id]) //parent reference if needed.(circular)
  }).get('0.0')
})()
