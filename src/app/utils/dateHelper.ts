export const getElapsedTime = (startDate: Date, currentTime: Date): string => {
  if (isValidDate(startDate) && isValidDate(currentTime) && startDate.getTime() <= currentTime.getTime()) {
    const elapsedTime = currentTime.valueOf() - startDate.valueOf();
    return new Date(elapsedTime).toISOString().substring(11, 19);
  }
  return '00:00:00';
};

const isValidDate = (date: Date): boolean => {
  return !isNaN(date.getTime()) && date.getTime() !== new Date(0).getTime();
};
