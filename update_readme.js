const axios = require('axios');

const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');

async function fetchGithubRepoStructure() {
  try {
    const { data } = await axios.get(`https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`);
    let directories = {};
    let output = "";

    for (const item of data.tree) {
      const splitPath = item.path.split('/');
      let subDir = directories;

      for (let i = 0; i < splitPath.length; i++) {
        const part = splitPath[i];

        if (!subDir[part]) {
          if (i === splitPath.length - 1 && item.type === 'blob') {
            output += ' '.repeat(i * 2) + `📄 ${part}\n`;
          } else {
            output += ' '.repeat(i * 2) + `📂 ${part}\n`;
            subDir[part] = {};
          }
        }

        subDir = subDir[part];
      }
    }

    console.log(output);

  } catch (err) {
    console.error(err);
  }
}

fetchGithubRepoStructure();
