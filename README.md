# NodeJS and MySQL task

### Introduction

This is basic NodeJS task. The system with authorization for the group of friends to split bills.

## Setup

### Running the application

```bash
npm run
```

### Database

The application uses a MySQL database. Make sure, you have it installed locally.

## API documentation

### Endpoints

### Accounts

- `POST /accounts`: Create new account

### Registration/authorization

- `POST /register`: Create new user
- `POST /login`: Users login with auth

### Bills

- `GET /bills/group{id}`: Returns bills of group with specified id
- `POST /bills`: Creates new bill

### Groups

- `GET /groups`: Returns a list of all groups
- `POST /groups`: Creates new group
