# Toga domain

This aims to clarify what is specific to the Toga project.

## Concepts

These are concepts specific to Toga.

| concept | description |
| ------- | ----------- |
| component, <br>Toga component | A front-end component, as it would be developed for Toga consumers. |
| consumer | A client requesting Toga components, eg. a static HTML page with a couple of `<script>` and `<link rel="stylesheet">` tags. |
| mount node id | The unique identifier for a component instance, used for client-side bootstrapping of components. Used to query the document for an element with a corresponding ID, prefixed with `comp-`. Example: `comp-myMountNodeId`. Two instances of the same component on the same page must not share a mount node id. |
| scope id | Identifies all components of a given type. Constructed from the SHA of a component's path. Can be used as a class name for eg. scoping CSS selectors to just one component type. Two instances of the same component on the same page must share a scope id. |
| components bundle | A bundle containing code of multiple components. |
| components vendor bundle | A bundle containing a set of shared 3rd party dependencies. |
| component context | Data to bootstrap a component with. Think of it as options rather than data. |
| Toga server | A server application exposing resources for consumers to include components. |
