"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var workingDayEvents = [
    ['Buddy Intro', '11:00:00', '11:20:00', 'Introduction to Team Members', 'false', '0'],
    ['TL Intro', '11:00:00', '11:20:00', 'Introduction to Team Members', 'false', '1']
];
var calendarDayEvents = [
    ['Buddy Intro', '11:00:00', '11:20:00', 'Introduction to Team Members', 'false', '0'],
    ['TL Intro', '11:00:00', '11:20:00', 'Introduction to Team Members', 'false', '1']
];
var SCHEDULE_BY_WORKING_DAY = [];
for (var i = 0; i < workingDayEvents.length; i++) {
    var data = workingDayEvents[i];
    SCHEDULE_BY_WORKING_DAY.push(getEventsFromSheetData(data[0], data[1], data[2], data[3], data[4], data[5]));
}
var SCHEDULE_ON_CALENDAR_DAY = [];
for (var i = 0; i < calendarDayEvents.length; i++) {
    var data = calendarDayEvents[i];
    SCHEDULE_ON_CALENDAR_DAY.push(getEventsFromSheetData(data[0], data[1], data[2], data[3], data[4], data[5]));
}
function getEventsFromSheetData(title, start, end, description, isTLPresentString, dayString) {
    var isTLPresent = JSON.parse(isTLPresentString);
    var day = JSON.parse(dayString);
    var event = {
        title: title,
        start: start,
        end: end,
        description: description,
        isTLPresent: isTLPresent,
        day: day
    };
    return event;
}
exports.getEventsFromSheetData = getEventsFromSheetData;
console.log('SCHEDULE_BY_WORKING_DAY', SCHEDULE_BY_WORKING_DAY);
console.log('SCHEDULE_ON_CALENDAR_DAY', SCHEDULE_ON_CALENDAR_DAY);
function runOnSubmit() {
    var date = new Date('April 01, 1993');
    var newEmployeeEmailId = 'meghna.srivastava+newEmployeeEmailId@auto1.com';
    var TLEmailId = 'meghna.srivastava+TLEmailId@auto1.com';
    var buddyEmailId = 'meghna.srivastava+buddyEmailId@auto1.com';
    createMeetings(date, newEmployeeEmailId, TLEmailId, buddyEmailId);
}
exports.runOnSubmit = runOnSubmit;
var MILLISECONDS_IN_ONE_DAY = 24 * 60 * 60 * 1000;
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
function isWeekend(date) {
    return (date.getDay() == 0 || date.getDay() == 6);
}
exports.isWeekend = isWeekend;
function isHoliday(date) {
    return isWeekend(date) || isStaticHoliday(date);
}
exports.isHoliday = isHoliday;
;
function getNextWorkingDay(date, day) {
    if (day === void 0) { day = 1; }
    var nextWorkingDate = new Date(date.getTime() + MILLISECONDS_IN_ONE_DAY * day);
    if (isHoliday(nextWorkingDate)) {
        return getNextWorkingDay(nextWorkingDate);
    }
    else {
        return nextWorkingDate;
    }
}
exports.getNextWorkingDay = getNextWorkingDay;
;
function getNthWorkingDay(date, n) {
    if (n == 1) {
        return date;
    }
    else {
        var nextDay = getNextWorkingDay(date);
        return getNthWorkingDay(nextDay, n - 1);
    }
}
exports.getNthWorkingDay = getNthWorkingDay;
function getDateString(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    return monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}
exports.getDateString = getDateString;
function getGuestStringBy(isTLPresent, buddyEmailId, TLEmailId, newEmployeeEmailId) {
    return isTLPresent ? newEmployeeEmailId + ', ' + TLEmailId : newEmployeeEmailId + ', ' + buddyEmailId;
}
exports.getGuestStringBy = getGuestStringBy;
// Takes a startingDate, guest and schedule
function createMeetings(startDate, newEmployeeEmailId, TLEmailId, buddyEmailId) {
    createMeetingsByWorkingDay(startDate, newEmployeeEmailId, TLEmailId, buddyEmailId);
    createMeetingsOnCalendarDay(startDate, newEmployeeEmailId, TLEmailId, buddyEmailId);
}
// iterates and create meetings SCHEDULE_BY_WORKING_DAY
function createMeetingsByWorkingDay(startDate, newEmployeeEmailId, TLEmailId, buddyEmailId) {
    for (var i = 0; i < SCHEDULE_BY_WORKING_DAY.length; i++) {
        var event_1 = SCHEDULE_BY_WORKING_DAY[i];
        var targetDate = getNthWorkingDay(startDate, event_1.day);
        var guests = getGuestStringBy(event_1.isTLPresent, buddyEmailId, TLEmailId, newEmployeeEmailId);
        createMeetingForEvent(targetDate, event_1, guests);
    }
}
// iterates and create meetings SCHEDULE_ON_CALENDAR_DAY
function createMeetingsOnCalendarDay(startDate, newEmployeeEmailId, TLEmailId, buddyEmailId) {
    for (var i = 0; i < SCHEDULE_ON_CALENDAR_DAY.length; i++) {
        var event_2 = SCHEDULE_ON_CALENDAR_DAY[i];
        var targetDate = getNextWorkingDay(startDate, event_2.day);
        var guests = getGuestStringBy(event_2.isTLPresent, buddyEmailId, TLEmailId, newEmployeeEmailId);
        createMeetingForEvent(targetDate, event_2, guests);
    }
}
function createMeetingForEvent(date, event, guests) {
    var startDate = new Date(getDateString(date) + " " + event.start);
    var endDate = new Date(getDateString(date) + " " + event.end);
    // CalendarApp.getDefaultCalendar().createEvent(
    //     event.title, startDate, endDate,
    //     { guests: guests, sendInvites: true }).setDescription(event.description);
}
exports.createMeetingForEvent = createMeetingForEvent;
