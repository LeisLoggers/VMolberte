function toggleHovered(element, duration = 200) {
    return new Promise((resolve) => {
        element.classList.add('hovered');
        setTimeout(() => {
            element.classList.remove('hovered');
            resolve();
        }, duration);
    });
}

export async function blink(elems) {
    for (const elem of elems) {
        await toggleHovered(elem);
    }
}