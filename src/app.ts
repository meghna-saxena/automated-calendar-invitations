const workingDayEvents = [
    ['Buddy Intro', '11:00:00', '11:20:00', 'Introduction to Team Members', 'false', '0'],
    ['TL Intro', '11:00:00', '11:20:00', 'Introduction to Team Members', 'false', '1'],
    ['TL Feedback', '11:00:00', '11:20:00', 'Introduction to Team Members', 'false', '15']
];

const calendarDayEvents = [
    ['Buddy Intro', '11:00:00', '11:20:00', 'Introduction to Team Members', 'false', '0'],
    ['TL Intro', '11:00:00', '11:20:00', 'Introduction to Team Members', 'false', '1']
];

const SCHEDULE_BY_WORKING_DAY: Event[] = workingDayEvents.map(e => getEventsFromSheetData(e[0], e[1], e[2], e[3], e[4], e[5]));
const SCHEDULE_ON_CALENDAR_DAY: Event[] = calendarDayEvents.map(e => getEventsFromSheetData(e[0], e[1], e[2], e[3], e[4], e[5]));

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

function _easter(year: number) {
    var k = Math.floor(year / 100)
    var m = 15 + Math.floor((3 * k + 3) / 4) - Math.floor((8 * k + 13) / 25)
    var s = 2 - Math.floor((3 * k + 3) / 4)
    var a = year % 19
    var d = (19 * a + m) % 30
    var r = Math.floor((d + a / 11) / 29)
    var og = 21 + d - r
    var sz = 7 - Math.floor(year + year / 4 + s) % 7
    var oe = 7 - (og - sz) % 7
    var os = og + oe

    var daysPerMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31];
    var day = os;
    var month;
    for (month = 3; month < 8; month++) {
        if (day <= daysPerMonth[month]) {
            break
        }
        day -= daysPerMonth[month]
    }
    month = month - 1;

    return new Date(year, month, day)
}

const ONE_DAY_IN_SECONDS = 24 * 60 * 60;

export const isFlexibleHoliday = (date: Date): boolean => {
    const year: number = date.getFullYear();
    const easterDate = _easter(year);

    const easterTimestamp: number = easterDate.getTime() / 1000;
    const dateTimestamp: number = date.getTime() / 1000;

    const goodFridayTimestamp = easterTimestamp - 2 * ONE_DAY_IN_SECONDS;
    const easterMondayTimestamp = easterTimestamp + ONE_DAY_IN_SECONDS;
    const ascensionDayTimestamp = easterTimestamp + 39 * ONE_DAY_IN_SECONDS;
    const whitMondayTimestamp = easterTimestamp + 50 * ONE_DAY_IN_SECONDS;

    const timestamps: any = [goodFridayTimestamp, easterMondayTimestamp, ascensionDayTimestamp, whitMondayTimestamp]

    return timestamps.includes(dateTimestamp);
};

export function isHoliday(date: Date): Boolean {
    return isWeekend(date) || isStaticHoliday(date) || isFlexibleHoliday(date);
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
export function createMeetingsByWorkingDay(startDate: Date, newEmployeeEmailId: string, TLEmailId: string, buddyEmailId: string) {
    for (var i = 0; i < SCHEDULE_BY_WORKING_DAY.length; i++) {
        const event = SCHEDULE_BY_WORKING_DAY[i];
        const targetDate = getNthWorkingDay(startDate, event.day);
        const guests = getGuestStringBy(event.isTLPresent, buddyEmailId, TLEmailId, newEmployeeEmailId);
        return createMeetingForEvent(targetDate, event, guests);
    }
}

// iterates and create meetings SCHEDULE_ON_CALENDAR_DAY
export function createMeetingsOnCalendarDay(startDate: Date, newEmployeeEmailId: string, TLEmailId: string, buddyEmailId: string) {
    for (var i = 0; i < SCHEDULE_ON_CALENDAR_DAY.length; i++) {
        const event = SCHEDULE_ON_CALENDAR_DAY[i];
        const targetDate = getNextWorkingDay(startDate, event.day);
        const guests = getGuestStringBy(event.isTLPresent, buddyEmailId, TLEmailId, newEmployeeEmailId);
        return createMeetingForEvent(targetDate, event, guests);
    }
}

export function createMeetingForEvent(date: Date, event: Event, guests: string) {
    const startDate = new Date(getDateString(date) + " " + event.start);
    const endDate = new Date(getDateString(date) + " " + event.end);

    return [event.title, startDate, endDate];
}