$(() => {
  const $registerForm = $(`
    <div>
      <div class="error-message"></div>
      <h3>Register</h3>
      <h3>Please fill in fields</h3>
      <form action="/api/login/account" method="post" class="register">
          <label for="username">Username</label>
          <input type="text" name="username" class="username-form">
          <label for="email">Email</label>
          <input type="email" name="email" class="email-form">
          <label for="password">Password</label>
          <input type="password" name="password" class="password">
          <label for="confirm-password">Confirm Password</label>
          <input type="password" name="confirm-password" class="password-checker">
        <button type="submit" class="btn btn-info" id="register" disabled="disabled">Submit</button>
      </form>
    </div>
  `);
  window.$registerForm = $registerForm;
  $('.register').on('submit', () => {
    event.preventDefault();
    $.post("/api/login/account", {email : $('.email-form')[0].value, password : $('.password')[0].value, username: $('.username-form')[0].value})
      .done((response) => {
        if (response === "") {
          $(".error-message").empty();
          $(".error-message").append("<h1>Duplicate Email</h1>");
        } else {
        // this could be replaced with whatever function shows resources
          console.log("load something");
        }
      });
  });
  
  $('.register').on('keyup', () => {
    const firstPassword = $('.password')[0].value;
    const secondPassword = $('.password-checker')[0].value;
    if (firstPassword === secondPassword) {
      $(".error-message").empty();
    } else {
      $(".error-message").empty();
      $(".error-message").prepend("<h1>password doesn't match</h1>");
    }
    if (firstPassword === secondPassword && $('.email-form')[0].value && $('.username-form')[0].value) {
      $('#register').removeAttr('disabled');
    }
  });
});