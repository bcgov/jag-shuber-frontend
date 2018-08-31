
# How to contribute

Government employees, public and members of the private sector are encouraged to contribute to the repository by **forking and submitting a pull request**. 

(If you are new to GitHub, you might start with a [basic tutorial](https://help.github.com/articles/set-up-git) and  check out a more detailed guide to [pull requests](https://help.github.com/articles/using-pull-requests/).)

Pull requests will be evaluated by the repository guardians on a schedule and if deemed beneficial will be committed to the master.

All contributors retain the original copyright to their stuff, but by contributing to this project, you grant a world-wide, royalty-free, perpetual, irrevocable, non-exclusive, transferable license to all users **under the terms of the license under which this project is distributed.**

## Developing Features
The following process should be used when developing a feature
* Create a Branch - a branch should be created for any new piece of work
    - Switch to the branch you would like to branch from (e.g. master) and sync that branch
    - Create a new branch, named for the feture you are working on using kabob case (_e.g._ my-new-branch)
* Commit and Sync Often
    - When working on your branch, commit and sync your changes to github often
    - Try to logicially group and name your commits; this makes it easier for the PR
* Create a Pull Request (PR)
    - Sync your local master with origin
    - Switch to your working branch
    - Rebase your working branch (_e.g._ my-new-branch) against master 
        - Ensure all changes have been comitted and synchronized
        - Run `git rebase master`
        - Resolve any conflicts
        - Run `git rebase --continue`
        - Continue to resolve the conflicts and continue the rebase, until no conflicts remain (NOTE: the rebase can be ended at any time by running `git rebase --abort`)
    -  Force Push the rebase onto your remote brach
        - Run `git push -f`
    -  Create a Pull Request for your branch from GitHub, add at least one reviewer
* Review comments on PR, make any changes, and commit
    - mark comments as reviewed/addressed, by **reacting** with the 👍 , that way there aren't a ton of spam emails sent out for comments.
* Merge branch into master and delete branch
* From VS Code, prune your branches
    - Run `git prune`
* From VS Code, delete your local branch  
    - Switch to a non-working branch (_e.g._ master) 
    - Hit `Ctrl+Shift+P`
    - Start typing `Git: Delete Branch` and select the option when it appears
    - Select your working branch to delete it
