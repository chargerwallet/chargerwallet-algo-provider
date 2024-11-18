import { IInpageProviderConfig } from '@chargerwallet/cross-inpage-provider-core';
import { ProviderAlgoBase } from './ProviderAlgoBase';
import { AlgoProviderEventsMap, BaseHTTPClient, DisplayEncoding, EnableOpts, EnableResult, IProviderAlgo, PostTxnsResult, SignTxnsResult, TransactionResult, WalletTransaction } from './types';
declare class ProviderAlgo extends ProviderAlgoBase implements IProviderAlgo {
    readonly isExodus = true;
    readonly isChargerWallet = true;
    isConnected: boolean;
    address: string | null;
    constructor(props: IInpageProviderConfig);
    private _registerEvents;
    private _handleConnected;
    private _handleDisconnected;
    private _handleAccountChange;
    on<E extends keyof AlgoProviderEventsMap>(event: E, listener: AlgoProviderEventsMap[E]): this;
    off<E extends keyof AlgoProviderEventsMap>(event: E, listener: AlgoProviderEventsMap[E]): this;
    emit<E extends keyof AlgoProviderEventsMap>(event: E, ...args: Parameters<AlgoProviderEventsMap[E]>): boolean;
    enable(opts?: EnableOpts): Promise<EnableResult>;
    signTxns(transactions: WalletTransaction[]): Promise<SignTxnsResult>;
    postTxns(transactions: string[]): Promise<PostTxnsResult>;
    signAndPostTxns(transactions: WalletTransaction[]): Promise<PostTxnsResult>;
    getAlgodv2Client(): Promise<BaseHTTPClient>;
    getIndexerClient(): Promise<BaseHTTPClient>;
    connect(): Promise<{
        address: string;
    }>;
    disconnect(): Promise<void>;
    signAndSendTransaction(transactions: Uint8Array[]): Promise<TransactionResult>;
    signTransaction(transactions: Uint8Array[]): Promise<Uint8Array[]>;
    signMessage(encodedMessage: Uint8Array, display?: DisplayEncoding | undefined): Promise<{
        signature: Uint8Array;
        address: string;
    }>;
}
export { ProviderAlgo };
