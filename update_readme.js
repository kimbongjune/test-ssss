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

//console.log("eventData", eventData)

// if(eventData && eventData.head_commit.message.includes("Delete")){
//     const deletedFile = eventData.head_commit.message.replace("Delete ", "");
//     console.log("delete", deletedFile)
//     const date = deletedFile.split('_')[0];
//     const title = deletedFile.split('_')[1].replace('.md', '');
//     const linkFile = `${deletedFile}`
//     const encodedLinkFile = encodeURIComponent(linkFile)
//     const deletedLink = `- [[${date}] ${title}](https://github.com/${repository}/blob/main/${encodedLinkFile})`;
//     console.log("deletedLink", deletedLink)
//     const escapedStringToBeReplaced = deletedLink.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//     readmeContent = readmeContent.replace(new RegExp(escapedStringToBeReplaced, 'g'), '');
// }else{
//     console.log("merge", eventData.head_commit.url)
// }

// const mdFiles = fs.readdirSync('.').filter(file => file.endsWith('.md') && file !== 'README.md');

// // 3번: 새로운 md파일의 링크를 추가
// mdFiles.forEach(file => {
//   const date = file.substring(0, 10);
//   const title = decodeURIComponent(file.substring(11, file.length - 3));
//   const linkFile = encodeURIComponent(file)
//   const newLink = `- [[${date}] ${title}](https://github.com/${repository}/blob/main/${linkFile})\n`;

//   if (!readmeContent.includes(newLink)) {
//     readmeContent += newLink;
//   }
// });

// console.log("readmeContent",readmeContent)

const changedFilesCommand = "git diff --name-only HEAD^ HEAD";
const changedFiles = execSync(changedFilesCommand).toString().trim().split('\n');

console.log("changedFilesCommand",changedFilesCommand)

console.log("changedFiles",changedFiles)

const options = { encoding: 'utf-8' };  // 인코딩을 명시적으로 설정

const changedFilesToUtf8 = execSync(changedFilesCommand, options).trim().split('\n');

console.log("changedFilesToUtf8",changedFilesToUtf8);

changedFiles.forEach(file => {
  if (file.includes('.md') && file !== 'README.md') {
    console.log("file",file)
    const filePathParts = file.replace(/"/g, '').split('/');
    console.log("filePathParts",filePathParts)
    const fileName = filePathParts.pop();
    console.log("fileName",fileName)
    const dirName = filePathParts.join('/');
    console.log("dirName",dirName)
    const date = fileName.substring(0, 10);
    console.log("dirName",date)
    const title = decodeURIComponent(fileName.substring(11, fileName.length - 3));
    console.log("title",title)
    const linkFile = encodeURIComponent(file);
    console.log("linkFile",linkFile)
    
    let linkToAdd;
    if (dirName) {
      linkToAdd = `- [[${date}] ${title}](https://github.com/${repository}/blob/main/${linkFile})\n`;
    } else {
      linkToAdd = `- [[${date}] ${title}](https://github.com/${repository}/blob/main/${linkFile})\n`;
    }

    console.log("linkToAdd",linkToAdd)
    
    if (!readmeContent.includes(linkToAdd)) {
      readmeContent += linkToAdd;
    }

    if(eventData && eventData.head_commit.message.includes("Delete")){
      console.log("Delete")
      const escapedStringToBeReplaced = linkToAdd.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      readmeContent = readmeContent.replace(new RegExp(escapedStringToBeReplaced, 'g'), '');
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
