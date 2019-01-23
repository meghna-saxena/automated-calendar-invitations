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
});
describe('getDateString', function () {
    it('should return date in the format `MM DD,YYYY`', function () {
        var date = new Date('17 Janaury 2019');
        var expectedDate = 'January 17, 2019';
        var actualDate = app_1.getDateString(date);
        expect(actualDate).toBe(expectedDate);
    });
});
describe('createMeetings', function () {
    it('should get return value of date from getDateString', function () {
    });
    it('should call createMeetingsPerDay', function () {
    });
    it('should pass each item of schedules array to createMeetingsPerDay', function () {
    });
    it('should pass starting date, Tl email, buddy email, new joinee email to createMeetingsPerDay', function () {
    });
});
