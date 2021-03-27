# Unit 4 - Build Week

## Auth

**Demo Account**

```
username: lambda
password: lambda123
```

| Action          | Method | Route                | Required                      |
| --------------- | ------ | -------------------- | ----------------------------- |
| Register/Create | POST   | `/api/auth/register` | `{username, password, email}` |
| Login           | POST   | `/api/auth/login`    | `{username, password}`        |

**_Format To Send to DB_** - for registering

```javascript
{
  username: "string", required
  password: "string", required
  email: "string" required
}
```

## Users

| Action             | Method | Route            | Required                      |
| ------------------ | ------ | ---------------- | ----------------------------- |
| Read All Users     | GET    | `/api/users`     | `n/a `                        |
| Read Selected User | GET    | `/api/users/:id` | `n/a`                         |
| Edit User          | PUT    | `/api/users/:id` | `{username, password, email}` |
| Delete User        | DELETE | `/api/users/:id` | `n/a`                         |

**_Format To Send to DB_** - for updating

```javascript
{
  username: "string", required
  password: "string", required
  email: "string" required
}
```

## Recipes

| Action               | Method | Route              | Required                                                                   |
| -------------------- | ------ | ------------------ | -------------------------------------------------------------------------- |
| Read All Recipes     | GET    | `/api/recipes`     | `n/a`                                                                      |
| Read Selected Recipe | GET    | `/api/recipes/:id` | `n/a`                                                                      |
| Create Recipe        | POST   | `/api/recipes`     | `{recipe_title, recipe_ingredients, recipe_category, recipe_instructions}` |
| Update Recipe        | PUT    | `/api/recipes/:id` | `{recipe_title, recipe_ingredients, recipe_category, recipe_instructions}` |
| Delete Recipe        | DELETE | `/api/recipes/:id` | `n/a`                                                                      |

**_Format To Send to DB_** - for creating & updating

```javascript
{
  recipe_title: "string", required
  recipe_source: "string",
  recipe_ingredients: ["array"], required
  recipe_instructions: "string",
  recipe_category: ["array"], required
  recipe_photo_src: "string"
}
```
