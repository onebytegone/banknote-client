## NOTE: This is in progress. There is no stable release yet.

# banknote-client
This is a clientside app for tracking personal finances. 

It should be noted that because of the way javascript stores numbers, there is a possibility of rounding errors. Steps have been taken to prevent this issue. However, until further testing is done, this warning is needed.


## Setup

To build the needed files, run:

```
cp src/config.demo.js src/config.js
npm install
grunt build-all
```


## License

Banknote is released under the MIT license. See LICENSE.md for more information.
