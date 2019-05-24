export interface Time {
    year: number;
    season: number;
    day: number;
    hour: number;
    minute: number;
}

const SEASON_DURATION = 30;
const SEASON_COUNT = 4;

export function updateTime(time: Time): Time {

    // 1 time tick = 1 minute
    let minute = time.minute + 1;
    let { hour, day, season, year } = time;

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
    };
}
