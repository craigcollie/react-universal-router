function TinyError(message, args, stack) {
  this.name = 'TinyServer error';
  this.message = message || 'default.error';
  this.args = args;
  this.stack = stack || (new Error()).stack;
}

export default TinyError;
