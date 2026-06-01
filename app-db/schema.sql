create table if not exists workshops(
    workshop_id bigint generated always as identity primary key,
    title varchar(128) not null,
    description text not null,
    cover_image_url text null,
    total_capacity int NOT NULL,
    registered_seats int DEFAULT 0,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null,
    deleted_at timestamp with time zone default null   
)