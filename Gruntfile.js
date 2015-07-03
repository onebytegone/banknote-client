module.exports = function(grunt) {

   grunt.initConfig({
      sass: {
         options: {
            sourceMap: true,
            outputStyle: 'compressed'
         },
         dist: {
            files: {
               'combined_files/css/styles.css': 'sass/main.scss'
            }
         }
      },
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
         files: ['<%= jshint.files %>', 'index.html'],
         tasks: ['default']
      }
   });

   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-browserify');
   grunt.loadNpmTasks('grunt-exorcise');
   grunt.loadNpmTasks('grunt-sass');

   grunt.registerTask('default', ['sass:dist', 'jshint', 'browserify', 'exorcise']);

};
