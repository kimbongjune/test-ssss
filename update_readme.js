const fs = require('fs');
const { getOctokit } = require('@actions/github');

const token = process.env.GITHUB_TOKEN;
const repository = process.env.GITHUB_REPOSITORY;
const octokit = getOctokit(token);

let sha;
let readmeContent = '';

// 6번: README가 없으면 생성
if (fs.existsSync('README.md')) {
  readmeContent = fs.readFileSync('README.md', 'utf8');
} else {
  readmeContent = '# Today I Learned(TIL)\n## 카테고리\n';
}

const mdFiles = fs.readdirSync('.').filter(file => file.endsWith('.md') && file !== 'README.md');

// 3번: 새로운 md파일의 링크를 추가
mdFiles.forEach(file => {
  const date = file.split('_')[0];
  const title = decodeURIComponent(filename.substring(11, filename.length - 3));
  const newLink = `- [[${date}] ${title}](encodeURIComponent(https://github.com/${repository}/blob/main/${file}))\n`;

  if (!readmeContent.includes(newLink)) {
    readmeContent += newLink;
  }
});

console.log("process.env.GITHUB_EVENT_NAME", process.env.GITHUB_EVENT_NAME)
console.log("process.env", process.env)

if (process.env.GITHUB_EVENT_NAME === 'push') {
  console.log("push")
}

// 7번: 삭제된 md파일의 링크를 제거
if (process.env.GITHUB_EVENT_NAME === 'delete') {
  console.log("delete")
  const deletedFile = process.env.GITHUB_EVENT_PATHS;
  const deletedLink = `- [[${deletedFile.split('_')[0]}] ${encodeURIComponent(deletedFile.split('_')[1].replace('.md', ''))}]`;
  const linkRegex = new RegExp(`.*${deletedLink}.*\n`);
  readmeContent = readmeContent.replace(linkRegex, '');
}
console.log("readmeContent",readmeContent)

// 5번: README.md 파일을 메인 브랜치에 바로 푸시
fs.writeFileSync('README.md', readmeContent);

(async () => {
  const { data } = await octokit.rest.repos.getContent({
    owner: repository.split('/')[0],
    repo: repository.split('/')[1],
    path: 'README.md',
  });
  sha = data.sha;
  
  await octokit.rest.repos.createOrUpdateFileContents({
    owner: repository.split('/')[0],
    repo: repository.split('/')[1],
    path: 'README.md',
    message: 'Automatically updated README.md',
    content: Buffer.from(readmeContent).toString('base64'),
    branch: 'main',
    sha: sha
  });
})();
