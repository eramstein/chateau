export interface Time {
    year?: number;
    season?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
}

const SEASON_DURATION = 30;
const SEASON_COUNT = 4;

export function updateTime(currentTime: Time, timeEllapsed: Time): Time {

    let { second, minute, hour, day, season, year } = currentTime;

    second += timeEllapsed.second || 0;
    minute += timeEllapsed.minute || 0;
    hour += timeEllapsed.hour || 0;
    day += timeEllapsed.day || 0;

    if (second > 59) {
        second = 0;
        minute++;
    }

    if (minute > 59) {
        minute = 0;
        hour++;
    }

    if (hour > 23) {
        hour = 0;
        day++;
    }

    if (day > SEASON_DURATION) {
        day = 1;
        season++;
    }

    if (season > SEASON_COUNT) {
        season = 1;
        year++;
    }

    return {
        year,
        season,
        day,
        hour,
        minute,
        second,
    };
}
