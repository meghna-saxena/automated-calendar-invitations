"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function runOnSubmit() {
    var timestamp = Date.now();
    var newEmployeeEmailId = 'meghna.srivastava@auto1.com';
    var TLEmailId = 'meghna.s1906@gmail.com';
    var buddyEmailId = 'test';
    createMeetings(timestamp, newEmployeeEmailId, TLEmailId, buddyEmailId);
}
exports.runOnSubmit = runOnSubmit;
/* --------------------------------------------------------- */
/* CONSTANTS */
/* --------------------------------------------------------- */
var DAY_ONE_EVENTS = [
    {
        title: 'Buddy Intro',
        start: '11:00:00 UTC',
        end: '11:20:00 UTC',
        description: 'Introduction to Team Members and their roles; Check access (Laptop, Email, Slack); explain the Engineering organisation (Groups and Teams)',
        isTLPresent: false,
        daysAfter: 0
    },
    {
        title: 'Team Lead Intro',
        start: '14:00:00 UTC',
        end: '14:20:00 UTC',
        description: 'Introduction to Team Members and their roles; Check access (Laptop, Email, Slack); explain the Engineering organisation (Groups and Teams)',
        isTLPresent: true,
        daysAfter: 0
    },
    {
        title: 'Buddy Recap',
        start: '17:00:00 UTC',
        end: '17:15:00 UTC',
        description: 'Everything fine for day 1?',
        isTLPresent: false,
        daysAfter: 0
    }
];
var DAY_TWO_EVENTS = [
    { title: 'Buddy Knowledge Sharing', start: '10:00:00 UTC', end: '10:30:00 UTC', description: 'Knowledge Sharing Services/Applications Overview', daysAfter: 1 },
    { title: 'Buddy Pairing Work', start: '15:00:00 UTC', end: '17:30:00 UTC', description: 'Get hands on by working on the Buddy\'s task together with him', daysAfter: 1 }
];
var DAY_THREE_EVENTS = [
    { title: 'Team Lead Knowledge Sharing', start: '10:00:00 UTC', end: '11:00:00 UTC', description: 'Business scenarios and Services/Applications', daysAfter: 2 },
    { title: 'Buddy Pairing Work', start: '14:00:00 UTC', end: '14:20:00 UTC', description: 'Introduction to first own task', daysAfter: 2 }
];
var DAY_FOUR_EVENTS = [
    { title: 'Buddy Status Check', start: '10:10:00 UTC', end: '10:30:00 UTC', daysAfter: 3 }
];
var DAY_FIVE_EVENTS = [
    { title: 'Buddy Knowledge Sharing', start: '10:10:00 UTC', end: '10:30:00 UTC', description: 'Common libraries and testing', daysAfter: 4 },
    { title: 'Team Lead Recap', start: '17:00:00 UTC', end: '17:20:00 UTC', description: 'Feedback on first week', daysAfter: 4 }
];
var DAY_SIX_EVENTS = [
    { title: 'Buddy Knowledge Sharing', start: '10:10:00 UTC', end: '10:30:00 UTC', description: 'Monitoring and Operations of Services/Applications', daysAfter: 5 }
];
var DAY_SEVEN_EVENTS = [
    { title: 'Buddy Knowledge Sharing', start: '10:10:00 UTC', end: '10:30:00 UTC', description: 'Deployments, Maintenance and troubleshooting Services/Applications', daysAfter: 6 }
];
var DAY_EIGHT_EVENTS = [
    { title: 'Buddy Knowledge Sharing', start: '10:10:00 UTC', end: '10:30:00 UTC', description: 'Writing and maintaining Acceptance and End-to-end Tests', daysAfter: 7 }
];
var DAY_TEN_EVENTS = [
    { title: 'Buddy Recap', start: '17:00:00 UTC', end: '17:30:00 UTC', daysAfter: 9 }
];
var DAY_FIFTEEN_EVENTS = [
    { title: 'Team Lead Recap', start: '17:00:00 UTC', end: '17:30:00 UTC', description: 'How was onboarding?', daysAfter: 14 }
];
var ONE_MONTH_EVENTS = [
    { title: 'Director Recap', start: '17:00:00 UTC', end: '17:30:00 UTC', description: 'Feedback', isTLPresent: true, daysAfter: 30 },
];
var THREE_MONTHS_EVENTS = [
    { title: 'Quarterly Feedback', start: '17:00:00 UTC', end: '17:30:00 UTC', description: 'Feedback', daysAfter: 90 }
];
var SIX_MONTHS_EVENTS = [
    { title: 'Probation Feedback', start: '17:00:00 UTC', end: '17:30:00 UTC', description: 'Feedback', daysAfter: 180 }
];
var schedule = [DAY_ONE_EVENTS, DAY_TWO_EVENTS, DAY_THREE_EVENTS, DAY_FOUR_EVENTS, DAY_FIVE_EVENTS, DAY_SIX_EVENTS, DAY_SEVEN_EVENTS, DAY_EIGHT_EVENTS, DAY_TEN_EVENTS, DAY_FIFTEEN_EVENTS, ONE_MONTH_EVENTS, THREE_MONTHS_EVENTS, SIX_MONTHS_EVENTS];
var MILLISECONDS_IN_ONE_DAY = 24 * 60 * 60 * 1000;
/* -------------------------------------------------------- */
// CHECK IF STATIC HOLIDAY
/* -------------------------------------------------------- */
var STATIC_NATIONAL_HOLIDAYS = [
    // New Year’s Day
    { day: 1, month: 1 },
    // Labour Day
    { day: 1, month: 5 },
    // Day of German Unity
    { day: 3, month: 10 },
    // Christmas Day
    { day: 25, month: 12 },
    // 2nd Day of Christmas
    { day: 26, month: 12 }
];
function isStaticHoliday(date) {
    for (var i = 0; i < STATIC_NATIONAL_HOLIDAYS.length; i++) {
        if (STATIC_NATIONAL_HOLIDAYS[i].day === date.getDate()
            && STATIC_NATIONAL_HOLIDAYS[i].month === date.getMonth() + 1) { // Months start with index 0
            return true;
        }
    }
    return false;
}
exports.isStaticHoliday = isStaticHoliday;
/* --------------------------------------------------------------- */
// CHECK IF WEEKEND
/* --------------------------------------------------------------- */
function isWeekend(date) {
    return (date.getDay() == 0 || date.getDay() == 6); // Sunday - Saturday : 0 - 6;
}
exports.isWeekend = isWeekend;
/* ------------------------------------------------------------ */
// CHECK IF HOLIDAY
/* ------------------------------------------------------------ */
function isHoliday(date) {
    var isHoliday = isWeekend(date) || isStaticHoliday(date);
    return isHoliday;
}
exports.isHoliday = isHoliday;
;
/* ------------------------------------------------------------- */
// GET NEXT WORKING DAYS
/* ------------------------------------------------------------- */
function getNextWorkingDay(timestamp) {
    if (isHoliday(new Date(timestamp))) {
        var nextWorkingDay = timestamp + MILLISECONDS_IN_ONE_DAY;
        return getNextWorkingDay(nextWorkingDay);
    }
    else {
        return new Date(timestamp);
    }
}
;
/* ------------------------------------------------------------- */
// GET DATE STRING
/* ------------------------------------------------------------- */
function getDateString(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    return monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}
/* ------------------------------------------------------------- */
// CREATE MEETINGS  
/* ------------------------------------------------------------- */
function createMeetings(startingTimestamp, newEmployeeEmailId, TLEmailId, buddyEmailId) {
    var date = new Date(startingTimestamp); //Thu Jan 21 2019 12:15:08 GMT+0100 (Central European Standard Time)
    var oneMonth = startingTimestamp + MILLISECONDS_IN_ONE_DAY * 30;
    var threeMonths = startingTimestamp + MILLISECONDS_IN_ONE_DAY * 90;
    var sixMonths = startingTimestamp + MILLISECONDS_IN_ONE_DAY * 180;
    var oneMonthString = getNextWorkingDay(oneMonth);
    var threeMonthString = getNextWorkingDay(threeMonths);
    var sixMonthString = getNextWorkingDay(sixMonths);
    for (var i = 0; i < schedule.length; i++) {
        var newDate = new Date(date.getTime());
        createMeetingsPerDay(schedule[i], getDateString(date), newEmployeeEmailId, TLEmailId, buddyEmailId, getDateString(oneMonthString), getDateString(threeMonthString), getDateString(sixMonthString));
        date = getNextWorkingDay(newDate.getTime() + MILLISECONDS_IN_ONE_DAY); //Jan 22 
    }
}
function createMeetingsPerDay(daySchedule, dateString, newEmployeeEmailId, TLEmailId, buddyEmailId, oneMonthString, threeMonthString, sixMonthString) {
    var TL = newEmployeeEmailId + "," + TLEmailId;
    var buddy = newEmployeeEmailId + "," + buddyEmailId;
    for (var i = 0; i < daySchedule.length; i++) {
        var meeting = daySchedule[i];
        var startDate = new Date(dateString + " " + meeting.start);
        var endDate = new Date(dateString + " " + meeting.end);
        if (meeting.daysAfter == 30) {
            startDate = new Date(oneMonthString + " " + meeting.start);
            endDate = new Date(oneMonthString + " " + meeting.end);
        }
        else if (meeting.daysAfter == 90) {
            startDate = new Date(threeMonthString + " " + meeting.start);
            endDate = new Date(threeMonthString + " " + meeting.end);
        }
        else if (meeting.daysAfter == 180) {
            startDate = new Date(sixMonthString + " " + meeting.start);
            endDate = new Date(sixMonthString + " " + meeting.end);
        }
        var guests = meeting.isTLPresent ? TL : buddy;
        // CalendarApp.getDefaultCalendar().createEvent(
        //     meeting.title, startDate, endDate,
        //     { guests: guests, sendInvites: true }).setDescription(meeting.description);
        console.log(meeting.title, startDate, endDate);
    }
}
