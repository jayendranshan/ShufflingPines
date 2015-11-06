# Assignment 2: Shuffling Pines

## Guest List form

1. Created a form and put it under controller "ShufflingController"
2. Form has guest name, transition date, status of the guest and location.
3. Status will have 2 option at first pickup and dropoff.
4. Admins can enter the details and submit the form.
5. Location will be available only if pickup is selected.
6. By default , dummy user will be available at the right side of the form.
7. Required field validation is done in the form. Admin can add the guests only if the required field is populated.
8. Once form is filled and submit button is clicked, the guest list will be added in the GUEST tab.
9. Guest tab will have index for each guest.
10. Guest tab will have option to delete and edit the guest information.
11. Clicking edit button will have editable controllable populating the details already.
12. Status will be shown by the rule. In the editable mode, admins cannot change the value.
      "pick up" will be "arrived"
      "drop off" will be "arrived"
      "arrived" will be "pick up". 

## Controller

1. I have used 2 controllers
    *. ShufflingController
    *. GuestListController.
2. ShufflingController will have the form to create new guests.
3. GuestListController will have the guest list and option to edit and delete the guest list inline.

## Model

1. Used Service for model.
2. All data operation like Add, Delete, Edit/Update and status change are done in the service.
3. LocalStorage action are also done in the service only. These operations are used to maintain the data in the session.
    1. setItem
    2. getItem
    3. removeItem
4. Guest list is stored/edited in the local storage after edit and delete operation
5. Status change rule was also implemented in the service only.

## Test

1. Angular mock is installed .
2. Module service is used to include the required controller and Service.
3. Inject service is used to inject the scope.
4. Both the controllers and services are tested. 
5. Test is written for Add, Edit , Remove, Get the list, check for local storage and status change.
4. Gulp is used.
5. Concat JS and CSS (for vendor libs and our application).
6. Uglify the JS and Minify the CSS.
7. Karma is used to run the jasmine test.
8. JSHint tests.

