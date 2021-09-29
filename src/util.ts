// changed reduce: default value, auto sum
export const size = (items: any[], iter: (a: any, index?: number, ac?: number) => number, acc: number = 0) => {
  if (acc === undefined) acc = 0;
  for (let i = 0; i < items.length; ++i) acc += iter(items[i], i, acc);
  return acc;
};
