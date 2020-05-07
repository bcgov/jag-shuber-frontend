# Running the Sheriff-Scheduling Frontend in Docker

This is the frontend Docker portion of the Sheriff-Scheduling appliaction, it is dependent on the API portion of the application.  You will need to start and setup the API portion of the application first.

See the docker folder of the Sheriff-Scheduling API repository for details.

## Build
```
Wade@Epoch MINGW64 /c/jag-shuber-frontend/docker (master)
$ ./manage build
```

## Start
```
Wade@Epoch MINGW64 /c/jag-shuber-frontend/docker (master)
$ ./manage start
```

## Launch the app

http://localhost:8080/sheriff-scheduling


## Stop without deleting data
```
Wade@Epoch MINGW64 /c/jag-shuber-frontend/docker (master)
$ ./manage stop
```

## Cleanup / Reset
```
Wade@Epoch MINGW64 /c/jag-shuber-frontend/docker (master)
$ ./manage down
```