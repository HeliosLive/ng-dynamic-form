export function DataReOrder<T>(
  data: T[],
  orderBy: keyof T,
  direction: 'ASC' | 'DESC'
): T[] {
  const dir = direction === 'ASC' ? 1 : -1;
  return data.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return -dir;
    }
    if (a[orderBy] > b[orderBy]) {
      return dir;
    }

    return 0;
  });
}
