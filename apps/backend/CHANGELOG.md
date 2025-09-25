# @quassel/backend

## 1.3.11

### Patch Changes

- de6d08c: Install tzdata in the backend image

## 1.3.10

### Patch Changes

- f585c08: Enforce utc timezone

## 1.3.9

### Patch Changes

- 6ec2d59: Revert timezone adjustments

## 1.3.8

### Patch Changes

- a3b1b4b: Enhance time zone handling

## 1.3.7

## 1.3.6

### Patch Changes

- 96ce7d9: Link localtime in backend

## 1.3.5

### Patch Changes

- d3d4687: Add timezone data to backend container

## 1.3.4

## 1.3.3

### Patch Changes

- b711ef0: Add max execution buffer size configuration
- Updated dependencies [b711ef0]
  - @quassel/utils@1.0.3

## 1.3.2

### Patch Changes

- 6540178: Filter by study id in questionnaires

## 1.3.1

### Patch Changes

- fa4ae49: Override fastify version for type compatibility
- Updated dependencies [293ee42]
  - @quassel/utils@1.0.2

## 1.3.0

### Minor Changes

- 3ee1b1b: Release 1.3

### Patch Changes

- 75f452a: Fix exporting by study
- 4df12c2: Fix searching questionnaire by study title
- 0415be2: Upgrade dependencies
- Updated dependencies [0415be2]
  - @quassel/utils@1.0.1

## 1.2.5

### Patch Changes

- 4818845: Clean up legacy problems

## 1.2.4

### Patch Changes

- b7dafff: Use sodium-native 4.2.0

## 1.2.3

### Patch Changes

- d60b6c9: Fix backend build

## 1.2.2

### Patch Changes

- 1158de5: Update Dockerfile

## 1.2.1

### Patch Changes

- 17b9e9d: Update sodium native

## 1.2.0

## 1.1.1

### Patch Changes

- 1780a8d: Fix creating language entries when creating for multiple days

## 1.1.0

### Minor Changes

- b199ecb: Allow clearing all entries from a questionnaire
- c6e6d4b: Allow creating entries for multiple days

## 1.0.2

### Patch Changes

- f23c46a: Allow assistants to delete entries

## 1.0.1

## 1.0.0

### Major Changes

- c67fa32: Release version 1

### Patch Changes

- Updated dependencies [c67fa32]
  - @quassel/utils@1.0.0

## 0.4.4

### Patch Changes

- 24a3be3: Improve calendering
- 4dc1f04: Upgrade dependencies
- a9cf000: Redesign data model. Allow assigning Participants to multiple studies.
- Updated dependencies [24a3be3]
  - @quassel/utils@0.1.7

## 0.4.3

### Patch Changes

- b5c8c73: Fix report csv if the amount of langugage varys between participants
- 30eae85: Fix selecting event in sleep time
- cf77652: Allow sorting participants
- f1c6a2c: Upgrade dependencies
- 8e3eb10: Prevent user from deleting study which already is connected to any questionnaires
- Updated dependencies [f1c6a2c]
- Updated dependencies [5025e5f]
- Updated dependencies [f82bcd0]
  - @quassel/utils@0.1.6

## 0.4.2

### Patch Changes

- be02d60: Upgrade dependencies

## 0.4.1

### Patch Changes

- 832e51b: Fix backend build

## 0.4.0

### Minor Changes

- d626bef: Add all features from specification

### Patch Changes

- 7455e38: Prevent non admin users from exporting a sql dump
- 741682f: Add data protection concept
- 1c5058a: Upgrade dependencies
- Updated dependencies [1c5058a]
  - @quassel/utils@0.1.5

## 0.3.2

### Patch Changes

- 165fa8a: Set cookie path to fix authentication problem
- 6342a7b: Prevent user from deleting themself

## 0.3.1

## 0.3.0

### Minor Changes

- 665e8ab: Preparation for release meeting

### Patch Changes

- 0d78e14: Introduce questionnaire creation date
- c5eafeb: Logout at authentication expiration
- 7f2ebe1: Allow selecting templates when entering calendar entries
- c9a6899: Introduce sorting and filtering for questionnaires
- bb9ff22: Export to CSV
- ebf8930: Sort languages and carers by usage
- 4a54dea: Improve response serialization

## 0.2.4

### Patch Changes

- aebbeb8: Show more infos for questionnaires in admin

## 0.2.3

### Patch Changes

- f29044f: Introduce color field per carer for calendar entries
- caa60ae: Add participant csv import
- 79fb73b: Rebrand quassel to LEMON
- 53d5384: Improve questionnaire completion handling
- faf1343: Allow custom carers and languages per participant

## 0.2.2

## 0.2.1

### Patch Changes

- 790a348: Fix docker healthcheck

## 0.2.0

### Minor Changes

- 2bd1751: Add database dump export

### Patch Changes

- 54319b1: Add healthchecks
- f7a1b18: Upgrade dependencies
- 97a319c: Add status endpoint
- 8a6746d: Add questionnaire management
- 5a3dc47: Add studies management
- 0fb073f: Add participants management
- c27dfac: Enhance host configuration

## 0.1.12

### Patch Changes

- 0b71e9a: Tune for test server

## 0.1.11

### Patch Changes

- e8853a2: Fix backend image

## 0.1.10

### Patch Changes

- 8742ed0: Override sodium-native version

## 0.1.10

### Patch Changes

- 4d6ae26: Enhance mikro orm config

## 0.1.9

### Patch Changes

- cab3ec3: Enhance docker image

## 0.1.8

### Patch Changes

- 4d8a118: Move mikro orm config

## 0.1.7

### Patch Changes

- 9e8c60f: Update dependencies

## 0.1.6

### Patch Changes

- 0e099ca: Downgrade sodium-native

## 0.1.5

### Patch Changes

- 2b1f3bf: Add Mikro ORM cli to production

## 0.1.4

### Patch Changes

- 544d8d6: Enforce sodium-native 4.2.0

## 0.1.3

### Patch Changes

- a433b31: Add gcompat to image

## 0.1.2

### Patch Changes

- 35d1ef0: Fix package.json path

## 0.1.1

### Patch Changes

- 0c9dff9: Fix container building

## 0.1.0

### Minor Changes

- 177c75c: Scaffold backend api
- 4170393: Implement authentication and user management

### Patch Changes

- d000f93: Add authentication and authorization
- 28f3ce0: Initialize model
- 887049a: Set up base schema

## 0.0.25

### Patch Changes

- 76b9b63: Enhance registries workflow

## 0.0.24

### Patch Changes

- 281b166: Set image base name

## 0.0.23

### Patch Changes

- ecffc6f: Fix publish workflow

## 0.0.22

### Patch Changes

- cc594cd: Fix publish workflow

## 0.0.21

### Patch Changes

- 2c1d2cb: Fix publish workflow

## 0.0.20

### Patch Changes

- bc67f4b: Rename images

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
