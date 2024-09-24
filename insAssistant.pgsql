insert into assistant (active, "isAutomatic", config, "type")
values(true, true, jsonb_build_object(
        'authorization', '',
        'assistantId', ''),'openai')