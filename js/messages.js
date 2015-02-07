angular.module('messages', []);
angular.module('messages').factory('MessagesService', ['$rootScope', function($rootScope){
    var messages = {
        alertVisible: false,
        alertMessage: ''
    };

    messages.showAlert = function(message, options){
        this.alertVisible = true;
        this.alertMessage = message;
        var self = this;
        setTimeout(function(){
            self.alertMessage = '';
            self.alertVisible = false;
            $rootScope.$digest();
        }, options.timeout);
    };
    messages.showPopup = function(messageType, message){
        this.title = messageType;
        this.content = message;
        $('#myModal').modal();
    };
    return messages;
}]);

angular.module('messages').directive('alert', function(){
    return {};
});

angular.module('messages').directive('messagePopup', function(){
   return {
       restrict: 'E',
       replace: true,
       templateUrl: 'aula3_templates/popup.html',
       controller: ['$scope', 'MessagesService', function($scope, MessagesService) {
           var m = $scope.m = MessagesService;
       }]
   }
});

angular.module('messages').directive('messageAlert', function(){
   return {
       restrict: 'E',
       replace: true,
       templateUrl: 'aula3_templates/alert.html',
       controller: ['$scope', 'MessagesService', function($scope, MessagesService) {
           var m = $scope.m = MessagesService;
       }]
   }
});
