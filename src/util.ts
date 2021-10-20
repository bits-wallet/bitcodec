export const calcAllLength = <T>(items: T[], calcLength: (item?: T, itemIndex?: number, itemOffset?: number) => number, allOffset: number = 0) => {
  let lOffset = allOffset;
  for (let i = 0; i < items.length; i++) lOffset += calcLength(items[i], i, lOffset);
  return lOffset;

  /* return items.reduce((previusValue, currentItem, currentIndex) => {
    return previusValue + iter(items[currentIndex], currentIndex, previusValue);
  }, acc); */
};
