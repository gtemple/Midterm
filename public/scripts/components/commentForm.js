$(() => {
  const $commentForm = $(`
    <form action="/api/comment" method="POST" class="card d-flex border-0 m-auto" style="width: 60rem;">
      <div class="card-body d-flex justify-content-start">
        <div class="error-message"></div>
          <label for="message">Comment</label>
        </div>
        <h4 id="login-error">You must sign in to comment</h4>
        <h1 id="empty-field-error">Please don't leave the comment blank</h1>
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

  const isloggedIn = () => {
    $.get("/login/loginStatus").then((res) => {
      if(!res.length) {
        showMessage("#login-error")
      }
      return
    });
  }

  const textFieldLength = () => {
    console.log('hi')
    if(!$('.comment-input').val()) {
      showMessage("#empty-field-error")
    }
    return
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

      //check if logged in
    isloggedIn()
    textFieldLength();

    $.post("/api/comments/submission", {info : { formData , resourceID }})
      .then((res) => {
        if (res === "") {
          console.log('error')
        } else {
          addNewestComment()
          $.get("/api/resources/user", (resources) => {
            addNewestComment(resources[0].name)
            $('.comment-input').empty().val('');
          })
        }
      });
  });


});
