import sys
import os

def update_readme(merged, pr_title):
    if not merged:
        return

    added_files = [f for f in os.listdir() if f.endswith('.md') and pr_title in f]
    
    if not added_files:
        return
    
    added_file = added_files[0]
    date, title = added_file.split("_", 1)
    title = title.replace(".md", "")
    new_link = f"- [[{date}] {title}](https://github.com/{GITHUB_REPOSITORY}/blob/main/{added_file})\n"

    with open("README.md", "a") as f:
        f.write(new_link)

if __name__ == "__main__":
    merged = sys.argv[1] == 'true'
    pr_title = sys.argv[2]
    update_readme(merged, pr_title)
