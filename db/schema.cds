namespace cap.azuread.luigi.ui5;

type Role : String enum {
    Employee;
    Manager;
}

entity Persons {
    key ID        : Integer;
        firstname : String;
        lastname  : String;
        email     : String;
        role      : Role;
        unit      : Association to Units;
}

entity Units {
    key ID   : Integer;
        name : String;
}
