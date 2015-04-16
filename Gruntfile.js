module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({

		// Watch file modifications
		watch: {
			sass: {
				files: 'sass/**/*.{scss,sass}',
				tasks: ['sass'],
				options: {
					atBegin: true
				}
			},
			js: {
				files: ['js/main.js','js/plugins/**/*.js'],
				tasks: ['uglify'],
				options: {
					atBegin: true
				}
			}
		},

		// Compiles Sass to CSS and generates necessary files if requested
		sass: {
			options: {
				sourceMap: true,
				includePaths: ['bower_components'],
				outputStyle: 'compressed', // nested,compressed
				imagePath: '../images'
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'sass',
					src: ['*.{scss,sass}'],
					dest: 'css/',
					ext: '.css'
				}]
			}
		},

		// BrowserSync, launches local server
		browserSync: {
			dev: {
				bsFiles: {
					src : [
							'css/**/*.css',
							'js/**/*.js',
							'**/*.html',
					]
				},
				options: {
						watchTask: true,
						server: './'
				}
			}
		},

		// Handles minification
		uglify: {
		    my_target: {
		        files: {
		          'js/main.min.js': ['js/main.js','js/plugins/**/*.js']
		        }
		    }
		}

	});

	// Load npm tasks
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Grunt Launch Server
	grunt.registerTask('serve', ['browserSync', 'watch']);

	// Default task
	grunt.registerTask('default', ['sass','uglify']);
}