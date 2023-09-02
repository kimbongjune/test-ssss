const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

function fetchGitTrackedFiles() {
  const output = execSync('git ls-files', { encoding: 'utf8' });
  return new Set(output.split('\n').filter(Boolean));
}

function fetchStructure(dir, gitTrackedFiles) {
  let structure = [];
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file).replace(/\\/g, '/');
    const relativePath = filePath.replace(/^\.\//, '');
    
    if (!gitTrackedFiles.has(relativePath) && !fs.statSync(filePath).isDirectory()) {
      continue;
    }

    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      structure.push({
        type: 'directory',
        name: file,
        children: fetchStructure(filePath, gitTrackedFiles)
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
  for (let i = 0; i < arr.length; i++) {
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

const gitTrackedFiles = fetchGitTrackedFiles();
const directoryStructure = fetchStructure('.', gitTrackedFiles);
printStructure(directoryStructure);
