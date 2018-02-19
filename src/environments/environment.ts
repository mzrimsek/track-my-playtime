export interface Environment {
  production: boolean;
  platformsUrl: string;
}

export const environment: Environment = {
  production: false,
  platformsUrl: 'http://localhost:3000/platforms'
};
