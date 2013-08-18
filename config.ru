use Rack::Static, 
  :urls => ["/img", "/js", "/css", "/ttf"],
  :root => "public",
  :index => 'index.html',
  :header_rules => [[['appcache'] , {'Content-Type'  => 'text/cache-manifest', 
      'Cache-Control' => 'no-cache, private' }], 
      [['js'], {'Cache-Control' => 'no-cache, private'}]]

#[:fonts , {'Content-Type' =>  'application/font-woff'}],

map '/' do
  run Rack::File.new("public")
end