# ERD

Remarks:

- `weekday` is a number representing each day of a week. Like in Javascript sunday is 0, monday is 1 and so on.
- `Carer` and `Language` have a nullable relation with `Participant`. If a `Participant` is referenced then it's an individual `Carer` or `Language`.

```mermaid
erDiagram
User {
    SERIAL id PK
    ENUM role "ASSISTANT, ADMINISTRATOR NOT NULL DEFAULT ASSISTANT"
    VARCHAR(255) email "NOT NULL UNIQUE"
    VARCHAR(255) password "NOT NULL"
}

Participant {
    SERIAL id PK
    DATE birthdate
}

Participant ||--o{ Questionnaire : participates

Study {
    SERIAL id PK
    VARCHAR(255) title "NOT NULL"
}

StudyParticipant {
    SERIAL id PK
    SERIAL participant_id FK
    SERIAL study_id FK
}

Study ||--|{ StudyParticipant : belongs
Participant ||--|{ StudyParticipant : belongs

Questionnaire {
    SERIAL id PK
    SERIAL participant_id FK "NOT NULL"
    VARCHAR(255) title "NOT NULL"
    DATE started_at "NOT NULL"
    DATE ended_at "NOT NULL"
    DATE created_at "NOT NULL"
    DATE completed_at "NOT NULL"
    TEXT remark
}

Questionnaire ||--o{ Entry : consists

Entry {
    SERIAL id PK
    SERIAL questionnaire_id FK "NOT NULL"
    SERIAL carer_id FK "NOT NULL"
    TIME started_at "NOT NULL"
    TIME ended_at "NOT NULL"
    SMALLINT weekday "NOT NULL CHECK (weekday >= 0 AND weekday <= 6)"
    SMALLINT weekly_recurring "NOT NULL DEFAULT 1 CHECK (weekly_recurring >= 1)"
}

EntryLanguage {
    SERIAL id PK
    SERIAL language_id FK "NOT NULL"
    SERIAL entry_id FK "NOT NULL"
    SMALLINT ratio "NOT NULL CHECK (ratio >= 0 AND ratio <= 100)"
}

Entry ||--|{ EntryLanguage : has


Carer {
    SERIAL id PK
    SERIAL participant_id FK
    VARCHAR(255) name "NOT NULL UNIQUE"
    VARCHAR(255) color
}

Carer ||--o{ Entry : has
Participant |o--o{ Carer : has

Language {
    SERIAL id PK
    SERIAL participant_id FK
    VARCHAR(255) name "NOT NULL"
    VARCHAR(50) ietf_bcp_47
}

Language ||--o{ EntryLanguage : has
Participant |o--o{ Language : has
