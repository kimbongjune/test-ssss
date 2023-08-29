import os
import re
from github import Github

# Parse the merged filename
merged_filename = os.environ.get('MERGED_FILENAME')
date_match = re.match(r'^(\d{4}-\d{2}-\d{2})_(.*)\.md$', merged_filename)
if not date_match:
    exit("Invalid merged filename format")

# Extract components from the filename
file_date = date_match.group(1)
file_title = date_match.group(2).replace("-", " ")

# Construct the link
repo_name = os.environ.get('REPO_NAME')  # Getting repo name from environment variable
file_link = f"- [[{file_date}] {file_title}](https://github.com/{repo_name}/blob/main/{merged_filename})"

# Add the link to the README.md file
readme_path = 'README.md'
with open(readme_path, 'r') as readme_file:
    readme_content = readme_file.read()

readme_content = f"{file_link}\n{readme_content}"

with open(readme_path, 'w') as readme_file:
    readme_file.write(readme_content)

# Initialize the GitHub API
g = Github(os.environ['GITHUB_TOKEN'])
repo = g.get_repo(repo_name)

# Commit the changes
branch = repo.get_branch('main')
tree = repo.get_git_tree(branch.commit.sha, recursive='true')
element = tree.tree[0]
base_tree = repo.get_git_tree(element.sha, recursive='true')
output_tree = repo.create_git_tree(
    [
        {
            "path": readme_path,
            "mode": "100644",  # Regular file mode
            "type": "blob",
            "content": readme_content,
        }
    ],
    base_tree
)

commit = repo.create_git_commit(
    "Update readme with merged file link",
    output_tree,
    [branch.commit],
)

# Update the reference
branch.edit(commit.sha)
