require 'html-proofer'

task :test => [:build] do
    options = {
        :assume_extension => true,
        :disable_external => true,
        :allow_hash_href => true,
        :empty_alt_ignore => true,
    }

    HTMLProofer.check_directory("./_site", options).run
end
