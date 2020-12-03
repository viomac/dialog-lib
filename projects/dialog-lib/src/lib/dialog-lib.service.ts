import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type} from '@angular/core';
import {DialogLibConfig} from './dialog-lib.config';
import {DialogRef} from './dialog-ref';
import {DialogLibComponent} from './dialog-lib.component';
import {DialogInjector} from './dialog-injector';

@Injectable({
  providedIn: 'root'
})
export class DialogLibService {
  dialogComponentRef: ComponentRef<DialogLibComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  appendDialogComponentToBody(config: DialogLibConfig): DialogRef {
    // Create a map with the config
    const map = new WeakMap();
    map.set(DialogLibConfig, config);

    // Add the DialogRef to dependency injection
    const dialogRef = new DialogRef();
    map.set(DialogRef, dialogRef);

    // we want to know when somebody called the close method
    const sub = dialogRef.afterClosed$.subscribe(() => {
      // close the dialog
      this.removeDialogComponentFromBody();
      sub.unsubscribe();
    });

    // To get the factory of our DialogComponent we can use
    // the ComponentFactoryResolver provided by angular.
    // This service is using the type of the component to look up the factory.
    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(DialogLibComponent);

    // Once we have the factory, we can use it to create
    // an instance of our DialogComponent.
    // We are passing in the injector we requested
    // in the constructor. This enables the dynamic component
    // to make use of dependency injection itself.
    // const componentRef = componentFactory.create(this.injector);
    // --- use our new injector
    const componentRef = componentFactory.create(new DialogInjector(this.injector, map));

    // Afterward, we need to attach the new component to
    // the angular component tree (which is separate from the DOM).
    // We do so by using the ApplicationRef we requested.
    this.appRef.attachView(componentRef.hostView);

    // We get the root DOM-element of our DialogComponent
    // and attach it to the HTML-body. Also, we assign the
    // componentRef to our property.
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
    this.dialogComponentRef = componentRef;

    this.dialogComponentRef.instance.onClose$.subscribe(() => {
      this.removeDialogComponentFromBody();
    });

    // return the dialogRef
    return dialogRef;
  }

  // We also need a way to remove the component once the dialog is closed.
  removeDialogComponentFromBody(): void {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }

  // Now that we are able to add the dialog to the DOM,
  // all we need to do to open the dialog is to call our method.
  // To do that, we define a public method called "open".
  public open(componentType: Type<any>, config: DialogLibConfig): DialogRef {
    // we call our appendDialogComponentToBody-method
    // to open the empty dialog.
    const dialogRef = this.appendDialogComponentToBody(config);

    // Because empty dialogs are quite useless,
    // we will enable our dialog to show any other component, next.
    // Doing that, we will pass the Type of the component we want
    // to spawn inside of our dialog to the services "open"-method.
    this.dialogComponentRef.instance.childComponentType = componentType;

    // Inside of the method, we assign that type
    // to our dynamically created DialogComponent.
    // Of course, our DialogComponent does not know
    // what to do with that type, yet.
    // To change that, we need to modify our dialog
    // to instantiate dynamic components and place them in itself.
    // We need to create a custom directive.

    return dialogRef;
  }
}
