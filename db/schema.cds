namespace cap.azuread.luigi.ui5;

type Role : String enum {
    Employee;
    Manager;
}

entity Persons {
    key ID        : UUID;
        firstname : String;
        lastname  : String;
        email     : String;
        role      : Role;
        unit      : Association to Units;
}

entity Units {
    key ID   : UUID;
        name : String;
        persons: Association to many Persons on persons.unit = $self
}