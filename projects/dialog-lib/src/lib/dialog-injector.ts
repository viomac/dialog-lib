import {InjectFlags, InjectionToken, Injector, Type} from '@angular/core';

export class DialogInjector implements Injector {
  constructor(
    private parentInjector: Injector,
    private additionalTokens: WeakMap<any, any>
  ) {}

  // We also need a way to communicate with the dialog.
  // For example, we probably want to pass it some data.
  // There are many ways to achieve this.
  // One very elegant one, used by the angular material library,
  // is to pass a configuration object
  // via dependency injection to the dialog.

  get<T>(
    token: Type<T> | InjectionToken<T>,
    notFoundValue?: T,
    flags?: InjectFlags
  ): T;

  get(token: any, notFoundValue?: any): any;
  get(token: any, notFoundValue?: any, flags?: any): any {
    const value = this.additionalTokens.get(token);

    if (value) {
      return value;
    }

    return this.parentInjector.get<any>(token, notFoundValue);
  }
}
