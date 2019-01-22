import { runOnSubmit } from './app';
import { isWeekend, isStaticHoliday, isHoliday } from './app';

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

describe('isHoliday', ()=> {
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