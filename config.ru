use Rack::Static, 
  :urls => ["/img", "/js", "/css", "/ttf"],
  :root => "public",
  :index => 'index.html',
  :header_rules => [ [['ttf'] , {'Content-Type' =>  'application/font-woff'}],
   [['appcache'] , {'Content-Type'  => 'text/cache-manifest', 
      'Cache-Control' => 'no-cache, private' }], 
      [['js'], {'Cache-Control' => 'no-cache, private'}]]

#

map '/' do
  run Rack::File.new("public")
end