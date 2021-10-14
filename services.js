crudTask.service("formInputService", function () {
    this.userEmail = "";
    this.userPassword = "";
    this.postDetail = [];
    this.posts = []
  });

crudTask.service("postApiService", ["$http", "formInputService", function($http, formInputService){
    this.createPost = function(postData){
        $http({

            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/posts',
            data: postData
      
          }).then(function successCallback(response) {
            alert("Success, the post is created");
            formInputService.posts.push(response.data);
            console.log(formInputService.posts)
      
          }, function errorCallback(response) {
      
            alert("Error. while created post Try Again!");
      
          });
    }
    this.getList = function(){
      $http({
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/posts'
    
      }).then(function successCallback(response) {
    
        formInputService.posts = response.data;
        console.log(response.data)
        return response.data;
        
      }, function errorCallback(response) {
    
        alert("Error. Try Again!");
    
      });
    }
    this.deletePost = function(id){
      $http({

        method: 'DELETE',
        url: 'https://jsonplaceholder.typicode.com/posts/' + id
  
      }).then(function successCallback(response) {
  
        alert(`Post ${id} has deleted Successfully`);
        // var index = formInputService.posts.indexOf(user);
        // $scope.users.splice(index, 1);
  
      }, function errorCallback(response) {
  
        alert("Error. while deleting user Try Again!");
  
      });
    }
}])