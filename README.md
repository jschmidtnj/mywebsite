# mywebsite
personal website

See [this](https://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc) for instructions for fixing watch enospc error  
1. `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
1. for arch: `fs.inotify.max_user_watches=524288`
2. `npm start`