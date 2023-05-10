export default function validate(values) {
  let errors = {};

  if (!values.clientName) {
    errors.clientName = "Name field is required";
  } else if (values.clientName.length < 3) {
    errors.clientName = "Name must be longer than 2 characters";
  }

  if (!values.clientDescription) {
    errors.clientDescription = "Description field is required";
  } else if (values.clientDescription.length < 3) {
    errors.clientDescription = "Description must be longer than 2 characters";
  }

  if (!values.clientContacts) {
    errors.clientContacts = "Name field is required";
  } else if (values.clientContacts.length < 3) {
    errors.clientContacts = "Name must be longer than 2 characters";
  }

  return errors;
}
