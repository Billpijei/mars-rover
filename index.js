const chunkList = [
  { name: "A", start: 0, size: 20, },
  { name: "H", start: 0, size: 30, },
  {  name: "B", start: 10, size: 50, },
  { name: "X", start: 50, size: 30, },
  { name: "Y", start: 40, size: 30, },
  { name: "Z", start: 20, size: 10, },
  { name: "D", start: 75, size: 25, },
  { name: "Q", start: 80, size: 20, },
  {  name: "E", start: 10, size: 40, },
  {  name: "F", start: 65, size: 10, },
]

const makeTree = (arr, start = 0, size = 0, totalByte = 0, rootPath = []) => {
  if (start + size == 0) {
    return arr.filter(item => item.start == 0)
      .map(child => ({
        ...child,
        totalByte: totalByte + child.size,
        rootPath: [child.name],
        children: makeTree(arr, child.start, child.size, totalByte + child.size, [child.name])
      }));
  }

  return arr.filter(item => start < item.start && item.start <= (start + size) && ((item.start + item.size) >= (start + size)))
    .map(child => ({
      ...child,
      totalByte: totalByte + child.size,
      rootPath: [...rootPath, child.name],
      children: makeTree(arr, child.start, child.size, totalByte + child.size, [...rootPath, child.name])
    }));
}

const func = (tree, totalSize) => {
  let result = []
  
  for (const node of tree) {
    if (node.size + node.start == totalSize) {
      result.push({
        totalByte: node.totalByte,
        rootPath: node.rootPath
      })
    }
    
    if (node.children.length == 0) {
      return result  
    }

    const res = func(node.children, totalSize);
    result = [...result, ...res]
  }
  return result
};

function getSmallestChunks(total, chunkList) { 
 
  const searchTree = makeTree(chunkList)
  let suggestions = func(searchTree, total)

  let result = suggestions.reduce((prev, cur, index) => {
    if (index === 0) {
      prev = {
        ...cur
      }
    } else if (prev.totalByte > cur.totalByte) {
      prev = {... cur}
    }
    return prev
  }, {})
  console.log("Suggestions:", suggestions,"\n", "result:", result)
  // console.log(JSON.stringify(searchTree, null, 4)) 

}



getSmallestChunks(100, chunkList)
