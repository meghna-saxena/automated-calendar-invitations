"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var workingDayEvents = [
    ['Buddy Intro', '11:00:00', '11:20:00', 'Introduction to Team Members', 'false', '0'],
    ['TL Intro', '11:00:00', '11:20:00', 'Introduction to Team Members', 'false', '1'],
    ['TL Feedback', '11:00:00', '11:20:00', 'Introduction to Team Members', 'false', '15']
];
var calendarDayEvents = [
    ['Buddy Intro', '11:00:00', '11:20:00', 'Introduction to Team Members', 'false', '0'],
    ['TL Intro', '11:00:00', '11:20:00', 'Introduction to Team Members', 'false', '1']
];
var SCHEDULE_BY_WORKING_DAY = workingDayEvents.map(function (e) { return getEventsFromSheetData(e[0], e[1], e[2], e[3], e[4], e[5]); });
var SCHEDULE_ON_CALENDAR_DAY = calendarDayEvents.map(function (e) { return getEventsFromSheetData(e[0], e[1], e[2], e[3], e[4], e[5]); });
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
function _easter(year) {
    var k = Math.floor(year / 100);
    var m = 15 + Math.floor((3 * k + 3) / 4) - Math.floor((8 * k + 13) / 25);
    var s = 2 - Math.floor((3 * k + 3) / 4);
    var a = year % 19;
    var d = (19 * a + m) % 30;
    var r = Math.floor((d + a / 11) / 29);
    var og = 21 + d - r;
    var sz = 7 - Math.floor(year + year / 4 + s) % 7;
    var oe = 7 - (og - sz) % 7;
    var os = og + oe;
    var daysPerMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31];
    var day = os;
    var month;
    for (month = 3; month < 8; month++) {
        if (day <= daysPerMonth[month]) {
            break;
        }
        day -= daysPerMonth[month];
    }
    month = month - 1;
    return new Date(year, month, day);
}
var ONE_DAY_IN_SECONDS = 24 * 60 * 60;
exports.isFlexibleHoliday = function (date) {
    var year = date.getFullYear();
    var easterDate = _easter(year);
    var easterTimestamp = easterDate.getTime() / 1000;
    var dateTimestamp = date.getTime() / 1000;
    var goodFridayTimestamp = easterTimestamp - 2 * ONE_DAY_IN_SECONDS;
    var easterMondayTimestamp = easterTimestamp + ONE_DAY_IN_SECONDS;
    var ascensionDayTimestamp = easterTimestamp + 39 * ONE_DAY_IN_SECONDS;
    var whitMondayTimestamp = easterTimestamp + 50 * ONE_DAY_IN_SECONDS;
    var timestamps = [goodFridayTimestamp, easterMondayTimestamp, ascensionDayTimestamp, whitMondayTimestamp];
    return timestamps.includes(dateTimestamp);
};
function isHoliday(date) {
    return isWeekend(date) || isStaticHoliday(date) || exports.isFlexibleHoliday(date);
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
        return createMeetingForEvent(targetDate, event_1, guests);
    }
}
exports.createMeetingsByWorkingDay = createMeetingsByWorkingDay;
// iterates and create meetings SCHEDULE_ON_CALENDAR_DAY
function createMeetingsOnCalendarDay(startDate, newEmployeeEmailId, TLEmailId, buddyEmailId) {
    for (var i = 0; i < SCHEDULE_ON_CALENDAR_DAY.length; i++) {
        var event_2 = SCHEDULE_ON_CALENDAR_DAY[i];
        var targetDate = getNextWorkingDay(startDate, event_2.day);
        var guests = getGuestStringBy(event_2.isTLPresent, buddyEmailId, TLEmailId, newEmployeeEmailId);
        return createMeetingForEvent(targetDate, event_2, guests);
    }
}
exports.createMeetingsOnCalendarDay = createMeetingsOnCalendarDay;
function createMeetingForEvent(date, event, guests) {
    var startDate = new Date(getDateString(date) + " " + event.start);
    var endDate = new Date(getDateString(date) + " " + event.end);
    return [event.title, startDate, endDate];
}
exports.createMeetingForEvent = createMeetingForEvent;
