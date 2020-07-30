const createPages = require("./create/createPages")

 exports.createPagesStatefully = async ({ graphql, actions }, options) => {
  await createPages({ actions, graphql }, options)
 }
 