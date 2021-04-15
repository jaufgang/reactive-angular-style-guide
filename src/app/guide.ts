export const guide = [{
  title: 'Functional Reactive Angular Style Guide',
  discussion: `This is an opinionated guide for developing Angular apps using a fully reactive pattern for components.
By "Fully Reactive", we mean that
All state properties are stored as observables.
Since all properties are observable those properties are always bound to component templates using the async pipe
Subscribing to observable values is avoided as much as possible.
All components use OnPush change detection.
Benefits include
Automatically avoid potential pitfalls of using OnPush change detection.
Cleaner, more maintainable code.
The structure of this guide was inspired by and modelled after the Angular Style Guide by John Papa`,
  sections: [{
    title: "Local State for Component",
    discussion: `This section of the style guide describes a pattern for ComponentStore to be used as a backing store for individual components. The store is local to each component and is not shared between components. This pattern is basically a variant of the Model-View-Controller pattern that has been tailored to work with Angular and NgRx ComponentStore.

Using this pattern, it's helpful to think of the store as an integral part of each component, even though the store is implemented as an external provider. The store is where component state is held, along with some functions to facilitate writing to and reading from the store. This usage is outlined in the NgRx Component store documentation page ComponentStore as part of the component.

It is important to note that in this pattern, the store for each component does not hold the view model for each component, although they are closely related. In this pattern, the store holds only the independent state properties, basically the core set of state values that are acquired from component inputs, injected providers, user interactions through event handlers, etc.

In addition to the independent state held in the store, derived or dependent state properties are declared as observables in the component using ComponentStore selector functions. These selectors implement projector functions to combine state properties from the store and business logic to output these derived state properties.

As a final step, the store and all derived state observables are combined into a View Model observable named "vm$" that is consumed by the component template. The "vm$" observable should hold all data needed by the component template. This allows the template to subscribe to view model at the component root using a single "async" pipe.

The recommendation of this guide is that this pattern should be used consistently for every smart component in an application. Dumb, or purely presentational components that only use input and output properties to communicate with the app (i.e. do not inject other services in the constructor) and implement little business logic can do not need to use this pattern and can use non-observable component properties.`,
    rules: [{
      title: "ComponentStore as a backing store for each (smart) component",
      do: [
        "use ComponentStore as part of the component to manage local state for every component",
        "remember to inject ComponentStore into the Providers array",
        "set change detection strategy to ChangeDetectionStrategy.OnPush,",
        "initialize the store by calling store.setState() with default values in the first line of code in the constructor body"
      ],
      why: ["Putting ComponentStore in the Providers array ensures that each instance of the component receives it's own instance of ComponentStore",
        "It is necessary to initialize the store before updating the state, otherwise an error would be thrown."],
      "sidebar": "Omitting `ComponentStore` from the Providers array will inject a shared store, which will not throw an error but can result in behaviour that can be difficult to debug",
      codeSamples: [{
        "fileName": "foo.component.ts",
        "avoid": false,
        "code": "\n@Component({\n  selector: 'foo',\n  providers: [ComponentStore],\n  changeDetection: ChangeDetectionStrategy.OnPush,\n})\nexport class FooComponent {\n\n constructor(\npublic  store: ComponentStore<FooComponentState>,\n ){\nthis.store.setState({\n  //...\n})\n}\n}"
      }]
    }, {
      "title": "Consolidate all independent state in component store",
      "do": [
        "declare a component state interface for each component",
        "include fields for every independent state property"
      ],
      "avoid": [
        "including fields for state properties that can be derived from other independent state properties"
      ],
      "why": [
        "The component state should reflect the set of properties necessary and sufficient for computing an required derived state",
        "derived state properties can be computed from independent properties using selectors instead of placing them in the store"
      ],
      discussion: `Independent state here means any state property that cannot be derived from other state properties. This includes, but is not limited to Properties set by user interaction via event handlers called from component templates
Properties acquired from external sources via injected providers
Properties acquired from parent components via @Input() parameters`,
      codeSamples: [{
        "fileName": "foo.component.ts",
        "code": "interface FooComponentState {\n  foo: string;\n  bar: string;\n}\n\nconst InitialFooComponentState = {\n  foo: \"\",\n  bar: \"\",\n};\n\n@Component({\n  selector: \"app-foo\",\n  providers: [ComponentStore],\n})\nexport class FooComponent {\n  constructor(private store: ComponentStore<FooComponentState>) {\n    this.store.setState(InitialFooComponentState);\n  }\n}"
      }]
    }, {
      "title": "Inputs",
      "do": [
        "Declare a setter function for each component Input, prefixed with the @Input() decorator",
        "Add input values to the store using the patchState function in each setter"
      ],
      codeSamples: [{
        "fileName": "foo.component.ts",
        "code": "@Component()\nexport class FooComponent {\n\n  @Input() \nset foo(foo: string) {\n    this.store.patchState({ foo });\n  }\n\n  constructor(public store: ComponentStore<FooComponentState>) {}\n\n}"
      }, {
        "fileName": "foo.component.ts",
        "avoid": true,
        "code": "/* avoid */\n@Component()\nexport class FooComponent {\n\n  @Input() foo: string\n\n}"
      }]
    }, {
      "title": "Values acquired from services",
      "do": [
        "Bind state values acquired from services to the local store using patchState in the constructor"
      ],
      codeSamples: [{
        "fileName": "foo.component.ts",
        "code": "@Component()\nexport class FooComponent {\n\n constructor(\npublic  store: ComponentStore<FooComponentState>,\npublic barService: BarService\n ){\nthis.store.patchState(\n{bar: this.barService.getBar()}\n)\n}}"
      }, {
        "fileName": "foo.component.ts",
        "avoid": true,
        "code": "/* avoid */\n\n@Component()\nexport class FooComponent {\n\n bar: string;\n\n  constructor(\n    public barService: BarService\n  ) {\n    this.bar=this.barService.getBar();\n  }\n}"
      }]
    }, {
      "title": "Derived state as observables using selectors",
      "do": [
        "declare derived state properties using selector functions ",
        "use only state properties selected from the store or other derived state observables as sources for derived state selectors"
      ],
      "avoid": [
        "using values not in the component state  or completely derived from component state  as sources for derived state selectors"
      ],
      "sidebar": "These code examples use nested calls to `this.store.select()`. It should be possible to simplify this syntax and remove the nested calls after a requested API change to allow `this.store.select()`to accept multiple selector functions as arguments. This will hopefully be hopefully available soon in an upcoming release.\n\nSee: https://github.com/ngrx/platform/issues/2839",
      codeSamples: [{
        "fileName": "foo.component.ts",
        "code": "interface FooComponentState {\n  foo: string;\n  bar: string;\n}\n\nconst InitialFooComponentState = {\n  foo: undefined,\n  bar: undefined\n};\n\ninterface FooComponentViewModel extends FooComponentState {\n  fooBar: string;\n}\n\n@Component({\n  selector: \"app-foo\",\n  templateUrl: \"./foo.component.html\",\n  styleUrls: [\"./foo.component.css\"],\n  providers: [ComponentStore]\n})\nexport class FooComponent {\n\n// fooBar$ is an observable derived state property, dependent on state.foo and state.bar \n  readonly fooBar$: Observable<string> = this.store.select(\n    this.store.select(state => state.foo),\n    this.store.select(state => state.bar),\n    (foo, bar) => `${foo}, ${bar}`\n  );\n\n\n  constructor(private store: ComponentStore<FooComponentState>) {\n    this.store.setState(InitialFooComponentState);\n  }\n\n}\n"
      }, {
        "fileName": "foo.component.ts",
        "avoid": true,
        "code": "/* avoid */\n\ninterface FooComponentState {\n  foo: string;\n}\n\nconst InitialFooComponentState = {\n  foo: undefined\n};\n\ninterface FooComponentViewModel extends FooComponentState {\n  fooBar: string;\n}\n\n@Component({\n  selector: \"app-foo\",\n  templateUrl: \"./foo.component.html\",\n  styleUrls: [\"./foo.component.css\"],\n  providers: [ComponentStore]\n})\nexport class FooComponent {\n  readonly fooBar$: Observable<string> = this.store.select(\n    this.store.select(state => state.foo),\n    this.barService.bar$, // bar$ is not derived  from the component state and should not be used in the selector.\n    (foo, bar) => `${foo}, ${bar}`\n  );\n\n  readonly vm$ = combineLatest([this.store.state$, this.fooBar$]).pipe(\n    map(([state, fooBar]) => ({\n      ...state,\n      fooBar\n    }))\n  );\n\n  constructor(\n    private barService: BarService,\n    private store: ComponentStore<FooComponentState>\n  ) {\n    this.store.setState(InitialFooComponentState);\n  }\n}\n"
      }]
    }, {
      "title": "View Model",
      "do": [
        "Compose all state values used by the component template into a single observable named vm$"
      ],
      "sidebar": "This pattern was taken from a talk on <a href=\"https://www.youtube.com/watch?v=Z76QlSpYcck\" target=\"_blank\">Data Composition with RxJS</a>\n delivered at NG-Conf 2019 by Deborah Kurata.  It is highly worth watching.",
      codeSamples: [{
        "fileName": "foo.component.ts",
        "code": "interface FooComponentState {\n  foo: string;\n  bar: string;\n}\n\nconst InitialFooComponentState = {\n  foo: undefined,\n  bar: undefined,\n};\n\ninterface FooComponentViewModel extends FooComponentState {\n  fooBar: string;\n}\n\n@Component({\n  selector: \"app-foo\",\n  providers: [ComponentStore],\n})\nexport class FooComponent {\n  readonly fooBar$: Observable<string> = this.store.select(\n    this.store.select((state) => state.foo),\n    this.store.select((state) => state.bar),\n    (foo, bar) => `${foo}, ${bar}`\n  );\n\n readonly vm$ = combineLatest([this.store.state$, this.fooBar$]).pipe(\n    map(([state, fooBar]) => ({\n      ...state,\n      fooBar\n    }))\n  );\n\n  constructor(private store: ComponentStore<FooComponentState>) {\n    this.store.setState(InitialFooComponentState);\n  }\n}"
      }]
    }, {
      "title": "Single async pipe ",
      "do": [
        "Subscribe the template to the view model observable with a single async pipe at the component root"
      ],
      "avoid": [
        "using multiple async pipes in a component"
      ],
      "why": [
        "Using only a single async pipe improves performance and reduces component complexity"
      ],
      codeSamples: [{
        "fileName": "foo.component.html",
        "code": "<ng-container *ngIf=\"vm$ | async as vm\">\n  <div>{{vm.foo}}</div>\n  <div>{{vm.bar}}</div>\n</ng-container>"
      }]
    }, {
      "title": "Avoid subscribing to observables in components as much as possible"
    }]
  }, {
    title: "Shared state using service extending ComponentStore",
    sections: [{
      "title": "Use a service extending ComponentStore for shared state"
    }, {
      "title": "Continue to use @ngrx/store to manage global application state"
    }]
  }]
}];