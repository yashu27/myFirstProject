var app = angular.module('stateCode', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider.when('/tables/:id', {templateUrl: './tableData/tableDataTemplate.html', controller: 'StateCtrl'})
            .otherwise({
                redirectTo: '/'
            });
    });
    app.controller('StateCtrl', function ($scope, $routeParams, $http,$rootScope) {
        $scope.sh = {statesh: false, countrysh: false, languagesh: false};
        $scope.selectedName = $routeParams.id;
        /*$http.get("data.json")
         .then(function(response) {
         $scope.namesForCondition = response.data.row.tableName;
         });*/
        /*if($routeParams.id == "state_ntx"){
         stateClick();
         }
         else if($routeParams.id == "country_ntx"){
         countryClick();
         }*/

        //checking URL condition
        $http.get("http://localhost:8081/listoftables/meta_data_ntx")
            .then(function (response) {
                $scope.namesForCondition = response.data;
                var conditionCheck = response.data.rows;
                var checkActiveState = "";
                for (i = 0; i < conditionCheck.length; i++) {
                    checkActiveState = conditionCheck[i];
                    if ($routeParams.id == "STATES" && checkActiveState.table_desc == "STATES") {
                        stateClick();
                    }
                    else if ($routeParams.id == "COUNTRIES" && checkActiveState.table_desc == "COUNTRIES") {
                        countryClick();
                    }
                    else if ($routeParams.id == "LANGUAGES" && checkActiveState.table_desc == "LANGUAGES") {
                        /*languageClick();*/
                        $rootScope.$broadcast("languageClick");
                    }

                }
                ;
            });

        /*******************************start details start*******************************************/
        function stateClick() {
            $scope.sh.statesh = true;
            $scope.sh.countrysh = false;
            $scope.sh.languagesh = false;
            $scope.stateDetails = {statecode: "", statename: "", country: ""};
            $http.get("http://localhost:8081/listoftables/state_ntx")
                .then(function (response) {
                    $scope.stateData = response.data;
                });
            $scope.addStateDetails = function () {
                $http.put("http://localhost:8081/save/state_ntx", $scope.stateDetails)
                    .then(function (response) {
                        console.log("data posted")
                    });
            };
            $scope.addEditdata = function (editData) {
                $scope.sendDetails = editData;
                $http.post("http://localhost:8081/save/state_ntx", $scope.stateDetails)
                    .then(function (response) {
                        console.log("data posted")
                    });
            };

        }

        /*start details end*/
        /*country details strat**/
        function countryClick() {
            $scope.sh.statesh = false;
            $scope.sh.countrysh = true;
            $scope.sh.languagesh = false;
        };
        /*country details end*/
        /*language details strat**/


        /*language details end*/
    });
