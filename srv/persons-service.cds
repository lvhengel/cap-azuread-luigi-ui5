using {cap.azuread.luigi.ui5 as my} from '../db/schema';


service PersonsService {

    entity Units   as projection on my.Units;
    entity Persons as projection on my.Persons;

    //entity Units as projection on my.Units;

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
