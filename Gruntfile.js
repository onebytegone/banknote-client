module.exports = function(grunt) {
   require('time-grunt')(grunt);
   require('jit-grunt')(grunt);

   grunt.initConfig({
      project: {
         lib: {
            node: 'node_modules'
         },
         src: {
            root: './src',
            sass: '<%= project.src.root %>/sass',
            js: '<%= project.src.root %>/js'
         },
         dist: {
            root: 'dist',
            css: '<%= project.dist.root %>/css',
            js: '<%= project.dist.root %>/js',
            fonts: '<%= project.dist.root %>/fonts'
         }
      },
      copy: {
         app: {
            files: [
               {
                  expand: true,
                  cwd: '<%= project.src.root %>',
                  src: [ 'index.html', 'demo.json'],
                  dest: '<%= project.dist.root %>',
                  filter: 'isFile'
               },
            ]
         },
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
         },
         // Copy font-awesome fonts
         fonts: {
            files: [
               {
                  expand: true,
                  cwd: '<%= project.lib.node %>/font-awesome/fonts',
                  src: '*',
                  dest: '<%= project.dist.fonts %>'
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
         files: ['Gruntfile.js', '<%= project.src.root %>/app.js', '<%= project.src.js %>/**/*.js'],
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
                  'config': '<%= project.src.js %>/config.js'
               }
            },
            files: {
              '<%= project.dist.js %>/bundle.js' : [
                  '<%= project.src.root %>/shim/marionette_shim.js',
                  '<%= project.src.root %>/shim/backbone-super_shim.js',
                  '<%= project.src.root %>/shim/bootstrap_shim.js',
                  '<%= project.src.root %>/app.js'
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
         files: ['<%= project.src.sass %>/**/*.scss', '<%= jshint.files %>', '<%= project.src.root %>/index.html'],
         tasks: ['default']
      }
   });

   grunt.registerTask('default', ['copy:app', 'sass:dist', 'newer:jshint', 'browserify', 'exorcise']);
   grunt.registerTask('build-all', ['newer:copy:cssToSass', 'newer:copy:fonts', 'default']);
};
