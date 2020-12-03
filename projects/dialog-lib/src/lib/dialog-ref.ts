import {Observable, Subject} from 'rxjs';

export class DialogRef {
  private afterClosed = new Subject<any>();
  readonly afterClosed$: Observable<any> = this.afterClosed.asObservable();

  constructor() {}

  close(result?: any): void {
    this.afterClosed.next(result);
  }
}
