const { createValidator } = require('../validator/helper');

const schema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    'control-center:appstore': {
      type: 'boolean'
    },
    'application-menu:appstore': {
      type: 'boolean'
    },
    'application-menu:jobqueue': {
      type: 'boolean'
    },
    'control-center:password': {
      type: 'boolean'
    },
    'control-center:invitation': {
      type: 'boolean'
    },
    'application-menu:invitation': {
      type: 'boolean'
    },
    'header:user-notification': {
      type: 'boolean'
    },
    'header:fullscreen': {
      type: 'boolean'
    }
  },
  required: [
    'control-center:appstore',
    'application-menu:appstore',
    'application-menu:jobqueue',
    'control-center:password',
    'control-center:invitation',
    'application-menu:invitation',
    'header:user-notification',
    'header:fullscreen'
  ]
};

module.exports = {
  rights: {
    padmin: 'rw',
    admin: 'rw',
    user: 'r'
  },
  validator: createValidator(schema)
};
