import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { ProviderBase, IInpageProviderConfig } from '@chargerwallet/cross-inpage-provider-core';
declare class ProviderAlgoBase extends ProviderBase {
    constructor(props: IInpageProviderConfig);
    protected readonly providerName = IInjectedProviderNames.algo;
    request<T>(data: unknown): Promise<T>;
}
export { ProviderAlgoBase };
