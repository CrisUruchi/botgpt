insert into channel (code, service, config, name, "expiresIn")
values(
    'waapi',
    '/client/action/send-message',
    jsonb_build_object(
        'sendUrl', 'https://waapi.app/api/v1/instances/',
        'apiKey', 'jd2gJ4AOzhAfySCmsL9N8kVJFHprNXbKrYDL3d6B93b404f0',
        'service', '/client/action/send-message'
    ),
    'waapi',
    30
);

insert into channel (code, service, config, name, "expiresIn")
values(
    'web',
    'a',
    jsonb_build_object(
    ),
    'web',
    30
);