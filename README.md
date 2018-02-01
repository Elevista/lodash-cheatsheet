# Lodash cheatsheet

## Lotto number five digits
```js
_(1).range(46).sampleSize(5).sortBy().value()
```
```js
[1, 2, 3, 4, 5]
```

## Parse query string
```js
let query = 'http://foo.net/bar?name=abc&empty&empty2=&id=someId'.split('?')[1]
_(query).split('&').compact().map(x => x.split('=')).fromPairs().value()
```
```js
{name: 'abc', empty: undefined, empty2: '', id: 'someId'}
```

## Object to {key,value} Array
```js
_.map({a: 10, b: 20}, (value, key) => ({key, value}))
```
```js
[{key: 'a', value: 10}, {key: 'b', value: 20}]
```

## Array to tree
```js
let treeNodeArr = [
  {id: 1, parentId: null},
  {id: 2, parentId: 1},
  {id: 3, parentId: 1},
  {id: 4, parentId: 2},
  {id: 5, parentId: 2},
  {id: 6, parentId: 2},
]
let nodeOf = _.keyBy(treeNodeArr, 'id')

_(treeNodeArr).groupBy('parentId').filter((children, id) => {
  if (!nodeOf[id]) return true
  nodeOf[id].children = children
  // _.forEach(children, node => node.parent = nodeOf[id]) // parent reference if needed.(circular)
}).get([0, 0])
```
```js
{
  id: 1,
  parentId: null,
  children: [
    {
      id: 2,
      parentId: 1,
      children: [{id: 4, parentId: 2}, {id: 5, parentId: 2}, {id: 6, parentId: 2}]
    },
    {id: 3, parentId: 1}
  ]
}
```