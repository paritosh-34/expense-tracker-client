const validatePassword = (candidatePassword: string): [boolean, string] => {
  const { length } = candidatePassword;
  const search1 = candidatePassword.search(/[a-z]/);
  const search2 = candidatePassword.search(/[A-Z]/);
  const search3 = candidatePassword.search(/[0-9]/);
  const search4 = candidatePassword.search(/[@#$%^&]/);

  let isErr = false;
  const errors: string[] = [];

  if (length < 8) {
    isErr = true;
    errors.push('Password must be atleast 8 characters.');
  }
  if (search1 < 0) {
    isErr = true;
    errors.push('Password must contain atleast one lowercase letter.');
  }
  if (search2 < 0) {
    isErr = true;
    errors.push('Password must contain atleast one uppercase letter.');
  }
  if (search3 < 0) {
    isErr = true;
    errors.push('Password must contain atleast one number.');
  }
  if (search4 < 0) {
    isErr = true;
    errors.push('Password must contain atleast one special character.');
  }

  const s1 = (candidatePassword.match(/[a-z]/g) || []).length;
  const s2 = (candidatePassword.match(/[A-Z]/g) || []).length;
  const s3 = (candidatePassword.match(/[0-9]/g) || []).length;
  const s4 = (candidatePassword.match(/[@#$%^&]/g) || []).length;

  if (s1 + s2 + s3 + s4 !== length) {
    isErr = true;
    errors.push("Only ('@', '#', '$', '%', '^', '&') special characters allowed.");
  }

  const message = errors.join('\n');

  return [isErr, message];
};

export default validatePassword;
