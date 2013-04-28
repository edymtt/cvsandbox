use Rack::Static, 
  :urls => ["/img", "/js", "/css"],
  :root => "public",
  :index => 'index.html'

run Rack::File.new("public")



#

=begin
lambda { |env|
  [
    200, 
    {
      'Content-Type'  => 'text/html', 
      'Cache-Control' => 'public, max-age=86400' 
    },
    File.open('public/index.html', File::RDONLY)
  ]
}
=end