import { runOnSubmit } from './app';
import { isWeekend } from './app';

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
