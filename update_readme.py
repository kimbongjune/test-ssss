import os

def add_link_to_readme():
    commit_files = os.getenv('GITHUB_SHA').split(",")
    with open("README.md", "a") as f:
        for file in commit_files:
            if file.endswith(".md"):
                path = file
                link_name = " ".join(path.split("_")[1:]).replace(".md", "")
                link = f"- [[{link_name}]](https://github.com/${{ github.repository }}/blob/main/{path})"
                f.write(link + "\n")

if __name__ == "__main__":
    add_link_to_readme()
