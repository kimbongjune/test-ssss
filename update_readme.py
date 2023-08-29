import sys
import os

def update_readme(changed_files):
    for added_file in changed_files:
        if added_file.endswith('.md'):
            date, title = added_file.split("_", 1)
            title = title.replace(".md", "")
            new_link = f"- [[{date}] {title}](https://github.com/{os.environ['GITHUB_REPOSITORY']}/blob/main/{added_file})\n"
            with open("README.md", "a") as f:
                f.write(new_link)

if __name__ == "__main__":
    changed_files = sys.argv[1].split(',')
    update_readme(changed_files)
