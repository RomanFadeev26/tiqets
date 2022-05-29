import { useEffect } from 'react';

/* I use WeakMap for struggle with memory leaks */
let listenerCallbacks = new WeakMap();

let observer: IntersectionObserver;

const  handleIntersections = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
        if (listenerCallbacks.has(entry.target)) {
            let cb = listenerCallbacks.get(entry.target);

            if (entry.isIntersecting || entry.intersectionRatio > 0) {
                observer.unobserve(entry.target);
                listenerCallbacks.delete(entry.target);
                cb();
            }
        }
    });
}

const getIntersectionObserver = () => {
    if (observer === undefined) {
        observer = new IntersectionObserver(handleIntersections, {
            rootMargin: '300px',
            threshold: 0.15
        });
    }
    return observer;
}

export const useIntersection = (elem: Element | null, callback: () => void) => {
    useEffect(() => {
        console.log(observer);
        if (elem) {
            let observer = getIntersectionObserver();
            listenerCallbacks.set(elem, callback);
            observer.observe(elem);

            return () => {
                listenerCallbacks.delete(elem);
                observer.unobserve(elem);
            };
        }
    }, [callback, elem]);
}
