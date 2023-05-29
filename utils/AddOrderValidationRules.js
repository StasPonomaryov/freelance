export default function validate(values) {
  let errors = {};

  if (!values.taskTitle) {
    errors.taskTitle = "Title field is required";
  } else if (values.taskTitle && values.taskTitle.length < 3) {
    errors.taskTitle = "Title must be longer than 3 characters";
  }

  if (!values.taskStart) {
    errors.taskStart = "Start date field is required";
  }

  if (values.taskPriceStart && /[^\d\.]/.test(values.taskPriceStart)) {
    errors.taskPriceStart = "Price field contains non-numeric values";
  }

  if (!values.taskPriceEnd) {
    errors.taskPriceEnd ="Price end field is required";
  } else if (values.taskPriceEnd && (/[^\d\.]/.test(values.taskPriceEnd))) {
    errors.taskPriceEnd = "Price field contains non-numeric values";
  }

  if (values.taskHours && /[^\d\.]/.test(values.taskHours)) {
    errors.taskHours = "Hours field contains non-numeric values";
  }

  return errors;
}
