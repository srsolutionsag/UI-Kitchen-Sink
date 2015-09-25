'use strict';

module.exports = function(grunt) {
    grunt.registerMultiTask('startServerInfo', 'Info about server', function(){
        grunt.log.writeln('UI-Kitchen-Sink '+this.data.state+' at http://'+this.data.host+":"+this.data.port);
    });
};