crudTask.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl: "pages/login/login.html",
      controller: "loginController",
    })
    .when("/home", {
      templateUrl: "pages/home/home.html",
      controller: "homeController",
    })
    .when("/add", {
      templateUrl: "pages/addPost/addPost.html",
      controller: "addController",
    })
    .when("/list", {
      templateUrl: "pages/postsList/postsList.html",
      controller: "listController",
    })
    .when("/edit", {
      templateUrl: "pages/editPost/editPost.html",
      controller: "editController",
    })
});