import os

def update_readme(changed_files):
    with open("README.md", "a") as f:
        for changed_file in changed_files:
            if changed_file.endswith('.md'):
                date, title = changed_file.split("_", 1)
                title = title.replace(".md", "")
                new_link = f"- [[{date}] {title}](https://github.com/kimbongjune/TIL/blob/main/{changed_file})\n"
                f.write(new_link)

if __name__ == "__main__":
    changed_files = os.environ['CHANGED_FILES'].split()
    update_readme(changed_files)
