export const median = (array: number[]): number => {
  const sortedArray = array.sort((a, b) => a - b);
  const arrayLength = array.length;
  return (
    arrayLength % 2 ?
      sortedArray[Math.floor(arrayLength / 2)] :
      (
        sortedArray[arrayLength / 2 - 1] +
        sortedArray[arrayLength / 2]
      ) / 2
  );
};

export function variance(arr: number[]): number {
  if (arr.length === 0) return 0;

  let sum = 0;
  for (const each of arr) {
    sum += each;
  }

  const mean = sum / arr.length;

  let sumOfSquaredMeanDiff = 0;
  for (const each of arr) {
    sumOfSquaredMeanDiff += (each - mean) ** 2;
  }

  return sumOfSquaredMeanDiff / arr.length;
}

export function mode(numbers: number[]): number[] {
  // Count the occurrences of each number
  const counts: { [key: number]: number } = {};
  for (const num of numbers) {
    if (num in counts) {
      counts[num] += 1;
    } else {
      counts[num] = 1;
    }
  }

  // Find the maximum count
  let maxCount = 0;
  for (const count of Object.values(counts)) {
    maxCount = Math.max(maxCount, count);
  }

  // Get all numbers with the maximum count (mode)
  const _mode: number[] = [];
  for (const [number, count] of Object.entries(counts)) {
    if (count === maxCount) {
      _mode.push(Number(number));
    }
  }

  return _mode;
}


export const fromArrayToRecordGroupByKey = <R extends object, P extends keyof R, V = R>(
  items: R[],
  primaryKey: P,
  convertArrayItem: (row: R) => V = (row: R) => (row as unknown) as V,
): Record<string, V[]> => {
  const results: Record<string, V[]> = {};
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const key = (typeof item[primaryKey] === "string" ? item[primaryKey] : JSON.stringify(item[primaryKey])) as string;
    const value = convertArrayItem(item);
    if (!results[key]) {
      results[key] = [value];
      continue;
    }
    results[key].push(value);
  }
  return results;
};


export const fromArrayToRecord = <R extends object, P extends keyof R, M = R>(
  items: R[],
  primaryKey: P,
  convertFunc: (r: R) => M = (r: R): M => (r as unknown) as M,
): Record<string, M> => {
  const results: Record<string, M> = {};
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const key = (typeof item[primaryKey] === "string" ? item[primaryKey] : JSON.stringify(item[primaryKey])) as string;
    results[key] = convertFunc(item);
  }
  return results;
};

export const fromObjectToObject = <R extends object, S extends object>(
  items: Record<string, R>,
  convertFunc: (r: R) => S,
): Record<string, S> => {
  const results: Record<string, S> = {};
  const keys = Object.keys(items);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    results[key] = convertFunc(items[key]);
  }
  return results;
};


export const fromArrayToDict = <V extends number | string>(items: V[]): Partial<Record<V, boolean>> => {
  const results = items.reduce<Partial<Record<V, boolean>>>(
    (_, item) => {

      _[item] = true;
      return _;
    },
    {},
  );
  return results;
};

export function chunkArray<T>(arr: T[], size: number): T[][] {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

export function uniqueArray<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

export function includes<T extends U, U>(coll: ReadonlyArray<T>, el: U): el is T {
  return coll.includes(el as T);
}
