const fs = require('fs');
const path = require('path');
const { Octokit } = require("@octokit/rest");

const main = async () => {
  const octokit = new Octokit();
  const readmePath = path.join(__dirname, '../../README.md');
  let readmeContent = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, 'utf8') : '# Today I Learned(TIL)\n## 카테고리';

  const { data: commits } = await octokit.repos.listCommits({
    owner: process.env.GITHUB_REPOSITORY.split('/')[0],
    repo: process.env.GITHUB_REPOSITORY.split('/')[1]
  });

  const changedFiles = commits[0].files;
  const changedMdFiles = changedFiles.filter(file => file.filename.endsWith('.md') && file.filename !== 'README.md');

  changedMdFiles.forEach(file => {
    const isDeletedInMainBranch = file.status === 'removed';
    const fileName = file.filename;
    const date = fileName.split('_')[0];
    const title = fileName.split('_')[1].replace('.md', '').replace(/ /g, '%20');
    const link = `- [[${date}] ${title}](https://github.com/${process.env.GITHUB_REPOSITORY}/blob/main/${fileName})`;

    if (isDeletedInMainBranch) {
      if (readmeContent.includes(link)) {
        readmeContent = readmeContent.replace(link, '');
      }
    } else {
      if (!readmeContent.includes(link)) {
        readmeContent += '\n' + link;
      }
    }
  });

  fs.writeFileSync(readmePath, readmeContent);
};

main();
