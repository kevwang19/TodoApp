# TodoApp

System Requirements
1. Node.js installed 
2. Xcode and Cocoapods for iOS
3. React Native CLI

Setting up the local server:
1. Download index.js and package.json in TodoAPI and move them to a directory (perhaps named TodoAPI)
2. npm install dependencies in project root directory
3. node index.js to start the local server listening on localhost:8000

Setting up the react native frontend (for iOS):
1. npx react-native init TodoExample
2. Download App.js and package.json
3. Replace App.js from project creation with App.js downloaded from TodoExample on Github
4. Replace package.json from project creation with package.json downloaded from TodoExample on Github
5. npm install dependencies in project root directory
6. cd ios, pod install, cd ..
6A. If you get an error something like "missing" script is too old or missing in the cocopoads step, try 
  sudo xcode-select --switch /Applications/Xcode.app
7. npm start to start metro server at the root directory of react native project
8. npx react-native run-ios to run the ios app (this must be done in a new terminal window, since the old one is now running metro server)
9. The app should then load and run


Data Structure:

4. Each task has three properties - name, completed, time. Name is string which makes sense. I used boolean for completed because tasks are either completed or not. If they are deleted, the whole object is deleted, so the property becomes irrelevant. For time, I used numbers - for example, 10.5 is 10:30 am, 13.5 is 1:30pm - because it is easier to interpret the value of that number and format it into a time, rather than interpreting the value of something like 10:30 am. The app needs to interpret the value of time because it needs to order the tasks chronologically...maybe there are packages to order time, but the different formatting makes it hard, so just plain numbers work well to represent the time. The list of tasks are then stored as an array of task objects in state. 

Testing:

5. Have spent around 5 hours on the project already, and although I understand testing theoretically/its purpose, I decided to not to implement it since I would have to make my code more complex to test the non-obvious on the backend, and on the frontend I do not have enough experience to quickly implement tests that check whether certain components are rendering correctly.
6. However, theoretically speaking, I would implememt a test on the backend to check once the API is called, whether it's returning the correct number of tasks. The functionality of the express app is so basic, it's hard to imagine what should be tested.... On the frontend, I could check whether after I add a task and push the save button, the task's data is saved correctly to state, and then whether the array of tasks in state is ordering thet tasks correctly by time. If anything were to go wrong for some reason, adding new data to the view probably introduces more risk (wrong data types, formats, ordering, updating the view) for problems than deleting tasks, or marking them as completed.
