import os
import sys

def get_changed_md_files():
    return [f for f in sys.argv[1:] if f.endswith('.md')]

def update_readme(changed_files):
    with open("README.md", "r") as f:
        lines = f.readlines()

    for changed_file in changed_files:
        file_name = os.path.basename(changed_file)
        link_name = "_".join(file_name.split("_")[1:]).replace(".md", "")
        link = f"- [[{link_name}]]({changed_file})\n"

        if link in lines:
            lines.remove(link)
        else:
            lines.append(link)

    with open("README.md", "w") as f:
        f.writelines(lines)

if __name__ == "__main__":
    changed_files = get_changed_md_files()
    update_readme(changed_files)
