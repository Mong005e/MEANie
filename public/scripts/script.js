var myApp=angular.module( 'myApp', [] );

myApp.controller( 'WhereMyPeeps', [ '$http', function( $http ){
  var vm = this;
  //add record function
  vm.addRecord = function(){
  var objectToSend ={
    name: vm.nameIn,
    location: vm.locationIn
  };//end objectToSend
  $http({
    method: 'POST',
    url: '/testPost',
    data: objectToSend
  });//end POST
  //empty fields
    vm.nameIn ='';
    vm.locationIn='';
  };// end addRecord

  vm.getRecords = function(){
    $.http({
      method: 'GET',
      url: '/getRecords',
    }).then( function( response ){
      vm.allTheRecords = response;
      console.log( vm.allTheRecords );
    }), function myError( response ){
      console.log( response.statusText );
    }); //end error
  };//end getRecords
}]);//end controller
