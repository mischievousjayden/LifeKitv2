# LifeKitv2

Our Work Flow

We will be following a model of forks and branches. We each work on our own fork, and only me (who's managing operations) can merge to the master repo. If your git-fu fails you and everything is completely messed up, it won't affect anyone else this way, and you can always do a clean pull from master to reset everything.

First Steps

Click the button at the top of this repository that says "Fork". Then on your PC, clone your forked repository on your account. It may ask for credentials or other info and it's up to you to decide if/how to handle that.
Add upstream as a remote target (aka you can push/pull to it). The main repository will be called "upstream" and is added to your environment using git remote add upstream <The git link to the master repository that you forked from (my repo)> REMEMBER, NEVER EVER EVER DO SOMETHING THAT LOOKS LIKE push upstream
Your evironment should now be set up and ready to use
Basic Flow

I'm assuming some special cases here, chances are you can skip some of these steps (but they're all harmless in any case if you do a step you didn't have to).

Ensure you're up to date with upstream/master
Checkout master: git checkout master
Pull upstream: git pull upstream master
Update your fork: git push origin master
Put yourself on a branch other than master
If you need to make a new branch
Create a branch: git branch <name-of-branch>. Please use dashes instead of spaces because we're working on the commandline and nobody wants to re-learn why bash and quotes don't mix
Checkout that branch: git checkout <name-of-branch>
If the branch already exists:
Checkout that branch: git checkout <name-of-branch>
Make sure you're up to date: git rebase master
If the rebase said anything other than "Current branch <name-of-branch> is up to date." then push to your fork: git push origin <name-of-branch>
If git complains about something (just trust me on this one): git push origin <name-of-branch> -f
Actual coding work!
Write some code until you feel the need to commit (remember this is all local to you, so commit as often as possible because it won't affect anyone else)
Stage your changes: git add -A
Commit your changes: git commit -m "some useful commit message"
Push your changes: git push origin <name-of-branch>
Keep on coding until you've completed somethng big enough that other people need to look at it
PR: Pull Request / Peer Review
If you made way too many commits and it's confusing use git rebase -i HEAD~20. Be careful because you're rewriting history a bit here and can ruin your fork very quickly. Use git log to check that the result makes sense
When you're ready for review, log onto GitHub (hint: you're probably already here)
Go to the upstream project page
You should see a button at the top with your branch saying "Compare & Pull Request". Click that
Create a pull request with information about your commit. Please add in-line comments if things are confusing (though that should warrant code comments anyway)
If/when it's set up, CI should automatically test your PR and reject you if it's failing the tests
If you need to change something, you should still be able to push to that same branch in your fork and the PR will update, and CI should re-test your new code.
When you have a 👍 from two other group members, merge the PR by clicking the button at the bottom of the page.
