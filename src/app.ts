const workingDayEvents = [
    ['Buddy Intro', '11:00:00', '11:20:00', 'Introduction to Team Members', 'false', '0'],
    ['TL Intro', '11:00:00', '11:20:00', 'Introduction to Team Members', 'false', '1']
];

const calendarDayEvents = [
    ['Buddy Intro', '11:00:00', '11:20:00', 'Introduction to Team Members', 'false', '0'],
    ['TL Intro', '11:00:00', '11:20:00', 'Introduction to Team Members', 'false', '1']
];

let SCHEDULE_BY_WORKING_DAY: Event[] = [];
for (let i = 0; i < workingDayEvents.length; i++) {
    var data = workingDayEvents[i];
    SCHEDULE_BY_WORKING_DAY.push(getEventsFromSheetData(data[0], data[1], data[2], data[3], data[4], data[5]));
}

let SCHEDULE_ON_CALENDAR_DAY: Event[] = [];
for (let i = 0; i < calendarDayEvents.length; i++) {
    var data = calendarDayEvents[i];
    SCHEDULE_ON_CALENDAR_DAY.push(getEventsFromSheetData(data[0], data[1], data[2], data[3], data[4], data[5]));
}

export function getEventsFromSheetData(title: string, start: string, end: string, description: string, isTLPresentString: string, dayString: string) {
    const isTLPresent = JSON.parse(isTLPresentString);
    const day = JSON.parse(dayString);

    const event: Event = {
        title: title,
        start: start,
        end: end,
        description: description,
        isTLPresent: isTLPresent,
        day: day
    }
    return event;
}

console.log('SCHEDULE_BY_WORKING_DAY', SCHEDULE_BY_WORKING_DAY)
console.log('SCHEDULE_ON_CALENDAR_DAY', SCHEDULE_ON_CALENDAR_DAY)

export function runOnSubmit() {
    var date = new Date('April 01, 1993');
    var newEmployeeEmailId = 'meghna.srivastava+newEmployeeEmailId@auto1.com';
    var TLEmailId = 'meghna.srivastava+TLEmailId@auto1.com';
    var buddyEmailId = 'meghna.srivastava+buddyEmailId@auto1.com';

    createMeetings(date, newEmployeeEmailId, TLEmailId, buddyEmailId);
}

export interface Event {
    title: string,
    start: string,
    end: string,
    description?: string,
    isTLPresent: boolean,
    day: number
}

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

export function isStaticHoliday(date: Date): Boolean {
    for (var i = 0; i < STATIC_NATIONAL_HOLIDAYS.length; i++) {
        if (STATIC_NATIONAL_HOLIDAYS[i].day === date.getDate()
            && STATIC_NATIONAL_HOLIDAYS[i].month === date.getMonth() + 1) { // Months start with index 0
            return true;
        }
    }
    return false;
}

export function isWeekend(date: Date): Boolean {
    return (date.getDay() == 0 || date.getDay() == 6);
}

export function isHoliday(date: Date): Boolean {
    return isWeekend(date) || isStaticHoliday(date);
};

export function getNextWorkingDay(date: Date, day: number = 1): Date { //should return next working day, eg Fri Jan 18 2019 10:48:06 GMT+0100 ()
    const nextWorkingDate = new Date(date.getTime() + MILLISECONDS_IN_ONE_DAY * day);

    if (isHoliday(nextWorkingDate)) {
        return getNextWorkingDay(nextWorkingDate);
    } else {
        return nextWorkingDate;
    }
};

export function getNthWorkingDay(date: Date, n: number): Date {
    if (n == 1) {
        return date;
    } else {
        const nextDay = getNextWorkingDay(date);
        return getNthWorkingDay(nextDay, n - 1);
    }
}

export function getDateString(date: Date) { // should return in the format 'Jan 17, 2019'; 
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    return monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}

export function getGuestStringBy(isTLPresent: Boolean, buddyEmailId: string, TLEmailId: string, newEmployeeEmailId: string): string {
    return isTLPresent ? newEmployeeEmailId + ', ' + TLEmailId : newEmployeeEmailId + ', ' + buddyEmailId;
}

// Takes a startingDate, guest and schedule
function createMeetings(startDate: Date, newEmployeeEmailId: string, TLEmailId: string, buddyEmailId: string) {
    createMeetingsByWorkingDay(startDate, newEmployeeEmailId, TLEmailId, buddyEmailId);
    createMeetingsOnCalendarDay(startDate, newEmployeeEmailId, TLEmailId, buddyEmailId);
}

// iterates and create meetings SCHEDULE_BY_WORKING_DAY
function createMeetingsByWorkingDay(startDate: Date, newEmployeeEmailId: string, TLEmailId: string, buddyEmailId: string) {
    for (var i = 0; i < SCHEDULE_BY_WORKING_DAY.length; i++) {
        const event = SCHEDULE_BY_WORKING_DAY[i];
        const targetDate = getNthWorkingDay(startDate, event.day);
        const guests = getGuestStringBy(event.isTLPresent, buddyEmailId, TLEmailId, newEmployeeEmailId);
        createMeetingForEvent(targetDate, event, guests);
    }
}

// iterates and create meetings SCHEDULE_ON_CALENDAR_DAY
function createMeetingsOnCalendarDay(startDate: Date, newEmployeeEmailId: string, TLEmailId: string, buddyEmailId: string) {
    for (var i = 0; i < SCHEDULE_ON_CALENDAR_DAY.length; i++) {
        const event = SCHEDULE_ON_CALENDAR_DAY[i];
        const targetDate = getNextWorkingDay(startDate, event.day);
        const guests = getGuestStringBy(event.isTLPresent, buddyEmailId, TLEmailId, newEmployeeEmailId);
        createMeetingForEvent(targetDate, event, guests);
    }
}

export function createMeetingForEvent(date: Date, event: Event, guests: string) {
    const startDate = new Date(getDateString(date) + " " + event.start);
    const endDate = new Date(getDateString(date) + " " + event.end);

    // CalendarApp.getDefaultCalendar().createEvent(
    //     event.title, startDate, endDate,
    //     { guests: guests, sendInvites: true }).setDescription(event.description);
}