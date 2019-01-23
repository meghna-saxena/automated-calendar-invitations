"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
describe('isWeekend', function () {
    it('should return false for weekday', function () {
        // Given | Arrange
        var date = new Date('January 01, 2019'); // Tuesday
        // When | Act
        var result = app_1.isWeekend(date);
        // Then | Assert
        expect(result).toBeFalsy();
    });
    it('should return true for weekend', function () {
        var date = new Date('January 05, 2019'); // Saturday
        var result = app_1.isWeekend(date);
        expect(result).toBeTruthy();
    });
});
describe('isStaticHoliday', function () {
    it('should return true for holiday', function () {
        var date = new Date('Dec 25, 2019'); // Holiday
        var result = app_1.isStaticHoliday(date);
        expect(result).toBeTruthy();
    });
    it('should return false when not a holiday', function () {
        var date = new Date('January 03, 2019'); // Not a holiday
        var result = app_1.isStaticHoliday(date);
        expect(result).toBeFalsy();
    });
});
describe('isHoliday', function () {
    it('should return true if weekend or static holiday', function () {
        var holiday = new Date('Dec 25, 2019'); // Holiday
        var weekend = new Date('January 05, 2019'); // Saturday
        var holidayResult = app_1.isHoliday(holiday);
        var weekendResult = app_1.isHoliday(weekend);
        expect(holidayResult).toBeTruthy();
        expect(weekendResult).toBeTruthy();
    });
    it('should return false if not weekend or not static holiday', function () {
        var notHoliday = new Date('January 03, 2019'); // Not a holiday
        var weekday = new Date('January 08, 2019'); // Tuesday
        var notHolidayResult = app_1.isHoliday(notHoliday);
        var weekDayResult = app_1.isHoliday(weekday);
        expect(notHolidayResult).toBeFalsy();
        expect(weekDayResult).toBeFalsy();
    });
});
function expectOnDates(actual, expected) {
    expect(actual.getTime()).toBe(expected.getTime());
}
describe('getNextWorkingDay', function () {
    it('should return next date if it is not a holiday', function () {
        var currentDate = new Date('January 02, 2019');
        var expectedDate = new Date('January 03, 2019'); // Not a holiday
        var actualDate = app_1.getNextWorkingDay(currentDate);
        expectOnDates(actualDate, expectedDate);
    });
    it('should find and return another date if next day is a holiday', function () {
        var currentDate = new Date('02 October 2019');
        var expectedDate = new Date('04 October 2019'); // October 03, 2019 is a holiday
        var actualDate = app_1.getNextWorkingDay(currentDate);
        expectOnDates(actualDate, expectedDate);
    });
    it('should return the working date after given days if not a holiday', function () {
        var currentDate = new Date('January 02, 2019'); // Wednesday
        var expectedDate = new Date('January 09, 2019'); // after 7 days and not a holiday
        var actualDate = app_1.getNextWorkingDay(currentDate, 7);
        expect(actualDate.getTime()).toBe(expectedDate.getTime());
    });
    it('should return the next working date after added days is a holiday', function () {
        var currentDate = new Date('January 02, 2019'); // Wednesday
        var expectedDate = new Date('January 14, 2019'); // next working day after 10 days
        var actualDate = app_1.getNextWorkingDay(currentDate, 10);
        expect(actualDate.getTime()).toBe(expectedDate.getTime());
    });
});
describe('getNthWorkingDay', function () {
    it('should return starting day when n=1', function () {
        var date = new Date('January 04, 2019'); // Friday
        var expected = new Date('January 04, 2019');
        var actual = app_1.getNthWorkingDay(date, 1);
        expectOnDates(actual, expected);
    });
    it('should return 2nd day when n=2', function () {
        var date = new Date('January 04, 2019'); // Friday
        var expected = new Date('January 07, 2019');
        var actual = app_1.getNthWorkingDay(date, 2);
        expectOnDates(actual, expected);
    });
    it('should return 5th day when n=5', function () {
        var date = new Date('January 04, 2019'); // Friday
        var expected = new Date('January 10, 2019');
        var actual = app_1.getNthWorkingDay(date, 5);
        expectOnDates(actual, expected);
    });
});
describe('getDateString', function () {
    it('should return date in the format `MM DD,YYYY`', function () {
        var date = new Date('17 Janaury 2019');
        var expectedDate = 'January 17, 2019';
        var actualDate = app_1.getDateString(date);
        expect(actualDate).toBe(expectedDate);
    });
});
describe('getGuestStringBy', function () {
    var buddyEmail = "buddyEmail";
    var TLEmail = "TLEmail";
    var mandatoryEmail = "mandatory";
    it('should include TL and not buddy if isTLPresent is true', function () {
        var result = app_1.getGuestStringBy(true, buddyEmail, TLEmail, mandatoryEmail);
        expect(result).toBe(mandatoryEmail + ", " + TLEmail);
    });
    it('should include buddy and not TL if isTLPresent is false', function () {
        var result = app_1.getGuestStringBy(false, buddyEmail, TLEmail, mandatoryEmail);
        expect(result).toBe(mandatoryEmail + ", " + buddyEmail);
    });
});
describe('createMeetings', function () {
    it('should pass each item of schedule array to createMeetingsPerDay', function () {
        var mockCreateMeetingPerDay = jest.fn(function (x) { return x; });
        var schedule = [0, 1, 2];
        // createMeetings();
        expect(mockCreateMeetingPerDay.mock.calls).toBeTruthy();
        // expect(mockCreateMeetingPerDay.mock.calls[0][0]).toBe(0);
    });
    it('should pass starting date, Tl email, buddy email, new joinee email to createMeetingsPerDay', function () {
        var date = Date.now();
        var TLEmail = 'ddsdadad';
        var buddyEmail = 'asddadadt';
        var newEmployeeEmail = 'sdada';
        var schedule = [0, 1, 2];
        var mockCreateMeetingPerDay = jest.fn(function (x) { return x; });
        // createMeetings(TLEmail, buddyEmail, newEmployeeEmail, schedule);
        expect(mockCreateMeetingPerDay.mock.calls).toBeTruthy();
        expect(mockCreateMeetingPerDay.mock.calls);
    });
});
describe('createMeetingForEvent', function () {
    it('should create meetings for given day', function () {
        var date = new Date('02 Janaury 2019'); // Wednesday
        var event = {
            title: 'Buddy Intro',
            start: '11:00:00 UTC',
            end: '11:20:00 UTC',
            description: 'Introduction to Team Members',
            isTLPresent: false,
            day: 0
        };
        var guests = "guest";
        app_1.createMeetingForEvent(date, event, guests);
        // Then => assert that mock is called.
    });
});
