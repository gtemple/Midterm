$(() => {
  const $commentForm = $(`
    <form action="/api/comment" method="POST" class="card comment-form d-flex border-0 m-auto">
      <div class="card-body d-flex justify-content-start">
        <div class="error-message"></div>
          <label for="message"></label>
        </div>
        <h4 id="login-error">You must sign in to comment</h4>
        <p id="empty-field-error">Please don't leave the comment blank</p>
        <textarea type="text" name="message" class="message-form rows=3 comment-input"  placeholder="Leave a comment"></textarea>
        <div class="submit-btn d-flex justify-content-end">
          <button type="submit" class="btn btn-info m-2">Submit</button>
        </div>
      </div>
    </form>
  `);

  window.$commentForm = $commentForm;


  let commentPostresourceId;
  $(document).on("click", ".resource-card", function (event) {
    commentPostresourceId = $(this).attr("id");
  });

  const showMessage = (id) => {
    $(id).slideDown("fast", () => {});
  }
  const hideMessage = (id) => {
    $(id).slideUp("fast", () => {});
  }


  const textFieldLength = () => {
    if(!$('.comment-input').val()) {
      showMessage("#empty-field-error")
      return false;
    }
    return true
  }


  const addNewestComment = (user) => {
    const $commentText = $('.comment-input').val()
    const commentObj = {message: $commentText, user: user}
    const comment = window.comment.createCommentElement(commentObj)
    $('#comment-list').prepend($(comment))
    return comment
  }


  $commentForm.on('submit', function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
    const resourceID = commentPostresourceId;

      //input error handling
    // isloggedIn()
    const textValue = textFieldLength()
    if(!textValue) {
      return;
    }

    $.post("/api/comments/submission", {info : { formData , resourceID }})
      .then((res) => {
        if (res === "") {
          console.log('error')
          $('.comment-input').empty().val('')
        } else {
          $.get("/api/resources/user", (res) => {
            hideMessage("#empty-field-error")
            hideMessage("#login-error")
            addNewestComment(res.name)
            $('.comment-input').empty().val('');
          })
        }
      });
  });


});
