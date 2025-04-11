drop table if exists public.utilisateur  cascade ;
create table public.utilisateur (
id serial primary key,
nom varchar(30),
prenom varchar(30),
courriel varchar(255),
cle_api varchar(30),
password varchar(100)
);


drop  table if exists public.taches cascade;
create table public.taches (
id serial primary key,
utilisateur_id integer,
titre varchar(100),
description varchar(500),
date_debut Date,
date_echeance Date,
complete Bool,
foreign key (utilisateur_id) references public.utilisateur(id)
);

drop  table if exists public.sous_taches cascade ;
create table public.sous_taches (
id serial primary key,
tache_id integer,
titre varchar(100),
complete Bool,
foreign key (tache_id) references public.taches(id)
);

insert into public.utilisateur(nom, prenom, courriel, cle_api, password) values('provost','ludovic','1940381@gmail.com','12345ludo', SHA256('admin'));
