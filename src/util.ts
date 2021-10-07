export const size = <T>(items: T[], iter: (item?: T, index?: number, ac?: number) => number, acc: number = 0) => {
  let result = acc;
  for (let i = 0; i < items.length; i++) result += iter(items[i], i, result);
  return result;

  /* return items.reduce((previusValue, currentItem, currentIndex) => {
    return previusValue + iter(items[currentIndex], currentIndex, previusValue);
  }, acc); */
};
