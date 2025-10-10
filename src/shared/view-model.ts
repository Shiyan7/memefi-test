import { createMutable } from 'solid-js/store';

export abstract class ViewModel {
  constructor() {
    return createMutable(this);
  }
}
