# morecat-web

This is Web Front-End for [MoreCat](https://github.com/emag/morecat).

## Setup

~~~ sh
# For CentOS 6.5
yum -y install http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
~~~

~~~ sh
yum -y install npm
npm install -g bower
npm install -g gulp
npm install -g forever
~~~

~~~ sh
git clone https://github.com/emag/morecat-web.git
cd morecat-web
~~~

~~~ sh
# Set Your MoreCat URL
grep -lr "morecat.emamotor.org" | xargs sed -i "s/morecat\.emamotor\.org/<your-morecat-domain>:<your-morecat-port>/g"
~~~

~~~ sh
npm install
bower install
forever start server.js
~~~

## For Development

~~~ sh
gulp
~~~

## For Production

~~~ sh
gulp --release
~~~

access to `http://localhost:8888`
