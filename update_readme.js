const fs = require('fs');
const path = require('path');

function fetchStructure(dir) {
  let structure = [];
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      structure.push({
        type: 'directory',
        name: file,
        children: fetchStructure(filePath)
      });
    } else {
      structure.push({
        type: 'file',
        name: file
      });
    }
  }
  
  return structure;
}

function printStructure(arr, level = 0) {
  if (level === 0 && arr.length > 0) {
    console.log(`📂 ${arr[0].name}`);
  }

  for (let i = (level === 0 ? 1 : 0); i < arr.length; i++) {
    const item = arr[i];
    
    const prefix = ' '.repeat(level * 2);
    
    if (item.type === 'directory') {
      console.log(`${prefix}📂 ${item.name}`);
      printStructure(item.children, level + 1);
    } else {
      console.log(`${prefix}📄 ${item.name}`);
    }
  }
}

const directoryStructure = fetchStructure('.');
printStructure(directoryStructure);
