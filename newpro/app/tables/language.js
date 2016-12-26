
app.directive("languageDirective",function() {
    return{
        restrict:"A",
        template:`<div ng-controller="language">
    <div class="col-sm-6">
    <div id="scrollStyles" style="overflow-y:scroll;height:400px;">
    <table class="table table-bordered" style="border:1px solid black">
    <thead style="border:1px solid black">
    <tr style="border:1px solid black">
    <th style="border:1px solid black">LANGUAGE CODE</th>
<th style="border:1px solid black">LANGUAGE NAME</th>
</tr>
</thead>
<tbody style="border:1px solid black">
    <tr ng-repeat="d in languageData.rows" ng-class="{'highlight': d === rowEdit}" class="select" ng-click="clickRow(d);"
ng-style="style" style="border:1px solid black">
    <td style="border:1px solid black">{{d.language_pk | uppercase}}</td>
<td style="border:1px solid black">{{d.language_full_name_uk | uppercase}}</td>
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
    <form name="langForm" class="form-horizontal" ng-disabled="true">
    <div class="form-group">
    <label class="control-label col-sm-4">LANGUAGE CODE:</label>
<div class="col-sm-8">
    <input type="text" class="form-control textValidations" name="lcode" ng-disabled="eFeilds.formDisabled" ng-model="language.language_pk" ng-maxlength="3"
ng-minlength="3" placeholder="Enter Code" required>
    <span style="color:red;" ng-show="langForm.lcode.$touched && langForm.lcode.$invalid">Enter 3 letters</span>
    </div>
    </div>
    <div class="form-group">
    <label class="control-label col-sm-4">LANGUAGE NAME:</label>
<div class="col-sm-8">
    <input type="text" class="form-control textValidations" ng-disabled="eFeilds.formDisabled" ng-model="language.language_full_name_uk"
placeholder="Enter Name" required>
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
                var show = $scope.sendExtra;
                $http.post("http://localhost:8081/edit/language_ntx",$scope.language)
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