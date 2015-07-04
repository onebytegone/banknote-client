module.exports = function(grunt) {

   grunt.initConfig({
      project: {
         lib: {
            node: 'node_modules'
         },
         src: {
            root: '.',
            sass: '<%= project.src.root %>/sass',
            js: '<%= project.src.root %>/src'
         },
         dist: {
            root: 'dist',
            css: '<%= project.dist.root %>/css',
            js: '<%= project.dist.root %>/js'
         }
      },
      copy: {
         // Create .scss versions of npm package .css files
         cssToSass: {
            files: [
               {
                  expand: true,
                  cwd: '<%= project.lib.node %>',
                  src: ['**/*.css', '!**/*.min.css'],
                  dest: '<%= project.lib.node %>',
                  filter: 'isFile',
                  ext: '.scss'
               }
            ]
         }
      },
      sass: {
         dist: {
            options: {
               sourceMap: true,
               outputStyle: 'compressed',
               loadPath: [
                  '<%= project.lib.node %>',
                  '<%= project.src.root %>'
               ],
               trace: true,
               unixNewlines: true
            },
            files: [
               {
                  expand: true,
                  flatten: true,
                  cwd: '.',
                  src: ['<%= project.src.sass %>/main.scss', '<%= project.lib.node %>/bootstrap/dist/css/*.scss'],
                  dest: '<%= project.dist.css %>',
                  ext: '.css'
               }
            ]
         }
      },
      jshint: {
         files: ['Gruntfile.js', 'app.js', '<%= project.src.js %>/**/*.js'],
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
              '<%= project.dist.js %>/bundle.js' : [
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
               '<%= project.dist.js %>/bundle.map': ['<%= project.dist.js %>/bundle.js'],
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
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-browserify');
   grunt.loadNpmTasks('grunt-exorcise');
   grunt.loadNpmTasks('grunt-sass');

   grunt.registerTask('default', ['copy:cssToSass', 'sass:dist', 'jshint', 'browserify', 'exorcise']);

};
