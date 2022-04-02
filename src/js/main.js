import { secondModFunc1, secondModFunc2 } from './second-mod';
import { thirdModFunc1, thirdModFunc2 } from './third-mod';
import { getWorker, destroyWorker } from './workers/helpers';

export function initAppBeforeDeviceReady() {
    console.log('[CUSTOM LOG] app initialized before deviceready fires');
    secondModFunc1();
    thirdModFunc1();
}

export function initAppAfterDeviceReady() {
    console.log('[CUSTOM LOG] app initialized after deviceready fires');
    secondModFunc2();
    thirdModFunc2();
    document
        .querySelector('.init-bottom-sheet')
        .addEventListener('click', e => {
            const workerAndProxy = getWorker('first');
            Promise.all([
                new Promise(resolve => {
                    workerAndProxy[0]
                        .testWorker('first val')
                        .then(val => {
                            alert(`first normal test value: ${val}`);
                            resolve();
                        })
                        .catch(err => {
                            console.log(
                                `error for first test:`,
                                JSON.stringify(err)
                            );
                            alert(
                                `error for first test: ${JSON.stringify(err)}`
                            );
                            resolve();
                        });
                }),
                new Promise(resolve => {
                    workerAndProxy[0]
                        .testDayjs(Date.now() - Math.random() * 1000000000)
                        .then(val => {
                            alert(`dayjs compared values: ${val}`);
                            resolve();
                        })
                        .catch(err => {
                            console.log(
                                `error for second test:`,
                                JSON.stringify(err)
                            );
                            alert(
                                `error for second test: ${JSON.stringify(err)}`
                            );
                            resolve();
                        });
                }),
            ])
                .then(() => {
                    alert(`finished worker tests, destroying worker`);
                    destroyWorker(workerAndProxy);
                })
                .catch(err => {
                    alert(
                        `error from Promise.all test: ${JSON.stringify(err)}`
                    );
                    destroyWorker(workerAndProxy);
                });
        });
    document
        .querySelector('.destroy-bottom-sheet')
        .addEventListener('click', e => {
            import('./pages/test/index.js')
                .then(({ pageFunc }) => {
                    pageFunc('testing page func');
                })
                .catch(err => {
                    console.log(`error importing "test" page`, err);
                    alert(
                        `error importing "test" page: ${JSON.stringify(err)}`
                    );
                });
        });
}
