function toggleConfigured(element, duration = 200) {
    return new Promise((resolve) => {
        element.classList.add('configured');
        setTimeout(() => {
            element.classList.remove('configured');
            resolve();
        }, duration);
    });
}

function toggleCanceled(element, duration = 200) {
    return new Promise((resolve) => {
        element.classList.add('canceled');
        setTimeout(() => {
            element.classList.remove('canceled');
            resolve();
        }, duration);
    });
}

export async function blink(elems, action) {
    if (action === 'cancel') {
        for (const elem of elems) {
            await toggleCanceled(elem);
        };
    } else {
        for (const elem of elems) {
            await toggleConfigured(elem);
        };
    };
}