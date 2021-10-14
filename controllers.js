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
      // console.log("hi");
    };
    // $scope.users=[
    //   {name: "men"},
    //   {name: "sen"},
    //   {name: "o"}
    // ]
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
      $scope.postDetail = {};
      // console.log("submitted");
      var userID = formInputService.postDetail.userId.id;
      formInputService.postDetail.userId = userID;
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

    // $scope.get = async function () {
    //   await postApiService.getList();
    //   $scope.list = formInputService.posts;
    //   console.log($scope.list);
    //   console.log(formInputService.posts);
    // };
    $scope.deleteSinglePost = function(postId){
      postApiService.deletePost(postId);
    } 
    $http({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/posts",
    }).then(
      function successCallback(response) {
        $scope.list = response.data;
        // console.log(response.data);
        return response.data;
      },
      function errorCallback(response) {
        alert("Error. Try Again!");
      }
    );
  },
]);
