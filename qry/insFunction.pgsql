insert into function ("name", url, method, "responseType", "templateSource", "assistantId")
values ('get_weather', 'http://api.weatherstack.com/current?access_key=6bdec7dfc3d77a7c51986c4bc3bdd905&query={{location}}',
'GET', 'json',
'la temperatura es {{current.temperature}}, la velocidad del viento es de {{current.wind_speed}} km/h, direccion del viento es {{current.wind_dir}}, la probabilidad de lluvia es del {{current.precip}} por ciento', 1);

insert into function ("name", url, headers, method, "responseType", "templateSource", "assistantId")
values ('get_tipocambio', 'https://devapiservice.com/api/tipoCambio/unidad/{{location}}',
jsonb_build_object(
    'Authorization', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTQsInVzZXIiOiJtcnNvbmVscyIsImlhdCI6MTcyNzcxMDMzMiwiZXhwIjoxNzI3NzEzOTMyfQ.DIaOr8cHFi-XURFuK-TERcWHFamCB9sAEmPXu8koUCh9yEDj4274jOM-nxi7P257bzn6tMyLUL1yE1DEiBAavR3gtVnIXCMKAQZNnU0Ges0VbYj2VjREPVsLxrBKk9FqCjCZ9ysZFtiZj3GaCylS2WXcgdunxj0j4pN9X6jvMk3viK6tRDsK_z2cTlypOy87gJF7dz-2f0f1BTVphrVF_uisPJ6pgtiaRJRzkm0wFHT3yiIouGD1kwaFRQ-d7JWeRxBgBO2QI-h-I5YY6xrBDRJUIrCa_hBo4b-W64eLva2egqDmpylglRFVr5SyVRKeNA_ztKvdxZaczuGSeIDBhg'
),
'GET', 'json','1Bs en {{data.unidad}} equivale a {{data.tc2}} o bien un {{data.unidad}} equivale a {{data.tc1}} Bolivianos', 1);

update function set headers = jsonb_build_object(
    'Authorization', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTQsInVzZXIiOiJtcnNvbmVscyIsImlhdCI6MTcyNzcxMDMzMiwiZXhwIjoxNzI3NzEzOTMyfQ.DIaOr8cHFi-XURFuK-TERcWHFamCB9sAEmPXu8koUCh9yEDj4274jOM-nxi7P257bzn6tMyLUL1yE1DEiBAavR3gtVnIXCMKAQZNnU0Ges0VbYj2VjREPVsLxrBKk9FqCjCZ9ysZFtiZj3GaCylS2WXcgdunxj0j4pN9X6jvMk3viK6tRDsK_z2cTlypOy87gJF7dz-2f0f1BTVphrVF_uisPJ6pgtiaRJRzkm0wFHT3yiIouGD1kwaFRQ-d7JWeRxBgBO2QI-h-I5YY6xrBDRJUIrCa_hBo4b-W64eLva2egqDmpylglRFVr5SyVRKeNA_ztKvdxZaczuGSeIDBhg'
)
where id = 2