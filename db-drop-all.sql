alter table token drop constraint if exists fk_token_user_id;
drop index if exists ix_token_user_id;

drop table if exists token;
drop sequence if exists token_seq;

drop table if exists user;
drop sequence if exists user_seq;

