# icsDOTjs
Library for creating .ics files via javascript


## Getting started
Implement the script into your code.
```javascript
<script src="./PATH/TO/icsDOTjs.js"></script>
```
Now create a new logic js file for your own code.

## Create a ics-event
```javascript
var dateStart = new Date();        // Select when the event starts
var dateEnd = new Date();          // Select when the event ends
var title = "Name of the meeting"; // Select the title of the event 

var js2Ics = new icsDOTjs(dateStart, dateEnd, title);
```

## Change description of ics-event
```javascript
js2Ics.description = "Put your description here";
```

## Change location of ics-event
```javascript
js2Ics.location = "Put your location here";
```

## Enable recurrence (available since version 1.4)
```javascript
var mode = "DAILY";
var type = "INTERVAL";
var expires = new Date();
expires.setDate(31);

var repetition = new ICSRepetition(mode, type, 2, expires);
if(repetition.validate()){
    ics2js.setRepetition(repetition);
}

/*
  Possible modes:
  [SECONDLY, MINUTELY, HOURLY, DAILY, WEEKLY, MONTHLY, YEARLY]

  Possible types:
  [COUNT, INTERVAL, BYMONTHDAY]

*/

```

## Enable a reminder
```javascript
var reminderEnabled = true;
var reminderMinutes = 5;

js2Ics.enableReminder();          // Default values with true, 5
js2Ics.enableReminder(reminderEnabled, reminderMinutes);
```

## Export file as .ics file
```javascript
var filename = "event";
js2Ics.export();                  // Default values with "event"
js2Ics.export(filename);          
```
