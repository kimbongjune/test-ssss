import os

def update_readme_with_new_md_file(new_md_file_path):
    # Extract info from the new MD file path
    filename = os.path.basename(new_md_file_path)
    display_name = filename.replace(".md", "").replace("_", " ")
    link = f"- [[{display_name}]]({new_md_file_path})\n"

    # Read the existing README
    with open("README.md", "r") as f:
        lines = f.readlines()

    # Append the new link at the end of README.md
    lines.append(link)

    # Write back to README
    with open("README.md", "w") as f:
        f.writelines(lines)

if __name__ == "__main__":
    # Replace with the actual new MD file path when running through GitHub Actions
    new_md_file_path = "your_new_md_file_path_here.md"
    update_readme_with_new_md_file(new_md_file_path)
