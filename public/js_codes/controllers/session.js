wizerApp.controller('sessionController',
    function ($scope, $rootScope, $routeParams, $location, $window, $interval, AuthService, SessionService/*,socketIO*/) {

        console.log("Hello from sessionController");
        $scope.sessionID = "";
        $scope.sessionUserName = "Anon";
        $scope.loggedUser = {};
        $scope.isConnectedToSession = false;
        $scope.session = null;
        $scope.message = {type: "question", body: "", replyTo: ""};
        $scope.sessionMessages = [];

        $scope.firstConnectionTry = true;

        var ensureLogged = function () {
            if (!AuthService.isLoggedIn()) {
                $location.path('/');
            }
            else {
                $scope.loggedUser = $rootScope.loggedUser;
            }
        };

        ensureLogged();


        $scope.session = {};

        // SessionService.getSessionByID($routeParams.id)
        //     .then(function (data) {
        //         console.log("Looking for session " + $routeParams.id);
        //         $scope.profile = data;
        //         console.log(data);
        //     });


        $scope.connectSession = function () {
            console.log("SESSION ID = " + $scope.sessionID);
            SessionService.connectSession($scope.sessionID, $scope.sessionUserName)
                .then(function (data) {
                    $scope.session = data;
                    console.log("Connected to session as " + $scope.sessionUserName);// + JSON.stringify(data.session));
                    console.log("SESSION DATA = " + JSON.stringify(data));
                    io.connect();
                    if (data.session) {
                        $scope.isConnectedToSession = true;
                        $scope.session = data.session;
                        getting();
                    }
                    $scope.firstConnectionTry = false;
                })
                .catch(function (err) {
                    console.log("Error connection to session");
                    $scope.firstConnectionTry = false;
                });
        };

        $scope.sendMessage = function () {

            SessionService.sendMessage($scope.sessionID, $scope.message.type, [$scope.message.replyTo, $scope.message.body])
                .then(function (data) {
                    console.log("Sent message");
                    $scope.getMessages();
                    $scope.message = {type: "question", body: "", replyTo: ""};
                })
                .catch(function (err) {
                    console.log("Error with sending message");
                });
        };

        $scope.getMessages = function () {

            SessionService.getMessages($scope.sessionID)
                .then(function (data) {
                    // console.log(JSON.stringify(data));
                    var oldMessagesLength = $scope.sessionMessages.length;
                    $scope.sessionMessages = data.messages;
                    if (oldMessagesLength != $scope.sessionMessages.length) {
                        $("#msg-cnt").animate({scrollTop: 0}, 1000);
                    }

                    // console.log("My id: " + $rootScope.loggedUser._id + '');
                    // console.log("messages:" + JSON.stringify($scope.sessionMessages));

                    updateMessageClasses();

                })
                .catch(function (err) {
                    console.log("Error with getting messages");
                });

        };

        // $scope.getVideo = function () {
        //
        //     SessionService.getVideo("1234")
        //         .then(function (data) {
        //             console.log('\n\n\t\t\t'+JSON.stringify(data)+'\n\n');
        //         })
        //         .catch(function (err) {
        //             console.log("Error with getting video");
        //         });
        //
        // };
        // $scope.getVideo();

        $scope.getToken = function() {
            return $window.localStorage.getItem('token');
        };

        //damir!!!!
        // $scope.getSid = function() {
        //     return $window.localStorage.getItem('sid');
        // };

        $scope.disconnect = function () {

            SessionService.disconnect($scope.sessionID)
                .then(function(data) {
                    $scope.isConnectedToSession = false;
                    console.log(JSON.stringify(data));
                })
                .catch(function(err) {
                    console.log("Error with disconnecting from session");
                });

        };


        $scope.$on('$locationChangeStart', function( event ) {
            if ($scope.isConnectedToSession) {
                var answer = confirm("Are you sure you want to leave this page?");
                if (!answer) {
                    event.preventDefault();
                } else {
                    $scope.disconnect();
                }
            }
        });

        // $scope.$on("$destroy", function() {
        //     console.log("DISCONNECTING FROM SESSION");
        //     if($scope.isConnectedToSession) {
        //         $scope.isConnectedToSession = false;
        //         $scope.session = null;
        //         // $scope.disconnect();
        //     }
        // });
        //
        // $scope.$$applicationDestroyed("$destroy", function() {
        //     console.log("DISCONNECTING FROM SESSION");
        //     if($scope.isConnectedToSession) {
        //         $scope.isConnectedToSession = false;
        //         $scope.session = null;
        //         $scope.disconnect();
        //     }
        // });

        const getting = function () {
            $scope.getMessages();
        };


        $scope.typeChoose = function (type) {
            $('.msg-type-dropdown-header').text(type.charAt(0).toUpperCase() + type.slice(1));
            $scope.message.type = type;
        };

        $scope.rateMessage = function (sid, mid, rate) {
            SessionService.rateMessage(sid, mid, rate)
                .then(function (data) {
                    // console.log(JSON.stringify(data));
                    $scope.getMessages();
                })
                .catch(function (err) {
                    console.log("Error with getting messages");
                });
        };

        // $scope.assignReply = function(msg) {
        //     console.log("MSG TO REPLY:" + JSON.stringify(msg))
        //     $scope.message.replyTo = msg.type.charAt(0).toUpperCase() + msg.type.slice(1) + ': ' + msg.body[0]
        // };


        $scope.onTimeUpdate = function () {
            var currTime = $element[0].currentTime;
            if (currTime - $scope.videoCurrentTime > 0.5 ||
                $scope.videoCurrentTime - currTime > 0.5) {
                $element[0].currentTime = $scope.videoCurrentTime;
                console.log("CURRENT VIDEO TIME: " + $scope.videoCurrentTime);
            }
            $scope.$apply(function () {
                $scope.videoCurrentTime = $element[0].currentTime;
            });
        };



        const updateMessageClasses = function () {
            for (let i = 0; i < $scope.sessionMessages.length; ++i) {

                // console.log("message ratings:" + JSON.stringify($scope.sessionMessages[i].ratings));

                for (let j = 0; j < $scope.sessionMessages[i].ratings.length; ++j) {

                    if ($rootScope.loggedUser._id === $scope.sessionMessages[i].ratings[j].id) {

                        $('.msg-num-like-' + i).text("AAAAAAAAAAAAAAAAAAAAAAAA");
                        console.log("FOUND THE MESSAGE TO CHANGE");
                        // console.log("$scope.sessionMessages[i].ratings[j] = " + $scope.sessionMessages[i].ratings[j])
                        if ($scope.sessionMessages[i].ratings[j].val === '1') {
                            console.log("UPDATED " + '.msgNumLike' + i + " to active!");
                            $('.msg-num-like' + i).addClass('active');
                        }
                        if ($scope.sessionMessages[i].ratings[j].val === '0') {
                            console.log("UPDATED " + '.msgNumHate' + i + " to inactive!");
                            $('.msg-num-hate' + i).removeClass('active');

                            console.log("UPDATED " + '.msgNumLike' + i + " to inactive!");
                            $('.msg-num-like' + i).removeClass('active');
                        }
                        if ($scope.sessionMessages[i].ratings[j].val === '-1') {
                            console.log("UPDATED " + '.msgNumHate' + i + " to active!");
                            $('.msg-num-hate' + i).addClass('active');
                        }
                        break;
                    }
                }
            }
        };







        $interval(function () {
            if ($scope.isConnectedToSession) {
                // getting();
                updateMessageClasses();
            }
        }, 3000);

    });