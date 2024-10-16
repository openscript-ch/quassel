```mermaid
erDiagram
User {
    number id PK
    enum role "{ASSISTANT; ADMINISTRATOR}"
    string email
    string password
}


Participant {
    number id PK
    date birthdate "nullable"
}

Participant ||--o{ Questionnaire : participates

Study {
    number id PK
    string title
}

Study ||--o{ Questionnaire : belongs

Questionnaire {
    number id PK
    number study_id FK
    number participant_id FK
    string title "not null"
    date started_at
    date ended_at
    string remarks "nullable"
}

Questionnaire ||--o{ Entry : consists

Entry {
    number id PK
    number questionnaire_id FK
    number person_id FK
    time started_at
    time ended_at
    number(1) weekday "Sunday is 0 (like in JavaScript)"
    number(1) weeklyRecurring "default 1 (every week)"
}

EntryLanguage {
    number id PK
    number language_id FK
    number ratio "percent 0 to 1"
}

Entry ||--|{ EntryLanguage : has


Person {
    number id PK
    number participant_id FK "nullable (if this is an individually created person)"
    string name "not null"
}

Person ||--o{ Entry : has
Participant |o--o{ Person : has

Language {
    number id PK
    number participant_id FK "nullable (if this is an individually created language)"
    string name "not null"
    string iso693 "nullable"
}

Language ||--o{ EntryLanguage : has
Participant |o--o{ Language : has
