// 7 - Semantic Versioning

/*

in package.json, ^ is called Caret character
Sementic Versioning or SemVer
has 3 components.
Eg: 4.13.6
Major.Minor.Parch
patch -  used for bug fixes.
minor - adding new feature that dont break the existing api. 4.13.6 to 4.14.0
major - adding features that can potentially break this version of api. 5.0.0

^ Caret tells it is interested in any version of the dependency as long as it is
within that major version. 

^4.13.6 or 4.x      <- Caret, minor changes and below
 ~1.18.3 or 1.8.x   <- Tilde, only new patch releases. 

*/
