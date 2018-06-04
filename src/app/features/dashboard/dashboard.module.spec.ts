import { DashboardModule } from './dashboard.module';

describe('DashboardModule', () => {
  let dashboardModule: DashboardModule;

  beforeEach(() => {
    dashboardModule = new DashboardModule();
  });

  it('Should create an instance', () => {
    expect(dashboardModule).toBeTruthy();
  });
});
