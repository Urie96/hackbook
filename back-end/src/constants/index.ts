const ssoHost = process.env.SSO || 'https://sso.sweetlove.top';

export const JWT_SECRET = process.env.JWT_SECRET || 'abc';
export const SSO_VERIFYCODE = `${ssoHost}/verifycode`;
export const SSO_AUTH = `${ssoHost}/auth`;
