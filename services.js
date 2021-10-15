crudTask.service("formInputService", function () {
    this.userEmail = "";
    this.userPassword = "";
    this.postDetail = [];
    this.posts = [];
    this.editablePost = [];
    this.users = [];
  });

crudTask.service("postApiService", ["$http", "formInputService", function($http, formInputService){
    this.createPost = function(postData){
        $http({

            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/posts',
            data: postData
      
          }).then(function successCallback(response) {
            alert("Success, the post is created");
            formInputService.posts[0].push(response.data);
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
        var list = formInputService.posts;
        console.log(response.data)
        return list;
        
      }, function errorCallback(response) {
    
        alert("Error. Try Again!");
    
      });
    }
    this.deletePost = function(post){
      $http({
        method: 'DELETE',
        url: 'https://jsonplaceholder.typicode.com/posts/' + post.id
  
      }).then(function successCallback(response) {
  
        alert(`Post ${post.id} has deleted Successfully`);
        var index = formInputService.posts[0].indexOf(post);
        formInputService.posts[0].splice(index, 1);
  
      }, function errorCallback(response) {
  
        alert("Error. while deleting user Try Again!");
  
      });
    }
    this.editPost = function(post){
      $http({
        method: 'PUT',
        url: 'https://jsonplaceholder.typicode.com/users/' + post.id,
        data: post
  
      }).then(function successCallback(response) {
  
        alert("User has updated Successfully")
  
      }, function errorCallback(response) {
  
        alert("Error. while updating user Try Again!");
  
      });
  
    };
}])