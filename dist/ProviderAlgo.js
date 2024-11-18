var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ProviderAlgoBase } from './ProviderAlgoBase';
import { PROVIDER_EVENTS, } from './types';
import { isWalletEventMethodMatch } from './utils';
class ProviderAlgo extends ProviderAlgoBase {
    constructor(props) {
        super(props);
        this.isExodus = true;
        this.isChargerWallet = true;
        this.isConnected = false;
        this.address = null;
        this._registerEvents();
    }
    _registerEvents() {
        window.addEventListener('chargerwallet_bridge_disconnect', () => {
            this._handleDisconnected();
        });
        this.on(PROVIDER_EVENTS.message_low_level, (payload) => {
            const { method, params } = payload;
            if (isWalletEventMethodMatch(method, PROVIDER_EVENTS.accountChanged)) {
                this._handleAccountChange(params);
            }
        });
    }
    _handleConnected(connectInfo) {
        this.isConnected = true;
        this.address = connectInfo.address;
        this.emit(PROVIDER_EVENTS.connect, connectInfo);
        this.emit(PROVIDER_EVENTS.accountChanged, connectInfo.address);
    }
    _handleDisconnected(options = { emit: true }) {
        this.isConnected = false;
        this.address = null;
        if (options.emit && this.isConnectionStatusChanged('disconnected')) {
            this.emit(PROVIDER_EVENTS.disconnect);
            this.emit(PROVIDER_EVENTS.accountChanged, '');
        }
    }
    _handleAccountChange(address) {
        this.emit(PROVIDER_EVENTS.accountChanged, address);
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    off(event, listener) {
        return super.off(event, listener);
    }
    emit(event, ...args) {
        return super.emit(event, ...args);
    }
    enable(opts) {
        return this.request({ method: 'algo_enable', params: opts });
    }
    signTxns(transactions) {
        return this.request({ method: 'algo_signTxns', params: transactions });
    }
    postTxns(transactions) {
        return this.request({ method: 'algo_postTxns', params: transactions });
    }
    signAndPostTxns(transactions) {
        return this.request({ method: 'algo_signAndPostTxns', params: transactions });
    }
    getAlgodv2Client() {
        return this.request({ method: 'algo_getAlgodv2Client' });
    }
    getIndexerClient() {
        return this.request({ method: 'algo_getIndexerClient' });
    }
    // legacy
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const addresses = yield this.request({ method: 'algo_requestAccounts' });
            const address = addresses[0];
            this._handleConnected({ address });
            return { address };
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.request({ method: 'algo_disconnect' });
            this._handleDisconnected();
        });
    }
    signAndSendTransaction(transactions) {
        return this.request({
            method: 'algo_signAndSendTransaction',
            params: transactions,
        });
    }
    signTransaction(transactions) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.request({
                method: 'algo_signTransaction',
                params: transactions,
            });
            const rawTxs = result.split(',').map((tx) => Uint8Array.from(Buffer.from(tx, 'base64')));
            return rawTxs;
        });
    }
    signMessage(encodedMessage, display) {
        return this.request({
            method: 'algo_signMessage',
            params: { encodedMessage, display },
        });
    }
}
export { ProviderAlgo };
