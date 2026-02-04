export type Role = 'ROLE_USER' | 'ROLE_ADMIN';

export interface JwtPayload {
  sub: string;
  userId: number;
  roles: Role[];
  exp?: number;
  iat?: number;
}

export interface AuthTokens {
  accessToken: string;
}

