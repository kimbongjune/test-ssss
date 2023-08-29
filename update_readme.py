from github import Github
import os

def main():
    token = os.getenv("GH_TOKEN")
    repo_name = "kimbongjune/TIL"  # Replace with your repo name
    g = Github(token)
    repo = g.get_repo(repo_name)
    readme = repo.get_contents("README.md", ref="main")
    
    if readme is None:
        print("README.md not found")
        return

    new_md_files = [f for f in repo.get_contents("", ref="main") if f.name.endswith('.md')]

    updated_readme = ""
    for md_file in new_md_files:
        if md_file.name == "README.md":
            continue
        title = md_file.name.split("_")[1].replace(".md", "")
        date = md_file.name.split("_")[0]
        link = md_file.html_url
        updated_readme += f"- [[{date}] {title}]({link})\n"

    repo.update_file(readme.path, "Updated README", updated_readme, readme.sha, branch="main")

if __name__ == "__main__":
    main()
