import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'eu-west-2_cuz8GIlYg',
  ClientId: '3gh7ll3fdvsq6nh642g06emka6',
};

export default new CognitoUserPool(poolData);
