import {atom} from 'recoil';

export const citiesState = atom<number>({
    key: 'citiesState',
    default: 0
});
