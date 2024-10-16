import { Address, toNano } from '@ton/core';
import { SampleJetton } from '../wrappers/SampleJetton';
import { NetworkProvider } from '@ton/blueprint';
import { buildOnchainMetadata } from '../utils/jetton-helpers';

export async function run(provider: NetworkProvider) {
    /* -------------------------------------------------------------------------- */
    /*                           Start Edit your token Info                          */
    /* -------------------------------------------------------------------------- */

    const jettonParams = {
        name: 'Tecno Blocks',
        description: 'Official token of Tecno Blocks Company For https://TecnoBlocks.com/ For Youtube Channel',
        symbol: 'TBC',
        image: 'https://ardapps.com/wp-content/uploads/2024/10/Screenshot-2024-10-16-at-12.51.38 PM.png',
    };

    let totalSupply = 1000000000000000000n;

    /* -------------------------------------------------------------------------- */
    /*                           End Edit Your Token Info                          */
    /* -------------------------------------------------------------------------- */

    // Create content Cell
    let content = buildOnchainMetadata(jettonParams);

    const sampleJetton = provider.open(
        await SampleJetton.fromInit(provider.sender().address as Address, content, totalSupply),
    );

    await sampleJetton.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Mint',
            amount: totalSupply,
            receiver: provider.sender().address as Address,
        },
    );

    await provider.waitForDeploy(sampleJetton.address);

    // run methods on `sampleJetton`
}
