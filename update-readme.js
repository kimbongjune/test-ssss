const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoName = process.env.GITHUB_REPOSITORY;

console.log('GITHUB_TOKEN:', process.env.GITHUB_TOKEN);

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

fs.readdir('.', (err, filenames) => {
  if (err) {
    console.error(err);
    return;
  }

  const mergedMdFiles = filenames.filter(isMergedMdFile);

  if (mergedMdFiles.length > 0) {
    let readmeContent = fs.readFileSync(readmePath, 'utf8');
    mergedMdFiles.forEach((filename) => {
      const link = generateLink(filename);
      if (!readmeContent.includes(link)) {
        readmeContent += `\n${link}`;
      }
    });

    fs.writeFileSync(readmePath, readmeContent, 'utf8');

    execSync(`git config user.name "GitHub Action"`);
    execSync(`git config user.email "action@github.com"`);
    execSync(`git add ${readmePath}`);
    execSync(`git commit -m "Update README.md"`);
    execSync(`git remote set-url origin https://${process.env.GITHUB_TOKEN}@github.com/${repoName}.git`);
    execSync(`git push origin ${mainBranch}`);
  }
});
