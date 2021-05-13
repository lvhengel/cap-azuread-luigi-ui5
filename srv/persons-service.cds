using {cap.azuread.luigi.ui5 as my} from '../db/schema';

service PersonsService {
    entity Persons as projection on my.Persons
}
