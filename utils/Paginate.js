/**
 * Paginate function
 * @param {Array} items 
 * @param {Number} pageNumber - number of page
 * @param {Number} pageSize - items per page
 * @returns {Array} sliced items array
 */
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;

  return items.slice(startIndex, startIndex + pageSize);
}
