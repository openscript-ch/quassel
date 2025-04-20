# @quassel/frontend

## 1.2.3

## 1.2.2

## 1.2.1

## 1.2.0

### Minor Changes

- 042fb21: Make frontend themeable

### Patch Changes

- Updated dependencies [042fb21]
  - @quassel/ui@1.2.0

## 1.1.1

## 1.1.0

### Minor Changes

- b199ecb: Allow clearing all entries from a questionnaire
- c6e6d4b: Allow creating entries for multiple days

### Patch Changes

- Updated dependencies [b199ecb]
  - @quassel/ui@1.1.0

## 1.0.2

## 1.0.1

### Patch Changes

- Updated dependencies [3bcba3b]
  - @quassel/ui@1.0.1

## 1.0.0

### Major Changes

- c67fa32: Release version 1

### Patch Changes

- Updated dependencies [c67fa32]
  - @quassel/ui@1.0.0
  - @quassel/utils@1.0.0

## 0.4.4

### Patch Changes

- 24a3be3: Improve calendering
- 4dc1f04: Upgrade dependencies
- a9cf000: Redesign data model. Allow assigning Participants to multiple studies.
- Updated dependencies [24a3be3]
- Updated dependencies [4dc1f04]
- Updated dependencies [a9cf000]
  - @quassel/utils@0.1.7
  - @quassel/ui@0.1.7

## 0.4.3

### Patch Changes

- cf77652: Allow sorting participants
- f1c6a2c: Upgrade dependencies
- 8e3eb10: Prevent user from deleting study which already is connected to any questionnaires
- 1143d5f: Fix validation if no carer is selected in Entry form
- 458ede5: Prevent dragging event over the calendar limits
- 730e7f2: Allow to drag select new events next to existing events
- 5025e5f: Upgrade dependencies
- f82bcd0: Fix always setting start date to start of month
- e2664f8: Fix prefilling participant form on edit
- Updated dependencies [f1c6a2c]
- Updated dependencies [5025e5f]
- Updated dependencies [f82bcd0]
  - @quassel/utils@0.1.6
  - @quassel/ui@0.1.6

## 0.4.2

## 0.4.1

## 0.4.0

### Minor Changes

- d626bef: Add all features from specification

### Patch Changes

- ec47e49: Redesign export UI
- 7455e38: Prevent non admin users from exporting a sql dump
- 774f40e: Consider weekly reccuring rule for gap detection
- 85bcbde: Allow manually updating weekday of entry
- 741682f: Add data protection concept
- 85bcbde: Allow creating entry from click on calendar header
- 7951b10: Display questionnaire title above calendar
- 4118457: Use playfull pattern for highlighting sleeping time
- 1c5058a: Upgrade dependencies
- 6bcb468: Fix period form initialization
- Updated dependencies [85bcbde]
- Updated dependencies [1c5058a]
- Updated dependencies [04d6993]
  - @quassel/ui@0.1.5
  - @quassel/utils@0.1.5

## 0.3.2

### Patch Changes

- ed3f052: Improve displaying dropdown options using maximal available space
- ac27d46: Fix error on redirecting to existing questionnaire
- 6342a7b: Prevent user from deleting themself
- Updated dependencies [ed3f052]
  - @quassel/ui@0.1.4

## 0.3.1

### Patch Changes

- 472ac90: Format birthday in administration
- 87e5025: Make dropdown scrollable
- b218bf4: Use contrast text color for calendar entries

## 0.3.0

### Minor Changes

- 665e8ab: Preparation for release meeting

### Patch Changes

- 0d78e14: Introduce questionnaire creation date
- c5eafeb: Logout at authentication expiration
- 7f2ebe1: Allow selecting templates when entering calendar entries
- dd3ce6b: Add global api error handling
- c9a6899: Introduce sorting and filtering for questionnaires
- bb9ff22: Export to CSV
- 21c218c: Reset update state when creating new entry
- e1253c1: Add favicons and manifest to frontend
- 4e11ff2: Add global error screen
- 3c28e6c: Highlight sleep time
- a01ca79: Fix check for undefined on weekday
- 7d1d6ba: Introduce fullscreen mode in questionnaire
- 9170f89: Don't allow to select the same language twice
- Updated dependencies [7f2ebe1]
- Updated dependencies [dd3ce6b]
- Updated dependencies [c9a6899]
- Updated dependencies [bb9ff22]
- Updated dependencies [e1253c1]
- Updated dependencies [4e11ff2]
  - @quassel/ui@0.1.3

## 0.2.4

### Patch Changes

- aebbeb8: Show more infos for questionnaires in admin
- af32a09: Make questionnaires editable from admin
- 8eeaf10: Fix preselecting start date when creating next period

## 0.2.3

### Patch Changes

- 3124f27: Enhance UX of calendar event handling
- 413c9f6: Add validation and highlighting for gaps in calendar
- b9af90b: Add export ui
- f29044f: Introduce color field per carer for calendar entries
- caa60ae: Add participant csv import
- 79fb73b: Rebrand quassel to LEMON
- 7e7f2c9: Disable delete for assistants
- b9af90b: Add content shell
- 53d5384: Improve questionnaire completion handling
- faf1343: Allow custom carers and languages per participant
- bed152e: Enhance content displayed on calendar entries
- 923f6c2: Introduce setting weeklyRecurring for entries
- Updated dependencies [b9af90b]
- Updated dependencies [f29044f]
- Updated dependencies [caa60ae]
- Updated dependencies [79fb73b]
- Updated dependencies [b9af90b]
- Updated dependencies [53d5384]
- Updated dependencies [faf1343]
- Updated dependencies [923f6c2]
  - @quassel/ui@0.1.2

## 0.2.2

### Patch Changes

- 61586af: Fix sed to set api url from environment variable

## 0.2.1

### Patch Changes

- 790a348: Fix docker healthcheck

## 0.2.0

### Minor Changes

- 2bd1751: Add database dump export

### Patch Changes

- f7a1b18: Upgrade dependencies
- 8a6746d: Add questionnaire management
- 80e0a6b: Improve nginx and env configuration
- 5a3dc47: Add studies management
- 0fb073f: Add participants management

## 0.1.3

### Patch Changes

- 0b71e9a: Tune for test server

## 0.1.2

### Patch Changes

- 9e8c60f: Update dependencies

## 0.1.1

### Patch Changes

- 0c9dff9: Fix container building
- Updated dependencies [0c9dff9]
  - @quassel/ui@0.1.1

## 0.1.0

### Minor Changes

- 4170393: Implement authentication and user management

### Patch Changes

- 1f7eddb: Administrator navigation
- f3427c6: Add authentication user interface
- 15dd08e: Add default values management ui
- Updated dependencies [1f7eddb]
- Updated dependencies [f3427c6]
- Updated dependencies [4170393]
  - @quassel/ui@0.1.0

## 0.0.28

### Patch Changes

- 6a25f49: Test auto deployment

## 0.0.27

### Patch Changes

- 4673935: Copy all files with directories

## 0.0.26

### Patch Changes

- 76b9b63: Enhance registries workflow

## 0.0.25

### Patch Changes

- 281b166: Set image base name

## 0.0.24

### Patch Changes

- ecffc6f: Fix publish workflow

## 0.0.23

### Patch Changes

- cc594cd: Fix publish workflow

## 0.0.22

### Patch Changes

- 2c1d2cb: Fix publish workflow

## 0.0.21

### Patch Changes

- bc67f4b: Rename images

## 0.0.20

### Patch Changes

- 4b87614: Add quassel ui
- Updated dependencies [4b87614]
  - @quassel/ui@0.0.20

## 0.0.19

### Patch Changes

- ced7c16: Fix workflow

## 0.0.18

### Patch Changes

- 21680db: Fix versioning tags

## 0.0.17

### Patch Changes

- 48c7ca1: Evaluate control characters

## 0.0.16

### Patch Changes

- c4488cc: Fix publish workflow

## 0.0.15

### Patch Changes

- c2cc6f0: Enhance image tagging

## 0.0.14

### Patch Changes

- 417e0bf: Set semver output tags

## 0.0.13

### Patch Changes

- 21d46af: Add input tags

## 0.0.12

### Patch Changes

- 949b05b: Set fallback globally

## 0.0.11

### Patch Changes

- 82b36b3: Fallback to local

## 0.0.10

### Patch Changes

- 3e8f372: Fix image tags

## 0.0.9

### Patch Changes

- 74e8066: Add github token

## 0.0.8

### Patch Changes

- 1e64cbe: Use matrix strategy to build images

## 0.0.7

### Patch Changes

- 81a6e75: Export version number

## 0.0.6

### Patch Changes

- 71a36e0: Fix nx config

## 0.0.5

### Patch Changes

- f47b7bc: Fix iterate published packages

## 0.0.4

### Patch Changes

- 4132193: Read published packages

## 0.0.3

### Patch Changes

- a1bdce1: Fix container target

## 0.0.2

### Patch Changes

- 8113ed9: Project setup

## 0.0.1

### Patch Changes

- c332ecb: Initialize project
