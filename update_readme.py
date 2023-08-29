import os
import subprocess

def update_readme():
    last_commit_files = subprocess.getoutput('git diff --name-only HEAD~1..HEAD').split("\n")
    added_file = [f for f in last_commit_files if f.endswith('.md')]

    if not added_file:
        return
    
    added_file = added_file[0]
    date, title = added_file.split("_", 1)
    title = title.replace(".md", "")
    new_link = f"- [[{date}] {title}](https://github.com/kimbongjune/TIL/blob/main/{added_file})\n"

    with open("README.md", "a") as f:
        f.write(new_link)

if __name__ == "__main__":
    update_readme()
