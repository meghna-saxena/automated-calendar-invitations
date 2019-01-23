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

const SCHEDULE_BY_WORKING_DAY: Event[] = [
    { title: 'Buddy Intro', start: '11:00:00 ', end: '11:20:00 ', description: 'Introduction to Team Members and their roles; Check access (Laptop, Email, Slack); explain the Engineering organisation (Groups and Teams)', isTLPresent: false, day: 1 },
    { title: 'Team Lead Intro', start: '14:00:00 ', end: '14:20:00 ', description: 'Introduction to Team Members and their roles; Check access (Laptop, Email, Slack); explain the Engineering organisation (Groups and Teams)', isTLPresent: true, day: 1 },
    { title: 'Buddy Recap', start: '17:00:00 ', end: '17:15:00 ', description: 'Everything fine for day 1?', isTLPresent: false, day: 1 },
    // Day2
    { title: 'Buddy Knowledge Sharing', start: '10:00:00 ', end: '10:30:00 ', description: 'Knowledge Sharing Services/Applications Overview', isTLPresent: false, day: 2 },
    { title: 'Buddy Pairing Work', start: '15:00:00 ', end: '17:30:00 ', description: 'Get hands on by working on the Buddy\'s task together with him', isTLPresent: false, day: 2 },
    // Day3
    { title: 'Team Lead Knowledge Sharing', start: '10:00:00 ', end: '11:00:00 ', description: 'Business scenarios and Services/Applications', isTLPresent: true, day: 3 },
    { title: 'Buddy Pairing Work', start: '14:00:00 ', end: '14:20:00 ', description: 'Introduction to first own task', isTLPresent: false, day: 3 },
    // Day4
    { title: 'Buddy Status Check', start: '10:10:00 ', end: '10:30:00 ', isTLPresent: false, day: 4 },
    // Day5
    { title: 'Buddy Knowledge Sharing', start: '10:10:00 ', end: '10:30:00 ', description: 'Common libraries and testing', isTLPresent: false, day: 5 },
    { title: 'Team Lead Recap', start: '17:00:00 ', end: '17:20:00 ', description: 'Feedback on first week', isTLPresent: true, day: 5 },
    // Day6
    { title: 'Buddy Knowledge Sharing', start: '10:10:00 ', end: '10:30:00 ', description: 'Monitoring and Operations of Services/Applications', isTLPresent: false, day: 6 },
    // Day7
    { title: 'Buddy Knowledge Sharing', start: '10:10:00 ', end: '10:30:00 ', description: 'Deployments, Maintenance and troubleshooting Services/Applications', isTLPresent: false, day: 7 },
    // Day8
    { title: 'Buddy Knowledge Sharing', start: '10:10:00 ', end: '10:30:00 ', description: 'Writing and maintaining Acceptance and End-to-end Tests', isTLPresent: false, day: 8 }];

const SCHEDULE_ON_CALENDAR_DAY: Event[] = [
    // Day10
    { title: 'Buddy Recap', start: '17:00:00 ', end: '17:30:00 ', isTLPresent: false, day: 10 },
    // Day15
    { title: 'Team Lead Recap', start: '17:00:00 ', end: '17:30:00 ', description: 'How was onboarding?', isTLPresent: true, day: 15 },
    { title: 'Director Recap', start: '17:00:00 ', end: '17:30:00 ', description: 'Feedback', isTLPresent: true, day: 30 },
    { title: 'Quarterly Feedback', start: '17:00:00 ', end: '17:30:00 ', description: 'Feedback', isTLPresent: true, day: 90 },
    { title: 'Probation Feedback', start: '17:00:00 ', end: '17:30:00 ', description: 'Feedback', isTLPresent: true, day: 180 }
];

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
    if(n == 1) {
        return date;
    } else {
        const nextDay = getNextWorkingDay(date);
        return getNthWorkingDay(nextDay, n-1);
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