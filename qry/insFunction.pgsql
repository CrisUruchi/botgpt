insert into function ("name", url, method, "responseType", "templateSource", "assistantId")
values ('get_weather', 'http://api.weatherstack.com/current?access_key=6bdec7dfc3d77a7c51986c4bc3bdd905&query={{location}}',
'GET', 'json',
'la temperatura es {{current.temperature}}, la velocidad del viento es de {{current.wind_speed}} km/h, direccion del viento es {{current.wind_dir}}, la probabilidad de lluvia es del {{current.precip}} por ciento', 1);

insert into function ("name", url, headers, method, "responseType", "templateSource", "assistantId")
values ('get_tipocambio', 'https://devapiservice.com/api/tipoCambio/unidad/{{location}}',
jsonb_build_object(
    'Authorization', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTQsInVzZXIiOiJtcnNvbmVscyIsImlhdCI6MTcyNzU3OTI1NiwiZXhwIjoxNzI3NTgyODU2fQ.Al1J895e4FvgTCa4jTtP7KEGwweGbh1KgD3YtDxJ6pfn2sgWwwgigg89g9dVZXYfJ48S4jRSuMB0U4naO5VfpuHKFDAraGsWvgQcSY-a_fM923f3DhJDfrGmeDs7jyrFFwRbYfJ8SjFpKIKC6dtw7SDRVQnY6BEw_D4Mg17yrg7dD0y0ilb6iwYMUUR_soGrHqKr59BzzGkhcLZMbSDoA7_bB5hCUtCqnZXCOy44Po2w-ErUNU5i93ecluPiRJxS2g90TLBZwFWEmqstfLqRFHso5RFeErFn5yg05vecghkzr6NaAk_XaWCsEu7mf7oMUiFBMo6f4teZk1QqWZusrw'
),
'GET', 'json','1Bs en {{data.unidad}} equivale a {{data.tc2}} o bien un {{data.unidad}} equivale a {{data.tc1}} Bolivianos', 1);