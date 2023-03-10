$(() => {
  const $main = $("#main-content");

  window.views_manager = {};

  window.views_manager.show = function (item) {
    $loginForm.detach();
    $registerForm.detach();
    $updateProfile.detach();
    $viewResource.detach();
    $newResources.detach();
    $submissionForm.detach();
    $commentForm.detach();
    $newComments.detach();
    $topicFilters.detach();
    $newUserResourcesTitle.detach();
    $newUserResources.detach();
    $newUserLikesTitle.detach();
    $newUserLikes.detach();

    // Add other components to append to the main content (index.html)
    switch (item) {
      case "searchResources":
        $searchResources.appendTo($main);
        break;
      case "loginForm":
        $loginForm.appendTo($main);
        break;
      case "registerForm":
        $registerForm.appendTo($main);
        break;
      case "submissionForm":
        $submissionForm.appendTo($main);
        break;
      case "resources":
        $topicFilters.appendTo($main);
        $newResources.appendTo($main);
        break;
      case "updateProfile":
        $updateProfile.appendTo($main);
        break;
      case "resource":
        $viewResource.appendTo($main);
        $commentForm.appendTo($main);
        $newComments.appendTo($main);
        break;
      case "userResources":
        $newUserResourcesTitle.appendTo($main)
        $newUserResources.appendTo($main);
        $newUserLikesTitle.appendTo($main);
        $newUserLikes.appendTo($main);
       break;

    }
  };
});
