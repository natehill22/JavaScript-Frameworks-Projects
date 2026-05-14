//At root level, "this" references the module.exports object
this.id = 'exports';

const testerObj = {
  func1: function () {
    console.log('func1', this);
  },

  func2: () => {
    console.log('func2', this);
  },
};

testerObj.func1(); //"this" here is func1 (etc.) / the caller
testerObj.func2(); //"this" here is "exports" / the parent
