import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from '../../features/auth/components/login/login.component';
import { HomeComponent } from '../../features/home/home.component';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        HomeComponent,
        LoginComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: HomeComponent
          },
          {
            path: 'login',
            component: LoginComponent
          }
        ])
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('Banner Link', () => {
    let bannerLink: any;

    beforeEach(async(() => {
      bannerLink = fixture.debugElement.query(By.css('#bannerLink'));
    }));

    it('Should have correct href', async(() => {
      const href = bannerLink.nativeElement.getAttribute('href');
      expect(href).toBe('/');
    }));

    xit('Should navigate to correct location', async(() => {
      bannerLink.nativeElement.click();
      fail();
    }));
  });

  describe('Login Link', () => {
    let loginLink: any;

    beforeEach(async(() => {
      loginLink = fixture.debugElement.query(By.css('#loginLink'));
    }));

    it('Should have correct href', async(() => {
      const href = loginLink.nativeElement.getAttribute('href');
      expect(href).toBe('/login');
    }));

    xit('Should navigate to correct location', async(() => {
      loginLink.nativeElement.click();
      fail();
    }));
  });
});
