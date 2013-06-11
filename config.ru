use Rack::Static, 
  :urls => ["/img", "/js", "/css", "/ttf"],
  :root => "public",
  :index => 'index.html'

map '/cv.appcache' do
  run lambda { |env|
  [
    200, 
    {
      'Content-Type'  => 'text/cache-manifest', 
      'Cache-Control' => 'no-cache, private' 
    },
    File.open('public/cv.appcache', File::RDONLY)
  ]
}
end

map '/' do
  run Rack::File.new("public")
end