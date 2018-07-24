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
}
