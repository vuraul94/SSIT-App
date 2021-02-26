const CONSTANTS = {
  API: {
    URL: "http://pertestingenv-001-site1.itempurl.com",
    TOKEN_EXP_TIME: 10,
  },
  REGEX:{
    PHONE: new RegExp(
      /^[+]?([(]{0,1}[0-9]{1,4}[)]){0,1}[-\s\./0-9]*$/
    ),
    EMAIL: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
  }
};

export { CONSTANTS };