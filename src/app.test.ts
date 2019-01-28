import { isWeekend, isStaticHoliday, isHoliday, getNextWorkingDay, getDateString, getGuestStringBy, createMeetingForEvent, Event, getNthWorkingDay, getEventsFromSheetData } from './app';

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
        const date = new Date('January 05, 2019'); // Saturday

        const result = isWeekend(date);

        expect(result).toBeTruthy();
    });
})

describe('isStaticHoliday', () => {
    it('should return true for holiday', () => {
        const date = new Date('Dec 25, 2019'); // Holiday

        const result = isStaticHoliday(date);

        expect(result).toBeTruthy();
    })

    it('should return false when not a holiday', () => {
        const date = new Date('January 03, 2019'); // Not a holiday

        const result = isStaticHoliday(date);

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

describe('getNextWorkingDay', () => {
    it('should return next date if it is not a holiday', () => {
        const currentDate = new Date('January 02, 2019');
        const expectedDate = new Date('January 03, 2019'); // Not a holiday

        const actualDate = getNextWorkingDay(currentDate);

        expect(actualDate).toEqual(expectedDate);
    });

    it('should find and return another date if next day is a holiday', () => {
        const currentDate = new Date('02 October 2019');
        const expectedDate = new Date('04 October 2019'); // October 03, 2019 is a holiday

        const actualDate = getNextWorkingDay(currentDate);

        expect(actualDate).toEqual(expectedDate);
    });

    it('should return the working date after given days if not a holiday', () => {
        const currentDate = new Date('January 02, 2019'); // Wednesday
        const expectedDate = new Date('January 09, 2019'); // after 7 days and not a holiday

        const actualDate = getNextWorkingDay(currentDate, 7);

        expect(actualDate.getTime()).toBe(expectedDate.getTime());
    });

    it('should return the next working date after added days is a holiday', () => {
        const currentDate = new Date('January 02, 2019'); // Wednesday
        const expectedDate = new Date('January 14, 2019'); // next working day after 10 days

        const actualDate = getNextWorkingDay(currentDate, 10);

        expect(actualDate.getTime()).toBe(expectedDate.getTime());
    });
});

describe('getNthWorkingDay', () => {
    it('should return starting day when n=1', () => {
        const date = new Date('January 04, 2019'); // Friday
        const expected = new Date('January 04, 2019');

        const actual = getNthWorkingDay(date, 1);

        expect(actual).toEqual(expected);
    });

    it('should return 2nd day when n=2', () => {
        const date = new Date('January 04, 2019'); // Friday
        const expected = new Date('January 07, 2019');

        const actual = getNthWorkingDay(date, 2);

        expect(actual).toEqual(expected);
    });

    it('should return 5th day when n=5', () => {
        const date = new Date('January 04, 2019'); // Friday
        const expected = new Date('January 10, 2019');

        const actual = getNthWorkingDay(date, 5);

        expect(actual).toEqual(expected);
    });

    it('should return 10th day when n=10', () => {
        const date = new Date('January 04, 2019'); // Friday
        const expected = new Date('January 17, 2019');

        const actual = getNthWorkingDay(date, 10);

        expect(actual).toEqual(expected);
    });

    it('should return 15th day when n=15', () => {
        const date = new Date('January 04, 2019'); // Friday
        const expected = new Date('January 24, 2019');

        const actual = getNthWorkingDay(date, 15);

        expect(actual).toEqual(expected);
    });
});

describe('getDateString', () => {
    it('should return date in the format `MM DD,YYYY`', () => {
        const date = new Date('17 Janaury 2019');
        const expectedDate = 'January 17, 2019';

        const actualDate = getDateString(date)

        expect(actualDate).toBe(expectedDate);
    })
})

describe('getGuestStringBy', () => {
    const buddyEmail = "buddyEmail";
    const TLEmail = "TLEmail";
    const mandatoryEmail = "mandatory";
    it('should include TL and not buddy if isTLPresent is true', () => {
        const result = getGuestStringBy(true, buddyEmail, TLEmail, mandatoryEmail);

        expect(result).toBe(`${mandatoryEmail}, ${TLEmail}`);
    });

    it('should include buddy and not TL if isTLPresent is false', () => {
        const result = getGuestStringBy(false, buddyEmail, TLEmail, mandatoryEmail);

        expect(result).toBe(`${mandatoryEmail}, ${buddyEmail}`);
    });
});

describe('createMeetingForEvent', () => {
    it('should create meetings for given day', () => {
        const date = new Date('02 Janaury 2019'); // Wednesday
        const event: Event = {
            title: 'Buddy Intro',
            start: '11:00:00 UTC',
            end: '11:20:00 UTC',
            description: 'Introduction to Team Members',
            isTLPresent: false,
            day: 0
        }
        const guests = "guest";

        createMeetingForEvent(date, event, guests);

        // Then => assert that mock is called.
    });
});

describe('getEventsFromSheetData', () => {
    it('should return object of type `event`', () => {
        //Given
        const title = 'Buddy Intro';
        const start = '11:00:00';
        const end = '11:20:00';
        const description = 'Introduction to Team Members';
        const isTLPresent = 'false';
        const day = '0';

        const expected: Event = {
            title: 'Buddy Intro',
            start: '11:00:00',
            end: '11:20:00',
            description: 'Introduction to Team Members',
            isTLPresent: false,
            day: 0
        }

        // When
        const result = getEventsFromSheetData(title, start, end, description, isTLPresent, day);

        // Then
        expect(result).toEqual(expected);
    });
});