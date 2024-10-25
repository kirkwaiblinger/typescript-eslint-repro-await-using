async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// not prevented by any lint rule.
export async function unhandledRejection1() {
    try {
        {
            const disposable: Disposable = {
                async [Symbol.dispose]() {
                    console.log('starting dispose');
                    await sleep(1000);
                    throw new Error('dispose error');
                }
            };

            await using _ = disposable
            console.log('before scope end')
        }
        console.log('after scope')
    } catch (e) {
        console.error("Prevented rejection due to:", e);
    }
    console.log('exiting function normally');
}

// prevented by no-misused-promise.
export async function unhandledRejection2() {
    try {
        {
            const disposable: Disposable = {
                // good; flagged by no-misused-promises.
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                [Symbol.dispose]: async () => {
                    console.log('starting dispose');
                    await sleep(1000);
                    throw new Error('dispose error');
                }
            };

            await using _ = disposable
            console.log('before scope end')
        }
        console.log('after scope')
    } catch (e) {
        console.error("Prevented rejection due to:", e);
    }
    console.log('exiting function normally');
}

// not prevented by any lint rule.
export async function unhandledRejection3() {
    try {
        {
             
            await using _ = {
                async [Symbol.dispose]() {
                    console.log('starting dispose');
                    await sleep(1000);
                    throw new Error('dispose error');
                }
            }
            console.log('before scope end')
        }
        console.log('after scope')
    } catch (e) {
        console.error("Prevented rejection due to:", e);
    }
    console.log('exiting function normally');
}

// prevented by TS
export async function unhandledRejection4() {
    try {
        {
            
            const asyncDisposable: AsyncDisposable = {
                // @ts-expect-error: good; flagged by TS.
                async [Symbol.dispose]() {
                    console.log('starting dispose');
                    await sleep(1000);
                    throw new Error('dispose error');
                }
            };
            await using _ = asyncDisposable
            console.log('before scope end')
        }
        console.log('after scope')
    } catch (e) {
        console.error("Prevented rejection due to:", e);
    }
    console.log('exiting function normally');
}

export async function properlyHandledRejection() {
    try {
        {
            await using _ = {
                async [Symbol.asyncDispose]() {
                    console.log('starting dispose');
                    await sleep(1000);
                    throw new Error('dispose error');
                }
            }
            console.log('before scope end')
        }
        console.log('after scope')
    } catch (e) {
        console.error("Prevented rejection due to:", e);
    }
    console.log('exiting function normally');
}

// replace with whatever you want to test.
await properlyHandledRejection();
console.log('exiting module normally');
