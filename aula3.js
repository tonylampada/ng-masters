(function(){
    if(!window.Global){
        window.Global = {};
    }
    if(!Global.angular_dependencies){
        Global.angular_dependencies = ['messages'];
    }
    var messages_app = angular.module('messages-app', Global.angular_dependencies);
    messages_app.controller('MessageController', ['$scope', 'MessagesService', function($scope, MessagesService){
        $scope.m = MessagesService;
        $scope.load = function(){
            MessagesService.showAlert('Loading...', {timeout: 3000});
        };
        $scope.error = function(){
            MessagesService.showPopup('Error', 'Page not found');
        }
    }]);
})();
