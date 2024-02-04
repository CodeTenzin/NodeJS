// 2 - Installing MongoDB on Mac

/*
https://brew.sh
brew is a package manager for mac. similar to npm.
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

now can install mongo db now. 
brew install mongodb
sudo mkdir -p /data/db          <-- by default mongodb stores its data in this dir.
sudo chown -R `id -un` /data/db    <--  so that the data dir have the roght persmissions.

brew install mongodb/brew/mongodb-community
 
mongod   <-- mongo daemon. service that runs in the background and listens to service on a given port. 


https://www.mongodb.com
download Compass   <- client app to connect to mongo db server .

brew install mongodb-atlas
atlas setup

mkdir -p ~/data/db
sudo chown -R `id -un` ~/data/db
mongod <-- if this doesnt work
mongod --dbpath ~/data/db --port 27018





/opt/homebrew/etc/mongod.conf


brew services start mongodb-communit
brew services stop mongodb-communit



brew services start mongodb-community
mongod --version
file $(which mongod)



sudo rm /tmp/mongodb-27017.sock
mongod --dbpath=/Users/user/data/db


WORKED???!!!
mkdir -p /Users/user/data/db      or 
sudo mkdir -p /Users/user/data/db
sudo chmod -R 777 /Users/user/data/db
mongod --dbpath=/Users/user/data/db
// The server is listening on 127.0.0.1 (localhost) at port 27017.

to enable authentication
mongod --dbpath=/Users/user/data/db --auth

to allow remote connections
mongod --dbpath=/Users/user/data/db --bind_ip_all


// WORKED.
// You can try creating the directory in a location where you have write permissions. For example, you can create it in your home directory:
mkdir -p ~/data/db
mongod --dbpath ~/data/db

*/
