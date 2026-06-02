CREATE TYPE registration_payment_status AS ENUM ('PENDING', 'PAID', 'FAILED', 'CANCELLED');

CREATE TYPE payment_transaction_status AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');

create table if not exists workshops(
    workshop_id bigint generated always as identity primary key,
    title varchar(128) not null,
    description text not null,
    cover_image_url text null,
    total_capacity int NOT NULL,
    registered_seats int DEFAULT 0,
    registration_start_at timestamp with time zone NOT NULL,
    registration_end_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null,
    deleted_at timestamp with time zone default null   
);

create table if not exists registrations(
    registration_id bigint generated always as identity primary key,
    user_id uuid not null, 
    workshop_id bigint not null,
    full_name varchar(255) not null,
    email varchar(100) not null,
    payment_status registration_payment_status not null,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null,
    deleted_at timestamp with time zone default null,
    
    constraint fk_workshop_id foreign key (workshop_id) references workshops(workshop_id)
);

create table if not exists payments(
    payment_id bigint generated always as identity primary key,
    registration_id bigint not null,
    amount numeric(12,2) not null,
    status payment_transaction_status not null,
    transaction_id varchar(255) not null unique,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null,
    
    constraint fk_registration_id foreign key (registration_id) references registrations(registration_id)
);
