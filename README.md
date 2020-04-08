# TodoApp

System Requirements
1. Node.js installed 
2. Xcode for iOS
3. React Native CLI

Setting up the local server:
1. Download index.js and package.json in TodoAPI and move them to a directory (perhaps named TodoAPI)
2. npm install dependencies
3. node index.js to start the local server listening on localhost:8000

Setting up the react native frontend (for iOS):
1. npx react-native init TodoExample
2. Download App.js and package.json
3. Replace App.js in project creation with App.js downloaded from TodoExample on Github
4. npm install dependencies
5. cd ios, pod install, cd ..
6. npm start to start metro server at the root directory of react native project
7. react-native run-ios to run the ios app
8. The app should then load and run
