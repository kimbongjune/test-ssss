const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoName = process.env.GITHUB_REPOSITORY;

const isMergedMdFile = (filename) => {
  const regex = /^\d{4}-\d{2}-\d{2}_.*\.md$/;
  return regex.test(filename);
};

const generateLink = (filename) => {
  const date = filename.substring(0, 10);
  const title = filename.substring(11, filename.length - 3).replace(/ /g, '%20');
  return `- [[${date}] ${title}](https://github.com/${repoName}/blob/main/${filename.replace(/ /g, '%20')})`;
};

const mainBranch = 'main';
const readmePath = path.join(__dirname, 'README.md');

const deletedFiles = execSync('git diff HEAD~1 HEAD --name-status', { encoding: 'utf-8' })
  .split('\n')
  .filter(line => line.startsWith('D'))
  .map(line => line.slice(2).trim());

fs.readdir('.', (err, filenames) => {
  if (err) {
    console.error(err);
    return;
  }

  let readmeContent = fs.readFileSync(readmePath, 'utf8');

  // 파일 추가
  const mergedMdFiles = filenames.filter(isMergedMdFile);
  mergedMdFiles.forEach((filename) => {
    const link = generateLink(filename);
    if (!readmeContent.includes(link)) {
      readmeContent += `\n${link}`;
    }
  });

  // 파일 삭제
  deletedFiles.forEach((filename) => {
    if (isMergedMdFile(filename)) {
      const link = generateLink(filename);
      const regex = new RegExp(`\n${link}`);
      readmeContent = readmeContent.replace(regex, '');
    }
  });

  fs.writeFileSync(readmePath, readmeContent, 'utf8');
  execSync(`git config user.name "GitHub Action"`);
  execSync(`git config user.email "action@github.com"`);
  execSync(`git add ${readmePath}`);
  execSync(`git commit -m "Update README.md"`);
  execSync(`git push https://${process.env.GITHUB_TOKEN}@github.com/${repoName}.git ${mainBranch}`);
});
