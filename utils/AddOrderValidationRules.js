/**
 * Validation function for Orders form
 * @param {Object} values
 * @returns {Object} errors
 */
export default function validate({
  taskTitle,
  taskStart,
  taskPriceStart,
  taskPriceEnd,
  taskHours,
}) {
  let errors = {};

  if (!taskTitle) {
    errors.taskTitle = 'Title field is required';
  } else if (taskTitle && taskTitle.length < 3) {
    errors.taskTitle = 'Title must be longer than 3 characters';
  }

  if (!taskStart) {
    errors.taskStart = 'Start date field is required';
  }

  if (taskPriceStart && /[^\d\.]/.test(taskPriceStart)) {
    errors.taskPriceStart = 'Price field contains non-numeric values';
  }

  if (!taskPriceEnd) {
    errors.taskPriceEnd = 'Price end field is required';
  } else if (taskPriceEnd && /[^\d\.]/.test(taskPriceEnd)) {
    errors.taskPriceEnd = 'Price field contains non-numeric values';
  }

  if (taskHours && /[^\d\.]/.test(taskHours)) {
    errors.taskHours = 'Hours field contains non-numeric values';
  }

  return errors;
}
