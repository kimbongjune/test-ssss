import os
import re

def get_md_files(directory):
    md_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".md") and root == directory:
                md_files.append((root, file))
    return md_files

def extract_link_name(md_file):
    return re.sub(r"^\d{4}-\d{2}-\d{2}_", "", md_file[:-3])

def update_readme(md_files, readme_path):
    tree = {}
    uncategorized = []

    for root, file in md_files:
        link_name = extract_link_name(file)
        link = f"* [[{link_name}]]({root}/{file})"

        categories = root.split("/")
        node = tree
        for cat in categories:
            node = node.setdefault(cat, {})
        
        node.setdefault("links", []).append(link)

    def build_readme(node, depth):
        if "links" in node:
            return "\n".join(sorted(node["links"]))
        
        result = []
        for key, child_node in sorted(node.items()):
            header = "#" * depth
            sub_content = build_readme(child_node, depth + 1)
            section = f"{header} {key}\n{sub_content}"
            result.append(section)
        return "\n".join(result)

    readme_content = build_readme(tree, 1)
    with open(readme_path, "w") as f:
        f.write(readme_content)

if __name__ == "__main__":
    directory = "."  # 루트 디렉토리
    readme_path = "./README.md"
    md_files = get_md_files(directory)
    update_readme(md_files, readme_path)
