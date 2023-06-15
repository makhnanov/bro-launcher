# BRO Launcher 
# Public Community Edition Beta: 
# [http://bro-launcher.com](http://bro-launcher.com)
## BRO Launcher is useful tool for save bookmarks and launch app in your new tab in browser.
![BRO Launcher](https://github.com/makhnanov/bro-launcher/blob/master/preview/img/v.1.4.5.png?raw=true)
## Step 1: Install one of add-ons for your browser
[Firefox](https://addons.mozilla.org/en-US/firefox/addon/new-tab-override/) \
[Chrome](https://chrome.google.com/webstore/detail/custom-new-tab-url/mmjbdbjnoablegbkcklggeknkfcjkjia)
## Step 2: Select one of the installation options:
### Option 1: Install app via only html & css & js build (Easiest)
#### Download and unzip build
[Download build](https://github.com/makhnanov/bro-launcher-build/archive/refs/heads/main.zip)
#### Open index.html and copy url
### Option 2: Install server via docker (For advanced users)
```shell
git clone https://github.com/makhnanov/bro-launcher.git
# or # git clone git@github.com:makhnanov/bro-launcher.git # for add pull request
```
```shell
make
xdg-open http://localhost:3389/
# or open in browser http://localhost:3389/ 
# copy http://localhost:3389/ for paste in browser ext
```
## Step 3: Add app link to extension, keep calm and start use BRO Launcher!
#### For html build use link with your file from previous step e.g.:
```shell
file:///home/roman/Desktop/bro-launcher-build-main/index.html
```
#### For docker server use link:
```shell
http://localhost:3389/
```
#### For Firefox (Allow install only with docker)
![Firefox ext](https://github.com/makhnanov/bro-launcher/blob/master/src/src/img/FirefoxExt.png?raw=true)
![Firefox ext](https://github.com/makhnanov/bro-launcher/blob/master/src/src/img/FirefoxExtLink.png?raw=true)
#### For Chrome
![Chrome ext](https://github.com/makhnanov/bro-launcher/blob/master/src/src/img/ChromeExt.png?raw=true)
![Chrome ext link](https://github.com/makhnanov/bro-launcher/blob/master/src/src/img/ChromeExtLink.png?raw=true)
