// JS code for Saving the user Details on Crud Crud

  // Get the form and submit button elements
  const form = document.getElementById('my-form');
  const submitBtn = form.querySelector('.btn');
  const userList = document.getElementById('user-list');

  function handleEditButtonClick(email, name) {
      // Populate the input fields with the user's name and email
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      nameInput.value = name;
      emailInput.value = email;
  }

  // Add event listener to the form on submission
  form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent form submission and page reload

      // Get the input values
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');

      // Get the values entered by the user
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();

      // Check if the name and email are not empty
      if (name !== '' && email !== '') {
          // Create a user object with the input data
          const user = {
              name: name,
              email: email
          };

          // Convert the user object to a JSON string
          const userJSON = JSON.stringify(user);

          // Store the JSON string in the local storage
          //localStorage.setItem(email, userJSON);

          // saving user details on crud crud
          axios.post("https://crudcrud.com/api/538d1288ac4f419b9c1520f0b5f9db38/appointmentdata", user)
              .then((response) => {
                  console.log(response)
              })
              .catch((err) => {
                  console.log(err)
              })

          // Clear the form fields
          nameInput.value = '';
          emailInput.value = '';

          // Display user details
          const listItem = document.createElement('li');
          listItem.textContent = `Name: ${user.name}, Email: ${user.email}`;
          userList.appendChild(listItem);

          //Creating delete button
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.addEventListener('click', () => userList.removeChild(listItem) && localStorage.removeItem(email) );
          listItem.appendChild(deleteButton);

          //Creating edit button
          const editButton = document.createElement('button');
          editButton.textContent = 'Edit';
          editButton.addEventListener('click', () => userList.removeChild(listItem) && localStorage.removeItem(email) );
          editButton.addEventListener('click', () => handleEditButtonClick(email, user.name));
          listItem.appendChild(editButton);
      } else {
          // Display an error message if any field is empty
          const msgDiv = document.querySelector('.msg');
          msgDiv.innerHTML = 'Please enter both name and email.';
      }
  });