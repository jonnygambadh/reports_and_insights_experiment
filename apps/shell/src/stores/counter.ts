import { atom } from 'nanostores';

export const $counter = atom<number>(10);

export function add(value: number) {
  $counter.set(Number($counter.get()) + value);
}
