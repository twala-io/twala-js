/* tslint:disable:max-classes-per-file */

import GeneratorHelper from './Helpers/GeneratorHelper';
import CryptoHelper from './Helpers/CryptoHelper';
type Options = {
  apiVersion: string;
  maxNetworkRetries: number;
  timeout: number;
};

export default class Twala {
  protected appUuid: string;
  protected appSecret: string;
  protected options: Options = {
    apiVersion: 'v1',
    maxNetworkRetries: 0,
    timeout: 10000,
  };

  constructor(appUuid: string, appSecret: string, options?: Options) {
    this.appUuid = appUuid;
    this.appSecret = appSecret;
    if (options) {
      this.options = options;
    }
  }

  // utils
  public utils = new (class {
    public generatorHelper = new GeneratorHelper();
    public cryptoHelper = new CryptoHelper();

    public generateNonce() {
      const nonce = this.generatorHelper.generateNonce();
      return nonce;
    }

    public generateWebhookSignature(stringifiedRequestBody: string, webhookSecret: string) {
      const signature = this.cryptoHelper.signDataHMAC(stringifiedRequestBody, webhookSecret);
      return signature;
    }

    public verifyWebhookSignatures(headerSignature: string, webhookSignature: string) {
      const isVerified = this.cryptoHelper.verifySignatures(headerSignature, webhookSignature);
      return isVerified;
    }
  })();
}
