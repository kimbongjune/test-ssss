import sys
import os

def update_readme(added_files):
    if not added_files:
        return

    for added_file in added_files.split(','):
        if added_file.endswith('.md'):
            date, title = added_file.split("_", 1)
            title = title.replace(".md", "")
            new_link = f"- [[{date}] {title}](https://github.com/kimbongjune/TIL/blob/main/{added_file})\n"
            
            with open("README.md", "a") as f:
                f.write(new_link)

if __name__ == "__main__":
    added_files = sys.argv[1]
    update_readme(added_files)
