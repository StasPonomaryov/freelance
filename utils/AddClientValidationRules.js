/**
 * Validation function for Clients form
 * @param {Object} values
 * @returns {Object} errors
 */
export default function validate({
  clientName,
  clientDescription,
  clientContacts,
}) {
  let errors = {};

  if (!clientName) {
    errors.clientName = 'Name field is required';
  } else if (clientName.length < 3) {
    errors.clientName = 'Name must be longer than 2 characters';
  }

  if (!clientDescription) {
    errors.clientDescription = 'Description field is required';
  } else if (clientDescription.length < 3) {
    errors.clientDescription = 'Description must be longer than 2 characters';
  }

  if (!clientContacts) {
    errors.clientContacts = 'Name field is required';
  } else if (clientContacts.length < 3) {
    errors.clientContacts = 'Name must be longer than 2 characters';
  }

  return errors;
}
