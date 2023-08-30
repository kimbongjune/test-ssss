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

const githubEventPath = process.env['GITHUB_EVENT_PATH']
const eventData = JSON.parse(fs.readFileSync(githubEventPath, 'utf-8'))

if(eventData && eventData.head_commit.message.includes("Delete")){
    console.log("delete", eventData.head_commit.url)
    const deletedFile = eventData.head_commit.message.split(' ')[1];
    const date = deletedFile.split('_')[0];
    const title = deletedFile.split('_')[1].replace('.md', '');
    const deletedLink = `\\[\\[${date}\\] ${title}\\]\\(https://github.com/${repository}/blob/main/${encodeURIComponent(deletedFile)}\\)`;
    const linkRegex = new RegExp(deletedLink, 'g');
    readmeContent = readmeContent.replace(linkRegex, '');
}else{
    console.log("merge", eventData.head_commit.url)
}

const mdFiles = fs.readdirSync('.').filter(file => file.endsWith('.md') && file !== 'README.md');

// 3번: 새로운 md파일의 링크를 추가
mdFiles.forEach(file => {
  const date = file.substring(0, 10);
  const title = decodeURIComponent(file.substring(11, file.length - 3));
  const linkFile = encodeURIComponent(file)
  const newLink = `- [[${date}] ${title}](https://github.com/${repository}/blob/main/${linkFile})\n`;

  if (!readmeContent.includes(newLink)) {
    readmeContent += newLink;
  }
});

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
