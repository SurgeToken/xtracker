export const Contracts = {
    SurgeBnb: {
        name: 'sBNB',
        address: "0xE1E1Aa58983F6b8eE8E4eCD206ceA6578F036c21",
        abi: import("./abi/SurgeToken.json"),
    },
    SurgeUsd: {
        name: 'sUSD',
        address: "0x14fEe7d23233AC941ADd278c123989b86eA7e1fF",
        abi: import("./abi/SurgeUSD.json"),
    },
    SurgeEth: {
        name: 'sETH',
        address: "0x5B1d1BBDCc432213F83b15214B93Dc24D31855Ef",
        abi: import("./abi/SurgeETH.json"),
    },
    SurgeBtc: {
        name: 'sBTC',
        address: "0xb68c9D9BD82BdF4EeEcB22CAa7F3Ab94393108a1",
        abi: import("./abi/SurgeToken.json"),
    },
    SurgeAda: {
        name: 'sADA',
        address: "0xbF6bB9b8004942DFb3C1cDE3Cb950AF78ab8A5AF",
        abi: import("./abi/SurgeToken.json"),
    },
    SurgeUseless: {
        name: 'sUSELESS',
        address: "0x2e62e57d1D36517D4b0F329490AC1b78139967C0",
        abi: import("./abi/SurgeToken.json"),
    }
};

/**
 * Get a list of all contracts
 * @returns {*[]}
 */
export function getAllContracts() {
    const contracts = [];

    for (const key of Object.keys(Contracts)) {
        contracts.push(Contracts[key]);
    }

    return contracts;
}

/**
 * Get a specific contract by his key
 * @return {name, address, abi}
 * */
export function getContractByName(key) {
    return Contracts[key];
}

/**
 * Get a specific contract by its address
 * @param address
 */
export function getContractByAddress(address) {
    for (const key of Object.keys(Contracts)) {
        if (Contracts[key].address === address) {
            return Contracts[key]
        }
    }
    return null
}
