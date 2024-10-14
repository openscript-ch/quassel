```mermaid
erDiagram
User {
    enum role
    string email
    string password
}


Participant {
    number id
}

Participant ||--o{ Questionnaire : participates

Study {
    number id
    string title
}

Study ||--o{ Questionnaire : belongs

Questionnaire {
    number id
    date startDate
    date endDate
    string description
    string remark
}

Questionnaire ||--o{ ExposureEntry : contains

ExposureEntry {
    string person
    enum weekday
    time start
    time end
    enum recurringRule
}

LanguageExposure {
    string language
    number ratio
}

ExposureEntry ||--|{ LanguageExposure : has


PersonValue {
    number id
    string name
}

LanguageValue {
    number id
    string name
}