SITE_FILES = FileList['source']

task :default => [:devserver]

task :devserver => [:build_site] do |t|
   sh "rackup"
end

task :build_site => SITE_FILES do |t|
	sh "cd source; jekyll build"
end