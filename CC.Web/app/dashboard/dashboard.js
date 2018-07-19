(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['common', 'datacontext', dashboard]);

    function dashboard(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;

        vm.myInterval = 5000;
        //vm.noWrapSlides = false;
        //vm.active = 0;
        //var slides = vm.slides = [];
        //var currIndex = 0;

        //vm.addSlide = function () {
        //    var newWidth = 600 + slides.length + 1;
        //    slides.push({
        //        image: 'http://placekitten.com/' + newWidth + '/300',
        //        text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' +
        //        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
        //    });
        //};

        //for (var i = 0; i < 4; i++) {
        //    vm.addSlide();
        //}

        //log("Slides", slides);
        
        vm.attendeeCount = 0;
        vm.speakerCount = 0;
        vm.sessionCount = 0;
        vm.content = {
            predicate: '',
            reverse: false,
            setSort: setContentSort,
            title: 'Content',
            tracks: []
        };
        vm.map = {
            title: 'Location'
        };
        vm.speakers = {
            interval: 5000,
            list: [],
            title: 'Top Speakers'
        };
        vm.news = {
            title: 'Code Camp',
            description: 'Code Camp is a community event where developers learn from fellow developers. All are welcome to attend and speak. Code Camp is free, by and for the deveoper community, and occurs on the weekends.'
        };
        vm.title = 'Dashboard';

        activate();

        function activate() {
            getTopSpeakers();
            var promises = [getAttendeeCount(), getSessionCount(), getSpeakerCount(), getTrackCounts()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Dashboard View'); });
        }

        function getAttendeeCount() {
            return datacontext.getAttendeeCount().then(function (data) {
                return vm.attendeeCount = data;
            });
        }

        function getSessionCount() {
            return datacontext.getSessionCount().then(function (data) {
                return vm.sessionCount = data;
            });
        }

        function getTrackCounts() {
            return datacontext.getTrackCounts().then(function (data) {
                return vm.content.tracks = data;
            });
        }


        function getTopSpeakers() {
            vm.speakers.list = datacontext.getSpeakersTopLocal();           
        }

        function getSpeakerCount() {
            var speakers = datacontext.getSpeakersLocal();
            vm.speakerCount = speakers.length;
        }

        function setContentSort(prop) {
            vm.content.predicate = prop;
            vm.content.reverse = !vm.content.reverse;
        }

    }
})();