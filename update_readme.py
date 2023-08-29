from github import Github
import os

def main():
    token = os.getenv("GH_TOKEN")
    repo_name = "kimbongjune/test-ssss"  # 귀하의 리포지터리 이름으로 변경해주세요
    g = Github(token)
    repo = g.get_repo(repo_name)

    try:
        readme = repo.get_contents("README.md", ref="main")
        print(f"Path: {readme.path}, SHA: {readme.sha}")  # 추가한 디버깅 라인
    except Exception as e:
        print(f"Error while fetching README.md: {e}")
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

    print(f"Path: {readme.path}, SHA: {readme.sha}")
    try:
        repo.update_file(readme.path, "Updated README", updated_readme, readme.sha, branch="main")
    except Exception as e:
        print(f"Error while updating README.md: {e}")

if __name__ == "__main__":
    main()
