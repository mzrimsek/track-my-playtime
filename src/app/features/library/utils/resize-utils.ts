export const getNumEntriesToShow = (height: number): number => {
  let numToShow = 10;
  if (height < 700) {
    numToShow = 5;
  } else {
    numToShow = height / 70;
  }
  return Math.floor(numToShow);
};
