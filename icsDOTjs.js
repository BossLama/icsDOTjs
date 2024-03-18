class icsDOTjs{

    // Create a new icsDotJS-Object with default date
    constructor(startDate, endDate, title){
        this.start = this.translateDate(startDate);
        this.end = this.translateDate(endDate);
        this.title = title;
        this.description = "Erstellt mit icsDotJS";
        this.location = "Online";
        this.uid = new Date().getTime() + "@example.com";
        this.hasAlert = false;
    }


    //Translate date to iso
    translateDate(date = new Date()){
        var translated = "";
        translated += date.getFullYear();

        if(date.getMonth() < 9){
            translated += "0" + (Number(date.getMonth()) + 1);
        }else{
            translated += Number(date.getMonth()) + 1;
        }

        if(date.getDate() < 10){
            translated += "0" + date.getDate();
        }else{
            translated += date.getDate();
        }


        translated += "T";
        translated += date.getHours();
        translated += date.getMinutes();
        translated += date.getSeconds();
        translated += "Z";
        return translated;
    }

    // Get the .ics file content
    phrase(){
        var content = "";
        content += "BEGIN:VCALENDAR\n";
        content += "VERSION:2.0\n";
        content += "PRODID:Cal_App//icsDotJS\n";
        content += "METHOD:PUBLISH\n";
        content += "BEGIN:VEVENT\n";
        content += "UID:" + this.uid + "\n";
        content += "LOCATION:"+ this.location +"\n";
        content += "SUMMARY:"+ this.title +"\n";
        content += "DESCRIPTION:"+ this.description +"\n";
        content += "CLASS:PUBLIC\n";
        content += "DTSTART:"+ this.start +"\n";
        content += "DTEND:"+ this.end +"\n";
        content += "DTSTAMP:"+ this.translateDate() +"\n";

        if(this.hasAlert){
            content += "BEGIN:VALARM\n";
            content += "X-WR-ALARMUID:ALARM-" + this.uid + "\n";
            content += "UID:" + this.uid + "\n";
            content += "TRIGGER:-PT"+ this.alertMinutes +"M\n";
            content += "DESCRIPTION:Reminder\n";
            content += "ACTION:DISPLAY\n";
            content += "END:VALARM\n";
        }

        content += "END:VEVENT\n";
        content += "END:VCALENDAR";

        return content;
    }


    // Enable / Disable the meeting alert
    enableReminder(hasAlert = true, minutes = 5){
        this.hasAlert = hasAlert;
        this.alertMinutes = minutes;
    }

    // Export the meeting as ics file
    export(filename = "event"){

        var content = this.phrase();

        const link = document.createElement("a");
        const file = new Blob([content], { type: 'text/plain' });
        link.href = URL.createObjectURL(file);
        link.download = filename + ".ics";
        link.click();
        URL.revokeObjectURL(link.href);
    }

    // Set the description of the meeting
    description(description = "Erstellt icsDotJS"){
        this.description = description;
    }

    // Set the location of the meeting
    location(location = "Digital meeting"){
        this.location = location;
    }

}