'use strict';

//const below lets you edit the home url in one place instead of inside each form. You can use as part of a path to change values
//This script works with index.html
const myApp = {
  baseUrl: 'http://tic-tac-toe.wdibos.com/',
};

// $(document).ready(() => {
// //create an account
//   $('#sign-up').on('submit', function(e) {
//     e.preventDefault();
//     var formData = new FormData(e.target);
//     $.ajax({
//       url: myApp.baseUrl + '/sign-up',
//       method: 'POST',
//       contentType: false,
//       processData: false,
//       data: formData,
//     }).done(function(data) {
//       console.log(data);
//     }).fail(function(jqxhr) {
//       console.error(jqxhr);
//     });
//   });
// // sign in
//   $('#sign-in').on('submit', function(e) {
//     e.preventDefault();
//     var formData = new FormData(e.target);
//     $.ajax({
//       url: myApp.baseUrl + '/sign-in',
//       method: 'POST',
//       contentType: false,
//       processData: false,
//       data: formData,
//     }).done(function(data) {
//       myApp.user = data.user;
//       console.log(data);
//     }).fail(function(jqxhr) {
//       console.error(jqxhr);
//     });
//   });
// //change pw
//   $('#change-password').on('submit', function(e) {
//     e.preventDefault();
//     console.log("begin change password");
//     if (!myApp.user) {
//       console.error('wrong');
//     }
//     var formData = new FormData(e.target);
//     $.ajax({
//       url: myApp.baseUrl + './change-password/' + myApp.user.id,
//       method: 'PATCH',
//       headers: {
//         Authorization: 'Token token=' + myApp.user.token,
//       },
//       contentType: false,
//       processData: false,
//       data: formData,
//     }).done(function(data) {
//
//       console.log('successfully changed password');
//     }).fail(function(jqxhr) {
//       console.error(jqxhr);
//     });
//   });
// //sign out - not yet working
//   $('#sign-out').on('submit', function(e) {
//     e.preventDefault();
//     if (!myApp.user) {
//       console.error('wrong');
//     }
//     var formData = new FormData(e.target);
//     $.ajax({
//       url: myApp.baseUrl + '/sign-out/' + myApp.user.id,
//       method: 'DELETE',
//       headers: {
//         Authorization: 'Token token=' + myApp.user.token,
//       },
//       contentType: false,
//       processData: false,
//       data: formData,
//     }).done(function(data) {
//
//       console.log('signed out');
//     }).fail(function(jqxhr) {
//       console.error(jqxhr);
//     });
//   });
//
// });


module.exports = true;
