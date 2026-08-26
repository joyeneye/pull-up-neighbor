// Stub for @sanity/icons — codegen only needs names to resolve, not render.
const Icon = () => null;
module.exports = new Proxy({}, { get: () => Icon });
