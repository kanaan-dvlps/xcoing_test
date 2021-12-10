### Dockerfile
In the dockerfile I've included two stages:
- Building the image:
The ```npm ci``` command will run alternatively to npm install in order to only install dependencies that are needed in production.

In this stage we will build the image based on a full image of Node.js and then removing the ```.npmrc``` for security practices.

- Running the image:
In the second stage I'll run the whole image based on the alpine version and since we have already built the image based on its full version (image) we have every dependency that we need which might be eleminated from alpine image and we've copied our package.json file in order to have them all befor running our image based on the alpine version.

Then we will use the default user that the docker makes for us inside the container and we alter every action that needs root privilages to the user that we've changed via using ```chown``` command and then will run the dev environment.
**The container is running the ```npm run start``` which uses the built backend.**

- Run the service:
**To run the service** use the command ```docker-compose up -d --build``` and then ```docker ps -a``` copy your container's ID and then run the command ```docker logs -f <container_id>``` to see all of your logs.

- Gracefully teardown the service:
I've also handled the graceful teardown of the server in order to privent any sudden connection intruption if any intruption happend and server stopped, hence we won't lose any data or suddenly kill any process that we have.

### Code review
I've changed the variable declararion from ```var``` to ```cont``` in the code base to use ES6 and also privent any leackage of data.

As far as I've tested the other modules there weren't any other changes needed.