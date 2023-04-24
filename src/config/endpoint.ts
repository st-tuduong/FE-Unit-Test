const RESOURCES = {
  auth: 'auth',
  user: ''
};

export const ENDPOINT = {
  auth: {
    index: `${RESOURCES.auth}`,
    login: `${RESOURCES.auth}/login`
  },
  user: {
    index: `${RESOURCES.user}/users`
  }
};
