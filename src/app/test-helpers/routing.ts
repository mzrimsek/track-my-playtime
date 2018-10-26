export namespace routing {
  export class MockRouterStateSnapshot {
    url = 'app';
  }

  export const mockActivatedRoute = {
    snapshot: {
      queryParams: {
        returnUrl: ''
      }
    }
  };

  export const initialRouterState = {
    state: {
      url: '',
      params: {},
      queryParams: {}
    },
    navigationId: 1
  };
}
