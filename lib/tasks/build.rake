task :build do
    # make sure to include a baseurl so we validate links even with
    # baseurl (which is github's case) 
    sh "bundle exec jekyll build --baseurl /gh-pages -d _site/gh-pages"
end
