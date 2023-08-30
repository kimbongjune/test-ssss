const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoName = process.env.GITHUB_REPOSITORY;

const getMdFiles = (type) => {
  const stdout = execSync(`git diff --name-only --diff-filter=${type} HEAD~ HEAD`).toString();
  return stdout.split('\n').filter(f => f.endsWith('.md'));
};

const encodeLink = (filename) => encodeURIComponent(filename);
const decodeLink = (filename) => decodeURIComponent(filename);

const readmePath = path.join(__dirname, 'README.md');

fs.readFile(readmePath, 'utf8', (err, readmeContent) => {
  if (err) {
    console.error(err);
    return;
  }

  let newReadmeContent = readmeContent;

  const deletedMdFiles = getMdFiles('D');
  deletedMdFiles.forEach((filename) => {
    const link = `- [[${filename.substring(0, 10)}] ${decodeLink(filename.substring(11, filename.length - 3))}](https://github.com/${repoName}/blob/main/${encodeLink(filename)})`;
    newReadmeContent = newReadmeContent.replace(link, '');
  });

  const addedMdFiles = getMdFiles('A');
  addedMdFiles.forEach((filename) => {
    const link = `- [[${filename.substring(0, 10)}] ${decodeLink(filename.substring(11, filename.length - 3))}](https://github.com/${repoName}/blob/main/${encodeLink(filename)})`;
    if (!newReadmeContent.includes(link)) {
      newReadmeContent += `\n${link}`;
    }
  });

  fs.writeFileSync(readmePath, newReadmeContent, 'utf8');
  
  execSync('git config user.name "GitHub Action"');
  execSync('git config user.email "action@github.com"');
  execSync(`git add ${readmePath}`);
  execSync('git commit -m "Update README.md"');
  execSync(`git push https://${process.env.GITHUB_TOKEN}@github.com/${repoName}.git ${mainBranch}`);
});
