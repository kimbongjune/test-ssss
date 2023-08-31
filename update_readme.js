const fs = require('fs');
const { execSync } = require('child_process');
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

//const changedFilesCommand = "git diff --name-only HEAD^ HEAD";
const changedFilesCommand = "git -c core.quotepath=false diff --name-status HEAD^ HEAD";
//const changedFiles = execSync(changedFilesCommand).toString().trim().split('\n');
const changedFiles = execSync(changedFilesCommand, { encoding: 'utf8' }).toString().trim().split('\n');

console.log("changedFilesCommand",changedFilesCommand)
console.log("changedFiles",changedFiles)

changedFiles.forEach(file => {
  if (file.includes('.md') && file !== 'README.md') {
    const file = file.split(" ")[1]
    const filePathParts = file.replace(/"/g, '').split('/');
    const fileName = filePathParts.pop();
    const dirName = filePathParts.join('/');
    const date = fileName.substring(0, 10);
    const title = decodeURIComponent(fileName.substring(11, fileName.length - 3));
    const linkFile = encodeURIComponent(file);
    
    let linkToAdd = "";
    if (dirName) {
        const dirs = dirName.split('/');
        for (let i = 0; i < dirs.length; i++) {
            const currentDir = dirs[i];
            if (!readmeContent.includes(`- ${currentDir}\n`)) {
                linkToAdd += `- ${currentDir}\n`;
            }
            linkToAdd += '\t'.repeat(i + 1);
        }
        linkToAdd += `- [[${date}] ${title}](https://github.com/${repository}/blob/main/${linkFile})\n`;
    } else {
        linkToAdd += `- [[${date}] ${title}](https://github.com/${repository}/blob/main/${linkFile})\n`;
    }

    // 파일이 삭제되었을 때
    if (eventData && eventData.head_commit.message.includes("Delete")) {
        const escapedStringToBeReplaced = linkToAdd.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        readmeContent = readmeContent.replace(new RegExp(escapedStringToBeReplaced, 'g'), '');
    }else {
        if (!readmeContent.includes(linkToAdd)) {
            readmeContent += linkToAdd;
        }
    }
  }
});

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
