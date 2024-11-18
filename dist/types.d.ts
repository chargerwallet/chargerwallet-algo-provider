import { IJsonRpcRequest } from '@chargerwallet/cross-inpage-provider-types';
export interface EnableNetworkOpts {
    genesisID?: string;
    genesisHash?: string;
}
export interface EnableAccountsOpts {
    accounts?: string[];
}
export type EnableOpts = EnableNetworkOpts & EnableAccountsOpts;
export interface EnableNetworkResult {
    genesisID: string;
    genesisHash: string;
}
export interface EnableAccountsResult {
    accounts: string[];
}
export type EnableResult = EnableNetworkResult & EnableAccountsResult;
export type SignTxnsResult = (string | null)[];
export interface WalletTransaction {
    txn: string;
    authAddr?: string;
    signers?: string[];
    stxn?: string;
}
export interface PostTxnsResult {
    txnIDs: string[];
}
export type Query<F> = {
    format?: F;
    [key: string]: any;
};
export interface BaseHTTPClientResponse {
    body: Uint8Array;
    status: number;
    headers: Record<string, string>;
}
export interface BaseHTTPClientError {
    response: BaseHTTPClientResponse;
}
export interface BaseHTTPClient {
    get(relativePath: string, query?: Query<string>, requestHeaders?: Record<string, string>): Promise<BaseHTTPClientResponse>;
    post(relativePath: string, data: Uint8Array, query?: Query<string>, requestHeaders?: Record<string, string>): Promise<BaseHTTPClientResponse>;
    delete(relativePath: string, data: Uint8Array, query?: Query<string>, requestHeaders?: Record<string, string>): Promise<BaseHTTPClientResponse>;
}
interface ConnectionOptions {
    onlyIfTrusted?: boolean;
}
export type ConnectInfo = {
    address: string;
};
export interface TransactionResult {
    txId: string;
}
export type DisplayEncoding = 'utf8' | 'hex';
export interface IProviderAlgo {
    isConnected: boolean;
    isExodus: boolean;
    isChargerWallet: boolean;
    address: string | null;
    enable(opts?: EnableOpts): Promise<EnableResult>;
    signTxns(transactions: WalletTransaction[]): Promise<SignTxnsResult>;
    postTxns(transactions: string[]): Promise<PostTxnsResult>;
    signAndPostTxns(transactions: WalletTransaction[]): Promise<PostTxnsResult>;
    getAlgodv2Client(): Promise<BaseHTTPClient>;
    getIndexerClient(): Promise<BaseHTTPClient>;
    connect(options?: ConnectionOptions): Promise<ConnectInfo>;
    disconnect(): void;
    signAndSendTransaction(transactions: Uint8Array[]): Promise<TransactionResult>;
    signTransaction(transactions: Uint8Array[]): Promise<Uint8Array[]>;
    signMessage(encodedMessage: Uint8Array, display?: DisplayEncoding): Promise<{
        signature: Uint8Array;
        address: string;
    }>;
}
export declare const PROVIDER_EVENTS: {
    readonly connect: "connect";
    readonly disconnect: "disconnect";
    readonly accountChanged: "accountChanged";
    readonly message_low_level: "message_low_level";
};
export type AlgoProviderEventsMap = {
    [PROVIDER_EVENTS.connect]: (connectInfo: ConnectInfo) => void;
    [PROVIDER_EVENTS.disconnect]: () => void;
    [PROVIDER_EVENTS.accountChanged]: (address: string) => void;
    [PROVIDER_EVENTS.message_low_level]: (payload: IJsonRpcRequest) => void;
};
export {};
