crudTask.controller("loginController", [
  "$scope",
  "$http",
  "$location",
  "$window",
  "formInputService",
  function ($scope, $http, $location, $window, formInputService) {
    // $scope.formEmail = "fhjsf";
    // $scope.formPassword = formInputService.userPassword;
    $scope.$watch("formEmail", function () {
      formInputService.userEmail = $scope.formEmail;
      // console.log(formInputService.userEmail);
    });
    $scope.$watch("formPassword", function () {
      formInputService.userPassword = $scope.formPassword;
      // console.log(formInputService.userPassword);
    });
    $scope.submitForm = function () {
      var userToken =
        formInputService.userEmail + ":" + formInputService.userPassword;
      $window.localStorage.setItem("token", userToken);
      $location.path("/home");
    };
  },
]);

crudTask.controller("homeController", [
  "$scope",
  "$location",
  "formInputService",
  function ($scope, $location, formInputService) {
    $scope.name = formInputService.userEmail;
    $scope.goAddPage = function () {
      $location.path("/add");
      console.log("hi");
    };
    $scope.goListPage = function () {
      $location.path("/list");
      console.log("hi");
    };
  },
]);

crudTask.controller("addController", [
  "$scope",
  "$location",
  "$http",
  "formInputService",
  "postApiService",
  function ($scope, $location, $http, formInputService, postApiService) {
    $scope.postHeading = "ADD New Post";
    $scope.$watch("postDetail", function () {
      // $scope.postDetail.userId = $scope.postDetail.userId.id;
      // console.log($scope.postDetail.userId)
      formInputService.postDetail = $scope.postDetail;
      // console.log(formInputService.postDetail);
    });
    $scope.goListPage = function () {
      $location.path("/list");
    };
    $scope.btnName = "Save";
    $http({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/users",
    }).then(
      function successCallback(response) {
        $scope.users = response.data;
        // console.log(response.data);
        return response.data;
      },
      function errorCallback(response) {
        alert("Error. Try Again!");
      }
    );
    $scope.addPost = function () {
      postApiService.createPost(formInputService.postDetail);
      console.log($scope.postDetail);
      $scope.postDetail = {};
      // console.log("submitted");
      // var userID = formInputService.postDetail.userId.id;
      // formInputService.postDetail.userId = userID;
      $location.path("/list");
      // console.log(formInputService.postDetail);
    };
  },
]);

crudTask.controller("listController", [
  "$scope",
  "$location",
  "$http",
  "postApiService",
  "formInputService",
  function ($scope, $location, $http, postApiService, formInputService) {
    $scope.name = "list";
    $scope.goAddPage = function () {
      $location.path("/add");
      // console.log("hi");
    };
    $scope.goEditPage = function (post) {
      $location.path("/edit");
      formInputService.editablePost = post;
      // console.log("hi");
    };
    // $scope.list =  postApiService.getList();
    $scope.deleteSinglePost = function (post) {
      postApiService.deletePost(post);
    };
    // $scope.updateSinglePost = function(post){
    //   postApiService.editPost(post);
    // }
    $http({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/posts",
    }).then(
      function successCallback(response) {
        formInputService.posts.push(response.data);
        $scope.list = formInputService.posts[0];
        console.log(formInputService.posts);
        return response.data;
      },
      function errorCallback(response) {
        alert("Error. Try Again!");
      }
    );
  },
]);

crudTask.controller("editController", [
  "$scope",
  "$location",
  "$http",
  "postApiService",
  "formInputService",
  function ($scope, $location, $http, postApiService, formInputService) {
    $scope.postHeading = "Edit the post";
    $scope.goListPage = function () {
      $location.path("/list");
    };
    $scope.goAddPage = function () {
      $location.path("/add");
    };
    $scope.btnName = "Edit";

    $http({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/users",
    }).then(
      function successCallback(response) {
        $scope.users = response.data;
        formInputService.users = response.data;
        // console.log(response.data);
        return response.data;
      },
      function errorCallback(response) {
        alert("Error. Try Again!");
      }
    );
    $scope.$watch("postDetail", function () {
      $scope.postDetail = formInputService.editablePost;
      // var id = formInputService.editablePost.userId;
      // console.log(formInputService.users[id].name);
      formInputService.postDetail = $scope.postDetail;
      // $scope.postDetail.userId = formInputService.users[formInputService.editablePost.userId].name;
    });
    $scope.editSinglePost = function(){  
      postApiService.editPost(formInputService.postDetail);
      console.log(formInputService.postDetail.userId)
      var userID = formInputService.postDetail.userId.id;
      formInputService.postDetail.userId = userID;
      $location.path("/list");
    }
    $scope.deleteSinglePostInEdit = function(){
      postApiService.deletePost(formInputService.postDetail);
      $location.path("/list");
    }
  },
]);
