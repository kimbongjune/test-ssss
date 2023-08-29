import os
import re

def get_md_files():
    md_files = []
    for root, dirs, files in os.walk("."):
        for file in files:
            if file.endswith(".md") and file != "README.md":
                path = os.path.join(root, file).replace("./", "")
                md_files.append(path)
    return md_files

def extract_link_name(md_file):
    date_removed = re.sub(r"^\d{4}-\d{2}-\d{2}_", "", md_file)
    return os.path.splitext(date_removed)[0]

def update_readme(md_files):
    with open("README.md", "r") as f:
        lines = f.readlines()

    new_lines = []
    uncategorized_lines = []

    for md_file in md_files:
        link_name = extract_link_name(md_file.split('/')[-1])
        link = f"- [[{link_name}]]({md_file})"
        depth = md_file.count("/")
        header = "#" * (depth + 1)
        section_name = md_file.split("/")[-2] if depth > 0 else "미분류"

        section_found = False
        for i, line in enumerate(lines):
            if line.startswith(header + " " + section_name):
                section_found = True
                while i + 1 < len(lines) and not lines[i + 1].startswith("#"):
                    i += 1
                lines.insert(i, link + "\n")
                break

        if not section_found:
            line_to_add = f"{header} {section_name}\n{link}\n"
            if section_name == "미분류":
                uncategorized_lines.append(line_to_add)
            else:
                new_lines.append(line_to_add)

    uncategorized_header = "# 미분류\n" if uncategorized_lines else ""

    updated_lines = lines + new_lines + [uncategorized_header] + uncategorized_lines

    with open("README.md", "w") as f:
        f.writelines(updated_lines)

if __name__ == "__main__":
    md_files = get_md_files()
    update_readme(md_files)
