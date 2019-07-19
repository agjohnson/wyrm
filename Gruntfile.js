const sass = require('node-sass');

module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    open: {
      dev: {
        path: 'http://localhost:9898'
      }
    },

    connect: {
      server: {
        options: {
          port: 9898,
          base: 'docs',
          livereload: true
        }
      }
    },

    sass: {
      test: {
        options: {
          implementation: sass,
          includePaths: [
            'bower_components/bourbon/dist',
            'bower_components/neat/core',
            'bower_components/font-awesome/scss'
          ]
        },
        files: {
          'css/wyrm_test.css': 'sass/wyrm_test.sass'
        }
      }
    },

    copy: {
      fonts: {
        files: [
          // includes files within path
          {expand: true, flatten: true, src: ['bower_components/font-awesome/fonts/*'], dest: 'docs/fonts/', filter: 'isFile'}
        ]
      }
    },

    exec: {
      bower_update: {
        cmd: 'bower update'
      },
    },

    kss: {
      options: {
        verbose: true,
        css: 'css/wyrm_test.css',
        homepage: 'sass/styleguide.md'
      },
      dist: {
        src: ['sass/'],
        dest: 'docs/',
      }
    },

    watch: {
      build: {
        files: ['sass/**/*', 'bower_components/**/*.sass', 'docs_template/*.html'],
        tasks: ['sass','kss']
      },
      livereload: {
        files: ['docs/**/*'],
        options: { livereload: true }
      }
    },

    'gh-pages': {
      options: {
        base: 'docs'
      },
      src: ['**']
    },

    release: {
      options: {
        additionalFiles: ['bower.json']
      }
    }

  });

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-kss');

  grunt.registerTask('default', ['sass','kss','copy:fonts','connect','open','watch']);
  grunt.registerTask('test', ['sass']);
  grunt.loadNpmTasks('grunt-release');

}
