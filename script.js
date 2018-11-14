let monthCounter = 0;
let yearCounter = 0;
let date = new Date();
let months = ["January", "February", "March", "April", "May", "June", "July",
"August", "September", "October", "November", "December"];
let currentDayIDNum = 0;
let events = [];
let tagsOn = true;
//
// eventCounter is used for making IDs for events, there may be a better way to do this idk
//
//eventCounter = 0;
//
// fills calendar with days, month, and year
//
function fillCalendar() {
    console.log("inside the fill calendar");
    // for (let i = 0; i < events.length; i++) {
    //     console.log(events[i].title);
    // }
    let currentMonth = date.getMonth()+1;
    let dateComp = new Date(date.getFullYear()+yearCounter, currentMonth-1+monthCounter, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    let year = new Date(date.getFullYear()+yearCounter, currentMonth+monthCounter, 0).getFullYear();
    let month = new Date(date.getFullYear()+yearCounter, currentMonth+monthCounter, 0).getMonth();
    let numDaysInMonth = new Date(date.getFullYear()+yearCounter, currentMonth+monthCounter, 0).getDate();
    let monthStartingDay = new Date(date.getFullYear()+yearCounter, currentMonth+-1+monthCounter, 1).getDay();
    let numDaysLastMonth = new Date(date.getFullYear()+yearCounter, currentMonth+monthCounter-1, 0).getDate();
    let monthStartingDayCopy = monthStartingDay;
    let counter = 1;
    let counter2 = 0;
    let counter3 = 0;
    let counter4 = 1;
    //
    //prints month and year above calendar
    //
    $("#month").html(`${months[month]}`);
    $("#year").html(`${year}`);
    //
    //clears all day boxes on calendar
    //
    $(".day-box").html(" "); 
    // while loop fills in boxes for last month
    // first for-loop fills in first row for curreny month
    // second for-loop fills in the rest of the rows for current month
    // third for-loop fills in the rest of the rows for next month
    while (counter2 < monthStartingDay) {
        $(`#c${counter2}`).append(`<span class="faded">${numDaysLastMonth-monthStartingDayCopy+1}</span>`);
        counter2++;
        monthStartingDayCopy--;
    }
    for (let j = monthStartingDay; j < 7; j++) {
        $(`#c${j}`).append(`<span class="bold">${counter}</span>`);
        for (let i = 0 ; i < events.length; i++) {
            //
            // If the current date is equal to the date generated by fillCalender()
            // then highlight current day's box to lightgreen using currentDay class
            //
            if (currentMonth + monthCounter == parseInt(events[i].startMonth) && counter == parseInt(events[i].startDay)) {
                $(`#c${j}`).append(`<p class="event ${events[i].tag}">${events[i].startHour}:${events[i].startMinutes} ${events[i].title}</p>`);
            }
        }
        counter++;
    }
    for (let j = 7; counter <= numDaysInMonth; j++) {
        $(`#c${j}`).append(`<span class="bold">${counter}</span>`);
        if (date.getMonth() == dateComp.getMonth() && date.getDate() == dateComp.getDate() && date.getFullYear() == dateComp.getFullYear()) {
            currentDayIDNum = date.getDate()-monthStartingDay+1;
            $(`#c${currentDayIDNum}`).find("span").addClass("currentDay");
        } else {
            $(`#c${currentDayIDNum}`).find("span").removeClass("currentDay");
        }
        for (let i = 0 ; i < events.length; i++) {
            // console.log("Event index: " + i)
            if (currentMonth + monthCounter == parseInt(events[i].startMonth) && counter == parseInt(events[i].startDay)) {
                $(`#c${j}`).append(`<p class="event ${events[i].tag}">${events[i].startHour}:${events[i].startMinutes} ${events[i].title}</p>`);
            }
        }
        counter++;
        counter3 = j+1;
    }
    for (j = counter3; j < 42; j++) {
        $(`#c${j}`).append(`<span class="faded">${counter4}</span>`);
        counter3++;
        counter4++;
    }
    console.log("Outside fill calendar");
}



function addEvent() {
    let title = $("#event-title").val();
    let startDate = $("#event-start-date").val().split("/");
    let endDate = $("#event-end-date").val().split("/");
    let startTime = $("#event-start-time").val().split(":");
    let endTime = $("#event-end-time").val().split(":");
    let tag = $("select option:selected").val();
    let timeRegex = new RegExp(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);
    let dateRegex = new RegExp(/^\d{2}\/\d{2}\/\d{4}$/);
    //
    // If date and time formats are correct, add event, otherwise don't and alert user of error
    //
    if (timeRegex.test(`${startTime[0]}:${startTime[1]}`) 
    && timeRegex.test(`${endTime[0]}:${endTime[1]}`) 
    && dateRegex.test(`${startDate[0]}/${startDate[1]}/${startDate[2]}`) 
    && dateRegex.test(`${endDate[0]}/${endDate[1]}/${endDate[2]}`)) {
        let event = {
            // "id" : eventCounter,
            "title" : title,
            "startMonth" : startDate[0], 
            "startDay" : startDate[1],
            "startYear" : startDate[2],
            "endMonth" : endDate[0], 
            "endDay" : endDate[1],
            "endYear" : endDate[2],
            "startHour" : startTime[0], 
            "startMinutes" : startTime[1],
            "endHour" : endTime[0],
            "endMinutes" : endTime[1],
            "tag" : tag
        };
            addEventSQL(event);
            grabEventsSQL();
        // grabEventsSQL();
        // events.push(event);
        // eventCounter++;
        // fillCalendar();
    } else {
        alert("Incorrect date or time formatting.\nMM/DD/YYYY\nHH:MM");
    }
}



function fillEventForm() {
    $("#event-start-date").val(`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`);
    $("#event-end-date").val(`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`);
}



function fillRemoveForm() {
    console.log("inside remvoe")
    $("#remove-event-form").html("");
    for (let i = 0; i < events.length; i++) {
        console.log(i);
        $("#remove-event-form").append(
            `<div class="event-group">
            <p>${events[i].title}</p>
            <p>${events[i].startMonth}/${events[i].startDay}/${events[i].startYear} - ${events[i].endMonth}/${events[i].endDay}/${events[i].endYear}</p>
            <p>${events[i].startHour}:${events[i].startMinutes} - ${events[i].endHour}:${events[i].endMinutes}</p>
            <button id="${events[i].id}" class="remove-event-btn">Remove</button>
            </div>`);
    }
    console.log("outside remove");
}



function fillModifyForm() {
    $("#modify-event-form").html("");
    for (let i = 0; i < events.length; i++) {
        $("#modify-event-form").append(
            `<div class="event-group">
            <label>Title</label>
            <input class="mod" type="text" name="title" value="${events[i].title}">
            <label>Start date</label>
            <input class="mod" type="text" name="startDate" value="${events[i].startMonth}/${events[i].startDay}/${events[i].startYear}">
            <label>End date</label>
            <input class="mod" type="text" name="endDate" value="${events[i].endMonth}/${events[i].endDay}/${events[i].endYear}">
            <label>Start time</label>
            <input class="mod" type="text" name="startTime" value="${events[i].startHour}:${events[i].startMinutes}">
            <label>End time</label>
            <input class="mod" type="text" name="endTime" value="${events[i].endHour}:${events[i].endMinutes}">
            <button id="${events[i].id}" class="modify-event-btn">Modify</button>
            </div>`);
    }
}



function signUp() {
    const uname = $("#sign-up-user").val();
    const pword = $("#sign-up-pass").val();
    const data = {"username": uname, "password": pword};
    fetch("register.php", {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(function(response) { alert("Account created successfully. Please sign in"); console.log('Success:', JSON.stringify(response))})
    .catch(error => console.error('Error:',error))
}



function signIn() {
    const uname = $("#sign-in-user").val();
    const pword = $("#sign-in-pass").val();
    const data = {"username": uname, "password": pword};
    fetch("sign-in.php", {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(function(response) { 
        if (response.success) {
            $("#account-container").hide();
            $("#option-container").show();
            $("#top-header").html(response.username);
            grabEventsSQL();
        } else {
            alert(response.message);
        }
    })
    .catch(error => console.error('Error:',error))
}



function signOut() {
    fetch("logout.php", {
        method: 'POST',
    })
    .then(res => res.json())
    .then(function(response) { 
        if (response.success) {
            $("#account-container").show();
            $("#option-container").hide();
            $("#add-event-container").hide();
            $("#modify-event-container").hide();
            $("#remove-event-container").hide();
            $("#top-header").html("Calendar");
            events = [];
            fillCalendar();
        } else {
            alert("Logout error. Please try again.");
        }
    })
    .catch(error => console.error('Error:',error))
}



function addEventSQL(event) {
    console.log("Start add");
    fetch("add-event.php", {
        method: 'Post',
        body: JSON.stringify(event)
    })
    .then(res => res.json())
    .then(function(response){
        //console.log(response);
    })
    .catch(error => console.error('Error:', error))
    console.log("End add");
}

function grabEventsSQL() {
    console.log("Start grab");
    fetch("grab-events.php", {
        method: 'POST',
    })
    .then(res => res.json())
    // .then(response => console.log(response))
    .then(function(response){
        console.log(response);
        events = response;
        return true;
        // for (let i = 0; i < events.length; i++) {
        //     console.log("Event array: " + events[i].title);
        // }
    })
    .then(function(){
        fillCalendar();
    })
    .then(function(){
        fillRemoveForm();
    })
    .then(function(){
        fillModifyForm();
    })
    .catch(error => console.error('Error:', error))
    console.log("End grab");
}

function shareEvent() {
    let data = {"share_username": $("#share-name").val(), "username": $("#sign-in-user").val()};
    console.log(data);
    fetch("share-event.php", {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
}

function fillShareForm() {
    console.log("inside share")
    $("#share-event-form").html("");
    for (let i = 0; i < events.length; i++) {
        console.log(i);
        $("#share-event-form").append(
            `<div class="event-group">
            <p>${events[i].title}</p>
            <p>${events[i].startMonth}/${events[i].startDay}/${events[i].startYear} - ${events[i].endMonth}/${events[i].endDay}/${events[i].endYear}</p>
            <p>${events[i].startHour}:${events[i].startMinutes} - ${events[i].endHour}:${events[i].endMinutes}</p>
            <input class="sharee" type="text" name="username" placeholder="Who do you share to" />
            <button id="${events[i].id}" class="share-event-btn">Share</button>
            </div>`);
    }
    console.log("outside share");
}

$(function() {
    $("#filter-submit-btn").on("click", function() {
        let school = document.getElementById('check-school').checked;
        let work = document.getElementById('check-work').checked;
        console.log(work);
        let party = document.getElementById('check-party').checked;
        $('.school').hide();
        $('.work').hide();
        $('.party').hide();
        if (school) {
            $(".school").show();
        }
        if (work) {
            $(".work").show();
        }
        if (party) {
            $(".party").show();
        }
    })
    $("#filter-btn").on("click", function() {
        $("#option-container").hide();
        $("#filter-container").show();
    })
    $("#share-event-form").on("click", ".share-event-btn", function() {
        for (let i = 0; i < events.length; i++) {
            if (events[i].id == parseInt($(this).attr("id")) ) {
                console.log(events[i].id);
                fetch('share-event.php', {
                    method: 'POST',
                    body: JSON.stringify({"id": events[i].id, "share_username": $(".sharee").val()})
                })
                .then(res => res.json())
                .then(response => console.log(response))
                .then(grabEventsSQL)
                .catch(error => console.error('Error:', error))
            }
        }
    })
    $("#share-btn").on("click", function() {
        fillShareForm();
    })
    $("#share-btn").on("click", function(){
        $("#option-container").hide();
        $("#share-container").show();
    })
    $("#toggle-tag-btn").on("click", function() {
        if (tagsOn){
            $(".event").addClass("off");
            tagsOn = !tagsOn;
        } else {
            $(".event").removeClass("off");
            tagsOn = !tagsOn;
        }
    })
    $("#sign-out-btn").on("click", function(){
        signOut();
    })
    $("#sign-in-submit").on("click", function() {
        signIn();
    })
    $("#sign-up-submit").on("click", function() {
        signUp();
    })
    $("#modify-event-form").on("click", ".modify-event-btn", function() {
        for (let i = 0; i < events.length; i++) {
            if (events[i].id == parseInt($(this).attr("id")) ) {
                let title = $("input[name=title]").val();
                let startDate = $("input[name=startDate]").val().split("/");
                let endDate = $("input[name=endDate]").val().split("/");
                let startTime = $("input[name=startTime]").val().split(":");
                let endTime = $("input[name=endTime]").val().split(":");
                let timeRegex = new RegExp(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);
                let dateRegex = new RegExp(/^\d{2}\/\d{2}\/\d{4}$/);
                if (timeRegex.test(`${startTime[0]}:${startTime[1]}`) 
                && timeRegex.test(`${endTime[0]}:${endTime[1]}`) 
                && dateRegex.test(`${startDate[0]}/${startDate[1]}/${startDate[2]}`) 
                && dateRegex.test(`${endDate[0]}/${endDate[1]}/${endDate[2]}`)) {
                let event = {
                    "id" : events[i].id,
                    "title" : title,
                    "startMonth" : startDate[0], 
                    "startDay" : startDate[1],
                    "startYear" : startDate[2],
                    "endMonth" : endDate[0], 
                    "endDay" : endDate[1],
                    "endYear" : endDate[2],
                    "startHour" : startTime[0], 
                    "startMinutes" : startTime[1],
                    "endHour" : endTime[0],
                    "endMinutes" : endTime[1]
                };
                fetch("modify-events.php", {
                    method: 'POST',
                    body: JSON.stringify(event)
                })
                .then(res => res.json())
                // .then(response => console.log(response))
                .then(function(response){
                    console.log(response);
                    grabEventsSQL();
                })
                .catch(error => console.error('Error:', error))
                } else {
                    alert("Incorrect date or time formatting.\nMM/DD/YYYY\nHH:MM");
                }
            }
        }
    })
    $("#modify-event-btn").on("click", () => {
        $("#option-container").hide();
        $("#modify-event-container").show();
        fillModifyForm();
    })
    $("#remove-event-form").on("click", ".remove-event-btn", function() {
        for (let i = 0; i < events.length; i++) {
            if (events[i].id == parseInt($(this).attr("id")) ) {
                console.log(events[i].id);
                fetch('remove-event.php', {
                    method: 'POST',
                    body: JSON.stringify({"event-id": events[i].id})
                })
                .then(res => res.json())
                .then(response => console.log(response))
                .then(grabEventsSQL)
                .catch(error => console.error('Error:', error))
            }
        }
    })
    $("#remove-event-btn").on("click", () => {
        $("#option-container").hide();
        $("#remove-event-container").show();
        fillRemoveForm();
    })
    $(".hide-event-btn").on("click", () => {
        $("#add-event-container").hide();
        $("#remove-event-container").hide();
        $("#modify-event-container").hide();
        $("#share-container").hide();
        $("#filter-container").hide();
        $("#option-container").show();
    })
    $("#add-event-btn").on("click", () => {
        $("#option-container").hide();
        $("#add-event-container").show();
        fillEventForm();
    })
    $("#add-event-btn2").on("click", ()=> {
        addEvent();
    })
    $("#next-button").on("click", () =>{
        monthCounter++;
        fillCalendar();
    })
    $("#prev-button").on("click", () =>{
        monthCounter--;
        fillCalendar();
    })
    $("#inc-year-button").on('click', function() {
        yearCounter++;
        fillCalendar();
    })
    $("#dec-year-button").on('click', function() {
        yearCounter--;
        fillCalendar();
    })
    fillCalendar();
})