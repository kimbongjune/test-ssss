const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

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

    exec(`git config user.name "GitHub Action"`);
    exec(`git config user.email "action@github.com"`);
    exec(`git add ${readmePath}`);
    exec(`git commit -m "Update README.md"`);
    exec(`git push origin ${mainBranch}`);
  }
});
