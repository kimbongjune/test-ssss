import sys

def update_readme(changed_files):
    with open("README.md", "r") as f:
        lines = f.readlines()

    for changed_file in changed_files:
        link_name = "_".join(changed_file.split("_")[1:]).replace(".md", "")
        link = f"- [[{link_name}]]({changed_file})\n"

        if link in lines:
            lines.remove(link)
        else:
            lines.append(link)

    with open("README.md", "w") as f:
        f.writelines(lines)

if __name__ == "__main__":
    changed_files = sys.argv[1:]
    update_readme(changed_files)
