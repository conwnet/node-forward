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
~~~

**ENV**

~~~shell
> NODE_FORWARD=8080:80 node index.js

# ...same as above
~~~
