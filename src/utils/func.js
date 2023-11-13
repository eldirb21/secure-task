const func = {
  randomColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
  },
  validateDate(inputDate, multipleLine = false) {
    const date = new Date(inputDate);
    const today = new Date();

    if (this.isSameDay(date, today)) {
      return `Today,${multipleLine ? '\n' : ' '}at ${this.formatTime(date)}`;
    } else if (this.isSameDay(this.addDays(today, -1), date)) {
      return `Yesterday,${multipleLine ? '\n' : ' '}at ${this.formatTime(
        date,
      )}`;
    } else if (this.isSameDay(this.addDays(today, 1), date)) {
      return `Tomorrow,${multipleLine ? '\n' : ' '}at ${this.formatTime(date)}`;
    } else {
      return `${this.formatDate(date)},${
        multipleLine ? '\n' : ' '
      }at ${this.formatTime(date)}`;
    }
  },

  isSameDay(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  },
  addDays(date, days) {
    const result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
  },
  formatDate(date) {
    return `${this.getDayOfWeek(date)} ${
      date.getMonth() + 1
    }, ${date.getFullYear()}`;
  },
  formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? 'p.m' : 'a.m';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  },
  getDayOfWeek(date) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek[date.getDay()];
  },

  Arrays(arr) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    return arr.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA > tomorrow) {
        return 1;
      } else if (dateA >= today) {
        return 0;
      } else if (dateA >= yesterday) {
        return -1;
      } else {
        return dateA - dateB;
      }
    });
  },
  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  },
};

export default func;
