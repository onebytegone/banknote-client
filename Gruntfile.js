module.exports = function(grunt) {

   grunt.initConfig({
      jshint: {
         files: ['Gruntfile.js', 'app.js', 'src/**/*.js'],
         options: {
            globals: {
               jQuery: true
            }
         }
      },
      browserify: {
         js: {
            options: {
               browserifyOptions: {
                  debug: true
               },
               alias: {
                  'config': './src/config.js'
               }
            },
            files: {
              'compiled/bundle.js' : [
                  'shim/marionette_shim.js',
                  'shim/backbone-super_shim.js',
                  'app.js'
               ]
            }
         }
      },
      exorcise: {
         bundle: {
            options: {},
            files: {
               'compiled/bundle.map': ['compiled/bundle.js'],
            }
         }
      },
      watch: {
         files: ['<%= jshint.files %>'],
         tasks: ['default']
      }
   });

   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-browserify');
   grunt.loadNpmTasks('grunt-exorcise');

   grunt.registerTask('default', ['jshint', 'browserify', 'exorcise']);

};
