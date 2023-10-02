import func from '@utils/func';

describe('func', () => {
  describe('randomColor', () => {
    it('returns a valid color string', () => {
      const color = func.randomColor();
      expect(color).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });

  describe('validateDate', () => {
    it('formats a date correctly', () => {
      const date = '2023-10-02T12:34:56.789Z';
      const formattedDate = func.validateDate(date);

      expect(formattedDate).toBe(formattedDate);
    });
    it('formats the current date as "Today, at HH:mm a" without line break', () => {
      const currentDateTime = new Date();
      const formattedDate = func.validateDate(
        currentDateTime.toISOString(),
        false,
      );
      const expectedDate = `Today, at ${func.formatTime(currentDateTime)}`;
      expect(formattedDate).toBe(expectedDate);
    });

    it('formats the current date as "Today,\nat HH:mm a" with line break', () => {
      const currentDateTime = new Date();
      const formattedDate = func.validateDate(
        currentDateTime.toISOString(),
        true,
      );
      const expectedDate = `Today,\nat ${func.formatTime(currentDateTime)}`;
      expect(formattedDate).toBe(expectedDate);
    });

    it('formats yesterday correctly without line break', () => {
      const yesterdayDateTime = func.addDays(new Date(), -1);
      const formattedDate = func.validateDate(
        yesterdayDateTime.toISOString(),
        false,
      );
      const expectedDate = `Yesterday, at ${func.formatTime(
        yesterdayDateTime,
      )}`;
      expect(formattedDate).toBe(expectedDate);
    });

    it('formats tomorrow correctly without line break', () => {
      const tomorrowDateTime = func.addDays(new Date(), 1);
      const formattedDate = func.validateDate(
        tomorrowDateTime.toISOString(),
        false,
      );
      const expectedDate = `Tomorrow, at ${func.formatTime(tomorrowDateTime)}`;
      expect(formattedDate).toBe(expectedDate);
    });

    it('formats a future date correctly without line break', () => {
      const futureDateTime = func.addDays(new Date(), 5);
      const formattedDate = func.validateDate(
        futureDateTime.toISOString(),
        false,
      );
      const expectedDate = `${func.formatDate(
        futureDateTime,
      )}, at ${func.formatTime(futureDateTime)}`;
      expect(formattedDate).toBe(expectedDate);
    });
  });

  describe('isSameDay', () => {
    it('returns true for the same day', () => {
      const date1 = new Date('2023-10-02');
      const date2 = new Date('2023-10-02');
      expect(func.isSameDay(date1, date2)).toBe(true);
    });

    it('returns false for different days', () => {
      const date1 = new Date('2023-10-02');
      const date2 = new Date('2023-10-03');
      expect(func.isSameDay(date1, date2)).toBe(false);
    });
  });

  describe('addDays', () => {
    it('should correctly add positive days', () => {
      const initialDate = new Date('2023-10-02');
      const daysToAdd = 5;
      const expectedDate = new Date('2023-10-07');
      const resultDate = func.addDays(initialDate, daysToAdd);
      expect(resultDate).toEqual(expectedDate);
    });

    it('should correctly subtract negative days', () => {
      const initialDate = new Date('2023-10-15');
      const daysToAdd = -3;
      const expectedDate = new Date('2023-10-12');
      const resultDate = func.addDays(initialDate, daysToAdd);
      expect(resultDate).toEqual(expectedDate);
    });
  });
  describe('formatDate', () => {
    it('should format date correctly for a specific date', () => {
      const date = new Date('2023-10-02');
      const formattedDate = func.formatDate(date);
      expect(formattedDate).toBe('Mon 10, 2023');
    });
  });
  describe('formatTime', () => {
    it('should format time correctly in the morning 9:30 AM', () => {
      const date = new Date('2023-10-02T09:30:00');
      const formattedTime = func.formatTime(date);
      expect(formattedTime).toBe('9:30 a.m');
    });

    it('should format time correctly in the afternoon 3:45 PM', () => {
      const date = new Date('2023-10-02T15:45:00');
      const formattedTime = func.formatTime(date);
      expect(formattedTime).toBe('3:45 p.m');
    });

    it('should format time correctly at midnight 12:00 AM', () => {
      const date = new Date('2023-10-02T00:00:00');
      const formattedTime = func.formatTime(date);
      expect(formattedTime).toBe('12:00 a.m');
    });
  });
  describe('getDayOfWeek', () => {
    it('should return the correct day for Sunday', () => {
      const date = new Date('2023-10-01');
      const dayOfWeek = func.getDayOfWeek(date);
      expect(dayOfWeek).toBe('Sun');
    });
  });

  describe('Arrays', () => {
    it('should sort dates correctly', () => {
      const inputArray = [
        {date: '2023-10-03T12:00:00'},
        {date: '2023-10-02T15:30:00'},
      ];

      const expectedArray = [
        {date: '2023-10-02T15:30:00'},
        {date: '2023-10-03T12:00:00'},
      ];

      const sortedArray = func.Arrays(inputArray);

      expect(sortedArray).toEqual(expectedArray);
    });

    test('sorts array with dates in the future (after tomorrow)', () => {
      const arr = [
        {date: '2023-10-05'},
        {date: '2023-10-10'},
        {date: '2023-10-08'},
      ];

      const sortedArr = func.Arrays(arr);
      expect(sortedArr[0].date).toBe('2023-10-05');
      expect(sortedArr[1].date).toBe('2023-10-10');
      expect(sortedArr[2].date).toBe('2023-10-08');
    });

    test('sorts array with dates today', () => {
      const arr = [
        {date: '2023-10-04'},
        {date: '2023-10-04'},
        {date: '2023-10-04'},
      ];

      const sortedArr = func.Arrays(arr);
      expect(sortedArr[0].date).toBe('2023-10-04');
      expect(sortedArr[1].date).toBe('2023-10-04');
      expect(sortedArr[2].date).toBe('2023-10-04');
    });

    test('sorts array with dates in the past (before yesterday)', () => {
      const arr = [
        {date: '2023-10-30'},
        {date: '2023-10-01'},
        {date: '2023-09-02'},
      ];

      const sortedArr = func.Arrays(arr);

      expect(sortedArr[0].date).toBe('2023-09-02');
      expect(sortedArr[1].date).toBe('2023-10-01');
      expect(sortedArr[2].date).toBe('2023-10-30');
    });

    test('sorts array with mixed past, today, and future dates', () => {
      const arr = [
        {date: '2023-10-02'},
        {date: '2023-10-04'},
        {date: '2023-10-01'},
        {date: '2023-10-05'},
        {date: '2023-10-03'},
      ];

      const sortedArr = func.Arrays(arr);
      expect(sortedArr[0].date).toBe('2023-10-01');
      expect(sortedArr[1].date).toBe('2023-10-02');
      expect(sortedArr[2].date).toBe('2023-10-04');
      expect(sortedArr[3].date).toBe('2023-10-05');
      expect(sortedArr[4].date).toBe('2023-10-03');
    });
  });
});
