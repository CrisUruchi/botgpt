
update function
set params = '', headers = jsonb_build_object(),
url = 'http://api.weatherstack.com/current?access_key=6bdec7dfc3d77a7c51986c4bc3bdd905&query={{location}}',
"templateSource" = 'la temperatura es {{current.temperature}}, la velocidad del viento es de {{current.wind_speed}} km/h, direccion del viento es {{current.wind_dir}}, la probabilidad de lluvia es de {{current.precip}} por ciento.'
where id = 1;

update function
set headers = jsonb_build_object(
    'Authorization', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTQsInVzZXIiOiJtcnNvbmVscyIsImlhdCI6MTcyNzcxMDMzMiwiZXhwIjoxNzI3NzEzOTMyfQ.DIaOr8cHFi-XURFuK-TERcWHFamCB9sAEmPXu8koUCh9yEDj4274jOM-nxi7P257bzn6tMyLUL1yE1DEiBAavR3gtVnIXCMKAQZNnU0Ges0VbYj2VjREPVsLxrBKk9FqCjCZ9ysZFtiZj3GaCylS2WXcgdunxj0j4pN9X6jvMk3viK6tRDsK_z2cTlypOy87gJF7dz-2f0f1BTVphrVF_uisPJ6pgtiaRJRzkm0wFHT3yiIouGD1kwaFRQ-d7JWeRxBgBO2QI-h-I5YY6xrBDRJUIrCa_hBo4b-W64eLva2egqDmpylglRFVr5SyVRKeNA_ztKvdxZaczuGSeIDBhg'
)
where id = 2