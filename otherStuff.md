# Git commands (local)

git init - Create a new git repo \
git status - View the staging area \
git add . - Add file to staiging area \
git commit -am "commit comment" - Create a new commit from staiging area \
git log - view latest commit history \

# Git commands (remote)
git remote add origin https://github.com/Shatt001/Notes-app-final.git - add remote repo origin \
git checkout -b new-branch-name - create and change to new branch \
git pull origin master:new-branch-name - pull all source from remote master to local branch \
git push origin pz-feature:pz-feature - push local feature-branch source to remote feature-branch for merge request \ 

# Workflow
1. Init git with (git init)
2. Set remote origin (git remote add origin https...)
3. create and checkout new feature branch (git checkout -b pz-feature)
4. Pull master as local feature-branch from remote origin (git pull origin master:pz-feature)
5. Implement changes on feature branch
6. Push feature-branch to remote repo as feature branch (git push origin pz-feature:pz-feature)
7. Create pull request (on github interface)
8. Ask for merge request
