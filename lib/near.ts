// near api js
import { providers } from "near-api-js";

// wallet selector
import { setupBitteWallet } from "@near-wallet-selector/bitte-wallet";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupModal } from "@near-wallet-selector/modal-ui";
import "@near-wallet-selector/modal-ui/styles.css";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { distinctUntilChanged, map } from "rxjs";

const THIRTY_TGAS = "30000000000000";
const NO_DEPOSIT = "0";

export const NETWORK_ID = "mainnet";
export class Wallet {
  /**
   * @constructor
   * @param {string} networkId - the network id to connect to
   * @param {string} createAccessKeyFor - the contract to create an access key for
   * @example
   * const wallet = new Wallet({ networkId: 'testnet', createAccessKeyFor: 'contractId' });
   * wallet.startUp((signedAccountId) => console.log(signedAccountId));
   */
  constructor({
    networkId = NETWORK_ID /*??*/,
    createAccessKeyFor = undefined
  }) {
    // @ts-expect-error - "property does not exist", ya whatever
    this.createAccessKeyFor = createAccessKeyFor;
    // @ts-expect-error - "property does not exist", ya whatever
    this.networkId = networkId;
  }

  /**
   * To be called when the website loads
   * @param {Function} accountChangeHook - a function that is called when the user signs in or out#
   * @returns {Promise<string>} - the accountId of the signed-in user
   */
  startUp = async (accountChangeHook) => {
    // @ts-expect-error - "property does not exist", ya whatever
    this.selector = setupWalletSelector({
      // @ts-expect-error - "property does not exist", ya whatever
      network: this.networkId,
      modules: [
        // @ts-expect-error - "property does not exist", ya whatever
        setupBitteWallet({
          walletUrl: NETWORK_ID as string === "mainnet" ? 'https://wallet.bitte.ai' : "https://testnet.wallet.bitte.ai",
          callbackUrl: window.location.href,
          // contractId: "yourcontract.near", // add if you want limited access keys to be generated
          deprecated: false,
        }),
        // @ts-expect-error - "property does not exist", ya whatever
        setupMyNearWallet(),
        setupHereWallet(),
        // @ts-expect-error - "property does not exist", ya whatever
        setupMeteorWallet(),
        // @ts-expect-error - "property does not exist", ya whatever
        setupSender()
      ]
    });

    // @ts-expect-error - "property does not exist", ya whatever
    const walletSelector = await this.selector;
    const isSignedIn = walletSelector.isSignedIn();
    const accountId = isSignedIn
      ? walletSelector.store.getState().accounts[0].accountId
      : "";

    const okx_account_id = localStorage.getItem("okx_account_id");
    if (okx_account_id) {
      accountChangeHook(okx_account_id);
    } else {
      walletSelector.store.observable
        .pipe(
          // @ts-expect-error - "property does not exist", ya whatever
          map((state) => state.accounts),
          distinctUntilChanged()
        )
        .subscribe((accounts) => {
          const signedAccount = accounts.find(
            (account) => account.active
          )?.accountId;
          accountChangeHook(signedAccount);
        });
    }

    return accountId;
  };

  /**
   * Displays a modal to login the user
   */
  signIn = async () => {
    // @ts-expect-error - "property does not exist", ya whatever
    const modal = setupModal(await this.selector, {
      // @ts-expect-error - "property does not exist", ya whatever
      contractId: this.createAccessKeyFor
    });
    modal.show();
  };

  /**
   * Logout the user
   */
  signOut = async () => {
    // @ts-expect-error - "property does not exist", ya whatever
    const selectedWallet = await (await this.selector).wallet();
    // remove okx localstorage var
    selectedWallet.signOut();
  };

  /**
   * Makes a read-only call to a contract
   * @param {string} contractId - the contract's account id
   * @param {string} method - the method to call
   * @param {Object} args - the arguments to pass to the method
   * @returns {Promise<JSON.value>} - the result of the method call
   */
  viewMethod = async ({ contractId, method, args = {} }) => {
    // @ts-expect-error - "property does not exist", ya whatever
    const walletSelector = await this.selector;
    const { network } = walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    const res = await provider.query({
      request_type: "call_function",
      account_id: contractId,
      method_name: method,
      args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
      finality: "optimistic"
    });
    // @ts-expect-error - "property does not exist", ya whatever
    return JSON.parse(Buffer.from(res.result).toString());
  };

  /**
   * Makes a call to a contract
   * @param {string} contractId - the contract's account id
   * @param {string} method - the method to call
   * @param {Object} args - the arguments to pass to the method
   * @param {string} gas - the amount of gas to use
   * @param {string} deposit - the amount of yoctoNEAR to deposit
   * @returns {Promise<Transaction>} - the resulting transaction
   */
  callMethod = async ({
    contractId,
    method,
    args = {},
    gas = THIRTY_TGAS,
    deposit = NO_DEPOSIT
  }) => {
    // Sign a transaction with the "FunctionCall" action
    // @ts-expect-error - "property does not exist", ya whatever
    const select = await this.selector;

    const selectedWallet = await select.wallet();

    if (!selectedWallet) {
      console.error("No wallet selected or wallet initialization failed");
      return;
    }

    let outcome;
    if (selectedWallet.id === "okx-wallet") {
      try {
        // @ts-expect-error - "property does not exist", ya whatever
        const response = await window.okxwallet.near.signAndSendTransaction({
          receiverId: contractId,
          actions: [
            {
              methodName: method,
              args,
              gas,
              deposit
            }
          ]
        });
        const sig = await this.getTransactionResult(response.txHash);
        return sig;
      } catch (e) {
        console.log("e", e);
      }
    } else {
      try {
        outcome = await selectedWallet.signAndSendTransaction({
          receiverId: contractId,
          actions: [
            {
              type: "FunctionCall",
              params: {
                methodName: method,
                args,
                gas,
                deposit
              }
            }
          ]
        });
      } catch (e) {
        console.log("e", e);
      }
    }

    return providers.getTransactionLastResult(outcome);
  };

  /**
   * Makes a call to a contract
   * @param {string} txhash - the transaction hash
   * @returns {Promise<JSON.value>} - the result of the transaction
   */
  getTransactionResult = async (txhash) => {
    // @ts-expect-error - "property does not exist", ya whatever
    const walletSelector = await this.selector;
    const { network } = walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    // Retrieve transaction result from the network
    const transaction = await provider.txStatus(txhash, "unnused");
    return providers.getTransactionLastResult(transaction);
  };

  /**
    * Converts wallet selector account to near-api-js Account object
    * @returns {Promise<Account>} - the resulting Account object
  */
  getAccount = async () => {
    // @ts-expect-error - "property does not exist", ya whatever
    const walletSelector = await this.selector;
    //const { network } = walletSelector.options;
    const accounts = walletSelector.store.getState().accounts;
    if (!accounts.length) throw new Error("No signed-in accounts found");

    return accounts[0];
  };

  signAndSendTransaction = async ({ contractId, actions }) => {
    // Sign a transaction with the "FunctionCall" action
    // @ts-expect-error whatever
    const selectedWallet = await (await this.selector).wallet();
    const outcome = await selectedWallet.signAndSendTransaction({
      receiverId: contractId,
      actions: actions,
    });
    return providers.getTransactionLastResult(outcome);
  };
}
