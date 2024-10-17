import { Social, transformActions } from "@builddao/near-social-js";
import { NETWORK_ID, Wallet } from "./near";

export type Profile = {
  name: string;
  description: string;
  image: {
    url: string;
    ipfs_cid: string;
  };
  backgroundImage: {
    url: string;
    ipfs_cid: string;
  };
  linktree: Record<string, string>
};

export const SOCIAL_CONTRACT = {
  mainnet: "social.near",
  testnet: "v1.social08.testnet"
};

export const APP = {
  mainnet: "builddao.near",
  testnet: "builddao.testnet"
}

const social = new Social({
  contractId: SOCIAL_CONTRACT[NETWORK_ID],
  network: NETWORK_ID
});

export async function getProfile(username: string): Promise<Profile | null> {
  const response = await social.get({
    keys: [`${username}/profile/**`]
  });
  if (!response) {
    return null;
  }
  const { profile } = (response as Record<string, { profile: Profile }>)[
    username
  ];

  return profile;
}

export async function setProfile(wallet: Wallet, accountId: string, profileData: Profile, appData: any) {
  const account = await wallet.getAccount();
  const transaction = await social.set({
    account: {
      publicKey: account.publicKey,
      accountID: account.accountId,
    },
    data: {
      [accountId]: {
        profile: {

        },
        settings: {
          [APP[NETWORK_ID]]: {
            
          }
        }
      }
    }
  });
  
  // @ts-expect-error - whatever
  const transformedActions = transformActions(transaction.actions);

  await wallet.signAndSendTransaction({
    contractId: SOCIAL_CONTRACT[NETWORK_ID],
    actions: transformedActions,
  });
}