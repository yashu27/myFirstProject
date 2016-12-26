/**
 * Created by yasha on 12/25/2016.
 */
app.directive("countryDirective",function() {
    return{
        restrict:"A",
        template:`<div ng-controller="language">
    <div class="col-sm-6">
    <div id="scrollStyles" style="overflow-y:scroll;height:400px;">
    <table class="table table-bordered" style="border:1px solid black">
    <thead style="border:1px solid black">
    <tr style="border:1px solid black">
    <th style="border:1px solid black">COUNTRY CODE</th>
    <th style="border:1px solid black">COUNTRY NAME</th>
    <th style="border:1px solid black">COUNTRY DESCRIPTION</th>
</tr>
</thead>
<tbody style="border:1px solid black">
    <tr ng-repeat="c in countryData.rows" ng-class="{'highlight': c === rowEdit}" class="select" ng-click="clickRow(c);"
ng-style="style" style="border:1px solid black">
    <td style="border:1px solid black">{{c.country_pk | uppercase}}</td>
    <td style="border:1px solid black">{{c.country_name_uk | uppercase}}</td>
    <td style="border:1px solid black">{{c.country_desc | uppercase}}</td>
</tr>
</tbody>
</table>
</div>
<div style="text-align:center">
    <button type="submit" class="btn btn-info" ng-click="enableForm();">Add</button>
    <button type="submit" ng-disabled="eFeilds.modifyButton" class="btn btn-info" ng-click="editData(rowEdit);">Modify</button>
    <!-- <button type="submit" class="btn btn-default" ng-click="delete(sendData);">Delete</button>-->
    </div>
    </div>
    <div class="col-sm-6">
    <form nme="countryForm" class="form-horizontal" ng-disabled="true">
    <div class="form-group">
    <label class="control-label col-sm-4">COUNTRY CODE:</label>
<div class="col-sm-8">
    <input type="text" class="form-control textValidations" name="lcode" ng-disabled="eFeilds.formDisabled" ng-model="country.country_pk" ng-maxlength="3"
ng-minlength="3" placeholder="Enter Code" required>
    <span style="color:red;" ng-show="countryForm.lcode.$touched && countryForm.lcode.$invalid">Enter 3 letters</span>
    </div>
    </div>
    <div class="form-group">
    <label class="control-label col-sm-4">COUNTRY NAME:</label>
<div class="col-sm-8">
    <input type="text" class="form-control textValidations" ng-disabled="eFeilds.formDisabled" ng-model="country.country_name_uk"
placeholder="Enter Name" required>
    </div>
    </div>
    
    <div class="form-group">
    <label class="control-label col-sm-4">COUNTRY DESCRIPTION:</label>
<div class="col-sm-8">
    <input type="text" class="form-control textValidations" ng-disabled="eFeilds.formDisabled" ng-model="country.country_desc"
placeholder="Discription" required>
    </div>
    </div>
    <div class="form-group">
    <div class="col-sm-12" style="text-align:center;">
    <button type="submit" class="btn btn-info"  ng-show="showHideButton.showAddButton" ng-disabled="eFeilds.formDisabled "
ng-click="addNewLanguage();" required>Submit
    </button>
    <button type="submit" class="btn btn-info" ng-disabled="eFeilds.formDisabled" ng-show="showHideButton.showEditingButton"
ng-click="saveEditData();">Save
    </button>
    <button type="submit" class="btn btn-info" ng-disabled="eFeilds.formDisabled" ng-click="cancel();">Cancel</button>
    </div>
    </div>
    </form>
    </div>
    </div>`,
        scope:true
    }
})
    .controller('language', function ($scope,$http,$rootScope,$route){
        $rootScope.$on("languageClick", function languageClick() {
            $scope.eFeilds={formDisabled:true,modifyButton:true};
            $scope.sh.statesh = false;
            $scope.sh.countrysh = false;
            $scope.sh.languagesh = true;
            $scope.showHideButton = {showAddButton:true, showEditingButton: false};// show and hide, add button for the form.
            $scope.language = {language_pk: '', language_full_name_uk: ''}; //object for entering details in form
            $http.get("http://localhost:8081/listoftables/language_ntx")
                .then(function (response) {
                    $scope.languageData = response.data;
                });
            $scope.enableForm=function(){
                $scope.eFeilds={formDisabled:false,modifyButton:true};
            };
            $scope.addNewLanguage = function () { //addEditLanguage- event for adding new values in form
                if($scope.language !== "" || $scope.language !== "undefined") {
                    $http.post("http://localhost:8081/save/language_ntx", $scope.language)
                        .then(function (response) {
                            console.log("data posted." + response.status);
                        });
                    $scope.language = {language_pk: '', language_full_name_uk: ''};
                    $route.reload();
                }
                else{
                    alert("Please Enter Valid Details")
                    return;
                }
            };
            $scope.cancel=function(){
                $scope.language = {languageCode: '', languageName: ''};
                $scope.showHideButton.showAddButton=true;
                $scope.showHideButton.showEditingButton=false;
                $scope.rowEdit="";
                $route.reload();
            };
            $scope.saveEditData=function(){
                $http.post("http://localhost:8081/save/language_ntx",$scope.language)
                    .then(function (response) {
                        console.log("data saved." + response.status);
                    });
                $scope.showHideButton.showAddButton=true;
                $scope.showHideButton.showEditingButton=false;
                $scope.rowEdit="";
                $route.reload();
            };
            $scope.clickRow=function (row) {
                $scope.rowEdit=row;
                if($scope.rowEdit !== "" && $scope.rowEdit !== "undefined"){

                }
                $scope.eFeilds={formDisabled:false,modifyButton:false};
            };
            $scope.editData=function(getdata){
                $scope.language=getdata;
                $scope.showHideButton.showAddButton=false;
                $scope.showHideButton.showEditingButton=true;
            };
        })
    });