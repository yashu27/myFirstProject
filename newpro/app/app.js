
angular
  .module('proApp', ['stateCode'])
  .controller("proAppController",function($scope,$http){
   /* $http({method:"GET", url:"http://localhost:8081/listoftables"})
      .then(function(response) {
          $scope.names = response.data;
      });
     $scope.newArray = [];
      $scope.newObject = "";
      var newname = "";*/
      $http.get("http://localhost:8081/listoftables/meta_data_ntx")
          .then(function (response) {
              $scope.names = response.data;
              /*var check_ntx = response.data.rows;
              for (i = 0; i < check_ntx.length; i++) {
                  check_ntx1 = check_ntx[i];
                  var seeTableName = check_ntx1.table_name;
                  var check_ntx2 = seeTableName.substr(seeTableName.length - 4);
                  if (check_ntx2 == "_ntx") {
                      $scope.newObject = seeTableName;
                      $scope.newArray.push({newname: $scope.newObject});
                  }
              }*/
          });
        /*$scope.selectedName= "Select Service";*/
      /*$scope.showSelectedName=function(selectedState){
          $scope.selectedName=selectedState.table_desc;
      }*/
  });
