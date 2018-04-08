# Sample Project
* **Check over your branch and create if it is not existed**
Brief description about demo:
Making a small project with some features below:
* **Language and libs**

1. Vue
2. Typescript
* **Libs support:** 

1. vue-class-component
2. vue-property-decorator
3. vuex (state management)
4. vuex-class 
5. axios
6. fullcalendar
7. vue2-google-map
* **GUI lib:** 
element-ui
bootstrap
## Prerequisites
### Language and libs:
* **Vue**
* **Typescript**

### Libs support
* **vue-class-component**
* **vue-property-decorator**
* **vuex (state management)**
* **vuex-class** 
* **axios**
* **fullcalendar**
* **vue2-google-map**
#### GUI lib:
* **element-ui**
* **bootstrap**

### Features:
This demo must have 2 main pages
#### 1. User
+ Get list of user and display as table:

Create service integrate api to get list of users from the server (our internal or any external server) then save to store and create user listing component to get data from the store and display to view
Create a new user/ Modify a existed user. This feature should have only one modal for 2 mode creating and updating. After user clicking on save button, the model will be closed and list of user must be refetched
The modal of user has some fields personal information:
+ First name
+ Last name
+ Email
+ Username
+ Password
+ Phone number
+ Address....
#### 2. Agenda

Init calendar use fullcalendar library.
+ Create service integrate api to get list of events and display to calendar with 4 mode: Monthly, Weekly, Daily and List
+ The specific event must have some info: start time, end time, title, description and owners
The user is able to create a new events for themeselves or another one or other users.
The calendar is able to filter events by resource (single or multi resources)
The user is able to update a current info of event.
When user clicks on the create event button, the modal for creating will be displayed. It also has the same behavior like user screen, 1 modal for both 2 mode creating and updating.
The modal includes some field:
+ Start time and end time (date time picker)
+ Title
+ Description
+ Appointment place: Using google map autocomplete
+ A map display a marker on map to show the place where the appointment is. When click on marker, the info window will be display to show exact appointment address on the map
Note: When you research: Please create sub-task to comment the result (output) of your researching.