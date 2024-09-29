
update function
set params = '', headers = '',
url = 'http://api.weatherstack.com/current?access_key=6bdec7dfc3d77a7c51986c4bc3bdd905&query={{location}}',
"templateSource" = 'la temperatura es {{current.temperature}}, la velocidad del viento es de {{current.wind_speed}} km/h, direccion del viento es {{current.wind_dir}}, la probabilidad de lluvia es de {{current.precip}} por ciento.'
where id = 1

