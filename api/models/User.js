var User = {
    // Enforce model schema in the case of schemaless databases
    schema: true,

    attributes: {
        username: {type: 'string', unique: true},
        displayName: {type: 'string'},
        profileUrl: {type: 'string'},
        gender: {type: 'string'},
        isOnline: {type: 'boolean'},
        isAdmin: {type: 'boolean'},
        emails: {type: 'array'},
        email: {type: 'email', unique: true},
        passports: {collection: 'Passport', via: 'user'}
    }

};

module.exports = User;
