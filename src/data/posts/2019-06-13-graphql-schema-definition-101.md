---
date_added: 2019-06-13T08:13:05-07:00
date_modified: 2019-06-13T08:13:05-07:00
layout: sidebar
tags:
  - code
  - graphql
title: GraphQL schema definition 101
published: true
categories:
  - Programming
---

import Wrapper from '~components/wrapper.jsx'

export default Wrapper

## Graphql schema 101

---

### Why might you need to define a graphql schema?

There are a few reasons this could happen:

- You could find a rest api you would like to wrap with a simpler interface
- you might want to add some custom data to query in your gatsbjs site
- you could just want to ensure your gatsby node field is using the correct data type
- blah blah blah

Lets look at a simple type to represent a customer

```graphql
type Customer {
  firstName: String!
  lastName: String!
  age: Int!
}
```

Here we are defining a `Customer` type

It has a first name, a last name (strings) and an age (an int). The exclamation points following the type names signify that the fields are required.

Simple enough, but things start to get more complex when you want to model something on our `Customer` that doesn't map to a primitive like a String or an Int, Like lets say we want to also have types for `Product` and `Order`.

```graphql
type Customer {
  ...
  orders: [Order]!
}

type Product {
  name: String!
}

type Order {
  products: [Product!]!
  customer: Customer!
}
```

So now we have a `Customer` and we can track their orders of given products.
