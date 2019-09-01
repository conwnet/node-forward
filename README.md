# node-forward

**Simple forward proxy for node.**

## Install

~~~shell
> npm -g i node-forward
~~~

## Usage

**CLI**

~~~shell
> forward 8080:80 # forward local 8080 port to local 80 port

> forward 8080:google.com:80 # forward local 8080 port to google.com 80 port

> forward 8080:google.com:80 # forward local 8080 port to google.com 80 port

> forward 127.0.0.1:8080:google.com:80 # forward local 8080 port to google.com 80 port, only accept requests from 127.0.0.1

> forward '[::]:8080:ipv6.google.com:80' # forward ipv6 connections
~~~

~~~shell
# reverse forward, it still is dangerous now!
# useful when you need intranet penetration

1. forward -l 8080 # on your server (maybe my_server.com)
2. forward -r my_server.com:8080 8010:1080 # on your computer

# then forward my_server.com:8010 to localhost:1080
~~~

**ENV**

~~~shell
> NODE_FORWARD=8080:80 node index.js

# ...same as above
~~~
