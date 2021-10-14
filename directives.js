crudTask.directive("headerMenu", function(){
    return{
        restrict: "E",
        templateUrl: "directives/headerMenu/headerMenu.html",
        replace: true, 
               scope: {
            goToList: "&",
            goToAdd: "&"
        }
    }
})

crudTask.directive("postForm", function(){
    return{
        restrict: "E",
        templateUrl: "directives/postForm/postForm.html",
        replace: true,
        scope: {
            heading: "=",
            submitPost: '&ngSubmit',
            postDetail: '=ngModel',
             names: "="
        }

    }
})

crudTask.directive("singlePost", function(){
    return{
        restrict: "E",
        templateUrl: "directives/singlePost/singlePost.html",
        replace: true,
        scope: {
            postInfo: "=",
           
        }
    }
})