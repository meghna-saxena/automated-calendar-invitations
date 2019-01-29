"use strict";
function _easter(year) {
    var k = Math.floor(year / 100);
    var m = 15 + Math.floor((3 * k + 3) / 4) - Math.floor((8 * k + 13) / 25);
    var s = 2 - Math.floor((3 * k + 3) / 4);
    var a = year % 19;
    var d = (19 * a + m) % 30;
    var r = Math.floor((d + a / 11) / 29);
    var og = 21 + d - r;
    var sz = 7 - Math.floor(year + year / 4 + s) % 7;
    var oe = 7 - (og - sz) % 7;
    var os = og + oe;
    var daysPerMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31];
    var day = os;
    var month;
    for (month = 3; month < 8; month++) {
        if (day <= daysPerMonth[month]) {
            break;
        }
        day -= daysPerMonth[month];
    }
    month = month - 1;
    return new Date(year, month, day);
}
var ONE_DAY_IN_SECONDS = 24 * 60 * 60;
var checkIfMovableHoliday = function (date) {
    var year = date.getFullYear();
    var easterDate = _easter(year);
    console.log('easterDate', easterDate);
    var easterTimestamp = easterDate.getTime() / 1000;
    console.log('easterTimestamp', new Date(easterTimestamp * 1000));
    var dateTimestamp = date.getTime() / 1000;
    console.log('date', date);
    var goodFridayTimestamp = easterTimestamp - 2 * ONE_DAY_IN_SECONDS;
    var easterMondayTimestamp = easterTimestamp + ONE_DAY_IN_SECONDS;
    var ascensionDayTimestamp = easterTimestamp + 39 * ONE_DAY_IN_SECONDS;
    var whitMondayTimestamp = easterTimestamp + 50 * ONE_DAY_IN_SECONDS;
    console.log('easterMondayTimestamp', new Date(easterMondayTimestamp * 1000));
    console.log('goodFridayTimestamp', new Date(goodFridayTimestamp * 1000));
    console.log('ascensionDayTimestamp', new Date(ascensionDayTimestamp * 1000));
    console.log('whitMondayTimestamp', new Date(whitMondayTimestamp * 1000));
    var timestamps = [goodFridayTimestamp, easterMondayTimestamp, ascensionDayTimestamp, whitMondayTimestamp];
    return timestamps.includes(dateTimestamp);
};
console.log(checkIfMovableHoliday(new Date('March 21, 2008')));
