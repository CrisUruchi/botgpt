update channel set
config = jsonb_build_object(
        'sendUrl', 'https://waapi.app/api/v1/instances/',
        'apiKey', 'jd2gJ4AOzhAfySCmsL9N8kVJFHprNXbKrYDL3d6B93b404f0',
        'service', '/client/action/send-message'
    )
where id = 2;