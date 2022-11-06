const AccessControl = require('accesscontrol')
const ac = new AccessControl()

exports.roles = (function() {
    ac.grant("basic")
    .createOwn("request")
    .updateOwn("request")
    .deleteOwn("request")
    
    ac.grant("post")
    .extend("basic")
    .updateAny("request")

    ac.grant("admin")
    .extend("post")
    .deleteAny("request")

    return ac
})()