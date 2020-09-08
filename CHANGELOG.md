# Change Log

Changelog for the @tunneljs/tunnel library
`This will be improoved soon to use a commit based tool`

# 1.1.5

Fixes crash on react-native with localstorage as default value

# 1.1.4

Adds documentation website with docusaurus and improoves the readme

# 1.1.3

Fixes the hydration issues while persitance are enabled for one store and not for the other.

# 1.1.1

Fixes performance issues on the code, by memoizing the state on the provider
Fixes bad `initialState` on the persistence storage as `{}` to be unset so the state can be initialized

# 1.1.0

Added new library to handle the event emission, the `fbemitter` made by @facebook. It improoves code performance and its a more understandable

# 1.0.2

Added some improovements to the code to be more cleaner moved store creator to storeEmitter file

# 1.0.0

Initial version for the code
