// Stub for the `sanity` package during schema codegen. defineType/defineField
// are identity functions at runtime; we only need the plain objects.
const identity = (x) => x;
module.exports = new Proxy(
  { defineField: identity, defineType: identity, defineArrayMember: identity },
  { get: (target, prop) => (prop in target ? target[prop] : identity) }
);
