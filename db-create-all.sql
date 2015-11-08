create table token (
  id                            bigint not null,
  token                         uuid,
  user_id                       bigint,
  created                       timestamp,
  constraint pk_token primary key (id)
);
create sequence token_seq;

create table user (
  id                            bigint not null,
  email                         varchar(255),
  password_hash                 varchar(255),
  constraint pk_user primary key (id)
);
create sequence user_seq;

alter table token add constraint fk_token_user_id foreign key (user_id) references user (id) on delete restrict on update restrict;
create index ix_token_user_id on token (user_id);

