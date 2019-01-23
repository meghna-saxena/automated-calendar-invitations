import { isWeekend, isStaticHoliday, isHoliday, getNextWorkingDay } from './app';

describe('isWeekend', () => {
    it('should return false for weekday', () => {
        // Given | Arrange
        const date = new Date('January 01, 2019'); // Tuesday

        // When | Act
        const result = isWeekend(date);

        // Then | Assert
        expect(result).toBeFalsy();
    });

    it('should return true for weekend', () => {
        // Given | Arrange
        const date = new Date('January 05, 2019'); // Saturday

        // When | Act
        const result = isWeekend(date);

        // Then | Assert
        expect(result).toBeTruthy();
    });
})

describe('isStaticHoliday', () => {
    it('should return true for holiday', () => {
        // Given
        const date = new Date('Dec 25, 2019'); // Holiday

        // When
        const result = isStaticHoliday(date);

        // Then | Assert
        expect(result).toBeTruthy();
    })

    it('should return false when not a holiday', () => {
        // Given
        const date = new Date('January 03, 2019'); // Not a holiday

        // When
        const result = isStaticHoliday(date);

        // Then | Assert
        expect(result).toBeFalsy();
    });
})

describe('isHoliday', () => {
    it('should return true if weekend or static holiday', () => {
        const holiday = new Date('Dec 25, 2019'); // Holiday
        const weekend = new Date('January 05, 2019'); // Saturday

        const holidayResult = isHoliday(holiday);
        const weekendResult = isHoliday(weekend);

        expect(holidayResult).toBeTruthy();
        expect(weekendResult).toBeTruthy();
    })

    it('should return false if not weekend or not static holiday', () => {
        const notHoliday = new Date('January 03, 2019'); // Not a holiday
        const weekday = new Date('January 08, 2019'); // Tuesday

        const notHolidayResult = isHoliday(notHoliday);
        const weekDayResult = isHoliday(weekday);

        expect(notHolidayResult).toBeFalsy();
        expect(weekDayResult).toBeFalsy();
    })
});


function expectOnDates(actual: Date, expected: Date) {
    expect(actual.getTime()).toBe(expected.getTime());
}

describe('getNextWorkingDay', () => {
    it('should return next date if it is not a holiday', () => {
        const currentDate = new Date('January 02, 2019');
        const expectedDate = new Date('January 03, 2019'); // Not a holiday

        const actualDate = getNextWorkingDay(currentDate);

        expectOnDates(actualDate, expectedDate);
    });

    it('should find and return another date if next day is a holiday', () => {
        const currentDate = new Date('02 October 2019');
        const expectedDate = new Date('04 October 2019'); // October 03, 2019 is a holiday

        const actualDate = getNextWorkingDay(currentDate);

        expectOnDates(actualDate, expectedDate);
    });

    it('should return the working date after given days if not a holiday', () => {
        const currentDate = new Date('January 02, 2019'); // Wednesday
        const expectedDate = new Date('January 09, 2019'); // after 7 days and not a holiday

        const actualDate = getNextWorkingDay(currentDate, 7);

        expect(actualDate.getTime()).toBe(expectedDate.getTime());
    });
});
