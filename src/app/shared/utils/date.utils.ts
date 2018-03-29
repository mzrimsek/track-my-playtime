export const formatElapsedTime = (elapsedTime: number): string => {
  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime - (hours * 3600)) / 60);
  const seconds = elapsedTime - (hours * 3600) - (minutes * 60);

  return getZeroPaddingTime(hours) + ':' + getZeroPaddingTime(minutes) + ':' + getZeroPaddingTime(seconds);
};

export const getElapsedTime = (startTime: number, endTime: number) => Math.floor((endTime - startTime) / 1000);

const getZeroPaddingTime = (time: number): string => {
  const paddedTime = time < 10 ? '0' + time : '' + time;
  return paddedTime.indexOf('.') === -1 ? paddedTime : paddedTime.substr(0, paddedTime.indexOf('.'));
};
