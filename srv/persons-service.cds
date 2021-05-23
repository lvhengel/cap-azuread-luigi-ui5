using {cap.azuread.luigi.ui5 as my} from '../db/schema';

service PersonsService @(requires : 'authenticated-user') {
    entity Persons as projection on my.Persons

    type UserInfo {
        id        : Integer;
        email     : String;
        firstname : String;
        lastname  : String;
        role      : String;
        unit_ID   : Integer;
    }

    function userinfo() returns UserInfo
}
