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
        // Given | Arrange
        var date = new Date('January 05, 2019'); // Saturday
        // When | Act
        var result = app_1.isWeekend(date);
        // Then | Assert
        expect(result).toBeTruthy();
    });
});
