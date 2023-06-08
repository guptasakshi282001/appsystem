function Validation(values){
    let error = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =  /^.{6,}$/;

    if (values.name === '') {
      error.name = 'Name should not be empty';
    }

    if (values.email === '') {
      error.email = 'Email should not be empty';
    } else if (!emailPattern.test(values.email)) {
      error.email = 'Invalid email format';
    }

    if (values.password === '') {
      error.password = 'Password should not be empty';
    } else if (!passwordPattern.test(values.password)) {
      error.password =
        'Password should contain at least 8 characters including one uppercase letter, one lowercase letter, and one digit';
    }

    return error;
  };

export default Validation;