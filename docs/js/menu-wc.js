'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">track-my-playtime documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                            <a href="license.html"
                        data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>LICENSE
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-2ac7e5d484dbae734b9c84efa6353d7d"' : 'data-target="#xs-components-links-module-AppModule-2ac7e5d484dbae734b9c84efa6353d7d"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-2ac7e5d484dbae734b9c84efa6353d7d"' : 'id="xs-components-links-module-AppModule-2ac7e5d484dbae734b9c84efa6353d7d"' }>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/NavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-AppModule-2ac7e5d484dbae734b9c84efa6353d7d"' : 'data-target="#xs-injectables-links-module-AppModule-2ac7e5d484dbae734b9c84efa6353d7d"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-AppModule-2ac7e5d484dbae734b9c84efa6353d7d"' : 'id="xs-injectables-links-module-AppModule-2ac7e5d484dbae734b9c84efa6353d7d"' }>
                                        <li class="link">
                                            <a href="injectables/ElapsedTimeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ElapsedTimeService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AuthModule-6d5d8d652a006b587cc7b08a35e4609b"' : 'data-target="#xs-components-links-module-AuthModule-6d5d8d652a006b587cc7b08a35e4609b"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AuthModule-6d5d8d652a006b587cc7b08a35e4609b"' : 'id="xs-components-links-module-AuthModule-6d5d8d652a006b587cc7b08a35e4609b"' }>
                                        <li class="link">
                                            <a href="components/AuthFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthFormComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ForgotPasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ForgotPasswordComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-AuthModule-6d5d8d652a006b587cc7b08a35e4609b"' : 'data-target="#xs-injectables-links-module-AuthModule-6d5d8d652a006b587cc7b08a35e4609b"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-AuthModule-6d5d8d652a006b587cc7b08a35e4609b"' : 'id="xs-injectables-links-module-AuthModule-6d5d8d652a006b587cc7b08a35e4609b"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AuthService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AuthRoutingModule.html" data-type="entity-link">AuthRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/CompletionModule.html" data-type="entity-link">CompletionModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-CompletionModule-461585bd2b733b3fdffe2c23398206e3"' : 'data-target="#xs-components-links-module-CompletionModule-461585bd2b733b3fdffe2c23398206e3"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-CompletionModule-461585bd2b733b3fdffe2c23398206e3"' : 'id="xs-components-links-module-CompletionModule-461585bd2b733b3fdffe2c23398206e3"' }>
                                        <li class="link">
                                            <a href="components/AddPlayingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddPlayingComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CompletedItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CompletedItemComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CompletionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CompletionComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/PlayingItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlayingItemComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TabsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TabsComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-CompletionModule-461585bd2b733b3fdffe2c23398206e3"' : 'data-target="#xs-injectables-links-module-CompletionModule-461585bd2b733b3fdffe2c23398206e3"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-CompletionModule-461585bd2b733b3fdffe2c23398206e3"' : 'id="xs-injectables-links-module-CompletionModule-461585bd2b733b3fdffe2c23398206e3"' }>
                                        <li class="link">
                                            <a href="injectables/ProgressService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ProgressService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>UserService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/DashboardModule.html" data-type="entity-link">DashboardModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-DashboardModule-28204130a2a10503a826eca9daddec92"' : 'data-target="#xs-components-links-module-DashboardModule-28204130a2a10503a826eca9daddec92"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-DashboardModule-28204130a2a10503a826eca9daddec92"' : 'id="xs-components-links-module-DashboardModule-28204130a2a10503a826eca9daddec92"' }>
                                        <li class="link">
                                            <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/GraphTooltipComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">GraphTooltipComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TimeDateGraphComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TimeDateGraphComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TimeGameGraphComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TimeGameGraphComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TimePlatformGraphComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TimePlatformGraphComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/HomeModule.html" data-type="entity-link">HomeModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-HomeModule-4717e05711501b0094159df947861d0f"' : 'data-target="#xs-components-links-module-HomeModule-4717e05711501b0094159df947861d0f"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-HomeModule-4717e05711501b0094159df947861d0f"' : 'id="xs-components-links-module-HomeModule-4717e05711501b0094159df947861d0f"' }>
                                        <li class="link">
                                            <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/LibraryModule.html" data-type="entity-link">LibraryModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-LibraryModule-46583c5c52539e6d70babc632fc25385"' : 'data-target="#xs-components-links-module-LibraryModule-46583c5c52539e6d70babc632fc25385"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-LibraryModule-46583c5c52539e6d70babc632fc25385"' : 'id="xs-components-links-module-LibraryModule-46583c5c52539e6d70babc632fc25385"' }>
                                        <li class="link">
                                            <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LibraryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LibraryComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ProfileModule.html" data-type="entity-link">ProfileModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ProfileModule-1e8409ad1a7d73f42b3128e3b31097b2"' : 'data-target="#xs-components-links-module-ProfileModule-1e8409ad1a7d73f42b3128e3b31097b2"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ProfileModule-1e8409ad1a7d73f42b3128e3b31097b2"' : 'id="xs-components-links-module-ProfileModule-1e8409ad1a7d73f42b3128e3b31097b2"' }>
                                        <li class="link">
                                            <a href="components/EditDisplayNameComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditDisplayNameComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-ProfileModule-1e8409ad1a7d73f42b3128e3b31097b2"' : 'data-target="#xs-injectables-links-module-ProfileModule-1e8409ad1a7d73f42b3128e3b31097b2"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-ProfileModule-1e8409ad1a7d73f42b3128e3b31097b2"' : 'id="xs-injectables-links-module-ProfileModule-1e8409ad1a7d73f42b3128e3b31097b2"' }>
                                        <li class="link">
                                            <a href="injectables/ProfileService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ProfileService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-SharedModule-98678ed061e0191011b884b29e1c436b"' : 'data-target="#xs-components-links-module-SharedModule-98678ed061e0191011b884b29e1c436b"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-SharedModule-98678ed061e0191011b884b29e1c436b"' : 'id="xs-components-links-module-SharedModule-98678ed061e0191011b884b29e1c436b"' }>
                                        <li class="link">
                                            <a href="components/SpinnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpinnerComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#pipes-links-module-SharedModule-98678ed061e0191011b884b29e1c436b"' : 'data-target="#xs-pipes-links-module-SharedModule-98678ed061e0191011b884b29e1c436b"' }>
                                    <span class="icon ion-md-add"></span>
                                    <span>Pipes</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="pipes-links-module-SharedModule-98678ed061e0191011b884b29e1c436b"' : 'id="xs-pipes-links-module-SharedModule-98678ed061e0191011b884b29e1c436b"' }>
                                        <li class="link">
                                            <a href="pipes/ElapsedTimePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ElapsedTimePipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/PluralizePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PluralizePipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="pipes/TimePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TimePipe</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/TrackerModule.html" data-type="entity-link">TrackerModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-TrackerModule-b609ae89f82192349bcdeaff782babcc"' : 'data-target="#xs-components-links-module-TrackerModule-b609ae89f82192349bcdeaff782babcc"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-TrackerModule-b609ae89f82192349bcdeaff782babcc"' : 'id="xs-components-links-module-TrackerModule-b609ae89f82192349bcdeaff782babcc"' }>
                                        <li class="link">
                                            <a href="components/HistoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HistoryComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HistoryEntryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HistoryEntryComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LoadMoreComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoadMoreComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LockedHistoryEntryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LockedHistoryEntryComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TimerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TimerComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TrackerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TrackerComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-TrackerModule-b609ae89f82192349bcdeaff782babcc"' : 'data-target="#xs-injectables-links-module-TrackerModule-b609ae89f82192349bcdeaff782babcc"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-TrackerModule-b609ae89f82192349bcdeaff782babcc"' : 'id="xs-injectables-links-module-TrackerModule-b609ae89f82192349bcdeaff782babcc"' }>
                                        <li class="link">
                                            <a href="injectables/ElapsedTimeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ElapsedTimeService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HistoryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>HistoryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PlatformsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>PlatformsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TimerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>TimerService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>UserService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#components-links"' : 'data-target="#xs-components-links"' }>
                        <span class="icon ion-md-cog"></span>
                        <span>Components</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/HeaderComponent-1.html" data-type="entity-link">HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent-2.html" data-type="entity-link">HeaderComponent</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/AddNewHistoryItem.html" data-type="entity-link">AddNewHistoryItem</a>
                    </li>
                    <li class="link">
                        <a href="classes/AddNewItem.html" data-type="entity-link">AddNewItem</a>
                    </li>
                    <li class="link">
                        <a href="classes/AddNewProgressItem.html" data-type="entity-link">AddNewProgressItem</a>
                    </li>
                    <li class="link">
                        <a href="classes/Authenticated.html" data-type="entity-link">Authenticated</a>
                    </li>
                    <li class="link">
                        <a href="classes/CancelTimer.html" data-type="entity-link">CancelTimer</a>
                    </li>
                    <li class="link">
                        <a href="classes/CustomRouterStateSerializer.html" data-type="entity-link">CustomRouterStateSerializer</a>
                    </li>
                    <li class="link">
                        <a href="classes/EmailLogin.html" data-type="entity-link">EmailLogin</a>
                    </li>
                    <li class="link">
                        <a href="classes/Error.html" data-type="entity-link">Error</a>
                    </li>
                    <li class="link">
                        <a href="classes/FacebookLogin.html" data-type="entity-link">FacebookLogin</a>
                    </li>
                    <li class="link">
                        <a href="classes/GetUser.html" data-type="entity-link">GetUser</a>
                    </li>
                    <li class="link">
                        <a href="classes/GoogleLogin.html" data-type="entity-link">GoogleLogin</a>
                    </li>
                    <li class="link">
                        <a href="classes/IncrementDaysToShow.html" data-type="entity-link">IncrementDaysToShow</a>
                    </li>
                    <li class="link">
                        <a href="classes/LoadHistoryItems.html" data-type="entity-link">LoadHistoryItems</a>
                    </li>
                    <li class="link">
                        <a href="classes/LoadHistoryItemsSucceeded.html" data-type="entity-link">LoadHistoryItemsSucceeded</a>
                    </li>
                    <li class="link">
                        <a href="classes/LoadItems.html" data-type="entity-link">LoadItems</a>
                    </li>
                    <li class="link">
                        <a href="classes/LoadOptions.html" data-type="entity-link">LoadOptions</a>
                    </li>
                    <li class="link">
                        <a href="classes/LoadOptionsSucceeded.html" data-type="entity-link">LoadOptionsSucceeded</a>
                    </li>
                    <li class="link">
                        <a href="classes/LoadProfile.html" data-type="entity-link">LoadProfile</a>
                    </li>
                    <li class="link">
                        <a href="classes/LoadProfileSucceeded.html" data-type="entity-link">LoadProfileSucceeded</a>
                    </li>
                    <li class="link">
                        <a href="classes/LoadProgressItems.html" data-type="entity-link">LoadProgressItems</a>
                    </li>
                    <li class="link">
                        <a href="classes/LoadProgressItemsSucceeded.html" data-type="entity-link">LoadProgressItemsSucceeded</a>
                    </li>
                    <li class="link">
                        <a href="classes/LoadTimerInfo.html" data-type="entity-link">LoadTimerInfo</a>
                    </li>
                    <li class="link">
                        <a href="classes/Logout.html" data-type="entity-link">Logout</a>
                    </li>
                    <li class="link">
                        <a href="classes/MarkComplete.html" data-type="entity-link">MarkComplete</a>
                    </li>
                    <li class="link">
                        <a href="classes/MarkCompleteSucceeded.html" data-type="entity-link">MarkCompleteSucceeded</a>
                    </li>
                    <li class="link">
                        <a href="classes/NotAuthenticated.html" data-type="entity-link">NotAuthenticated</a>
                    </li>
                    <li class="link">
                        <a href="classes/Remove.html" data-type="entity-link">Remove</a>
                    </li>
                    <li class="link">
                        <a href="classes/RemoveHistoryItem.html" data-type="entity-link">RemoveHistoryItem</a>
                    </li>
                    <li class="link">
                        <a href="classes/RemoveHistoryItemSucceeded.html" data-type="entity-link">RemoveHistoryItemSucceeded</a>
                    </li>
                    <li class="link">
                        <a href="classes/RemoveProgressItem.html" data-type="entity-link">RemoveProgressItem</a>
                    </li>
                    <li class="link">
                        <a href="classes/RemoveProgressItemSucceeded.html" data-type="entity-link">RemoveProgressItemSucceeded</a>
                    </li>
                    <li class="link">
                        <a href="classes/Reset.html" data-type="entity-link">Reset</a>
                    </li>
                    <li class="link">
                        <a href="classes/ResetPassword.html" data-type="entity-link">ResetPassword</a>
                    </li>
                    <li class="link">
                        <a href="classes/ResetTimer.html" data-type="entity-link">ResetTimer</a>
                    </li>
                    <li class="link">
                        <a href="classes/Save.html" data-type="entity-link">Save</a>
                    </li>
                    <li class="link">
                        <a href="classes/SaveSucceeded.html" data-type="entity-link">SaveSucceeded</a>
                    </li>
                    <li class="link">
                        <a href="classes/SaveTimerInfo.html" data-type="entity-link">SaveTimerInfo</a>
                    </li>
                    <li class="link">
                        <a href="classes/SaveTimerInfoSucceeded.html" data-type="entity-link">SaveTimerInfoSucceeded</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetAttemptingLogin.html" data-type="entity-link">SetAttemptingLogin</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetEndTime.html" data-type="entity-link">SetEndTime</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetGame.html" data-type="entity-link">SetGame</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetGame-1.html" data-type="entity-link">SetGame</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetLastMonth.html" data-type="entity-link">SetLastMonth</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetLastWeek.html" data-type="entity-link">SetLastWeek</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetPlatform.html" data-type="entity-link">SetPlatform</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetPlatform-1.html" data-type="entity-link">SetPlatform</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetProfileDisplayName.html" data-type="entity-link">SetProfileDisplayName</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetProfileDisplayNameSucceeded.html" data-type="entity-link">SetProfileDisplayNameSucceeded</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetShowExtra.html" data-type="entity-link">SetShowExtra</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetStartTime.html" data-type="entity-link">SetStartTime</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetStartTime-1.html" data-type="entity-link">SetStartTime</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetThisMonth.html" data-type="entity-link">SetThisMonth</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetThisWeek.html" data-type="entity-link">SetThisWeek</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetTimerInfo.html" data-type="entity-link">SetTimerInfo</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetValidationMessage.html" data-type="entity-link">SetValidationMessage</a>
                    </li>
                    <li class="link">
                        <a href="classes/SetVisibleTab.html" data-type="entity-link">SetVisibleTab</a>
                    </li>
                    <li class="link">
                        <a href="classes/SignUp.html" data-type="entity-link">SignUp</a>
                    </li>
                    <li class="link">
                        <a href="classes/TwitterLogin.html" data-type="entity-link">TwitterLogin</a>
                    </li>
                    <li class="link">
                        <a href="classes/UpdateElapsedTime.html" data-type="entity-link">UpdateElapsedTime</a>
                    </li>
                    <li class="link">
                        <a href="classes/UpdateElapsedTimeSucceeded.html" data-type="entity-link">UpdateElapsedTimeSucceeded</a>
                    </li>
                    <li class="link">
                        <a href="classes/UpdateGame.html" data-type="entity-link">UpdateGame</a>
                    </li>
                    <li class="link">
                        <a href="classes/UpdateGameSucceeded.html" data-type="entity-link">UpdateGameSucceeded</a>
                    </li>
                    <li class="link">
                        <a href="classes/UpdatePlatform.html" data-type="entity-link">UpdatePlatform</a>
                    </li>
                    <li class="link">
                        <a href="classes/UpdatePlatformSucceeded.html" data-type="entity-link">UpdatePlatformSucceeded</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/AddPlayingEffects.html" data-type="entity-link">AddPlayingEffects</a>
                            </li>
                            <li class="link">
                                <a href="injectables/AuthEffects.html" data-type="entity-link">AuthEffects</a>
                            </li>
                            <li class="link">
                                <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ElapsedTimeService.html" data-type="entity-link">ElapsedTimeService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/HistoryEffects.html" data-type="entity-link">HistoryEffects</a>
                            </li>
                            <li class="link">
                                <a href="injectables/HistoryService.html" data-type="entity-link">HistoryService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/PlatformsEffects.html" data-type="entity-link">PlatformsEffects</a>
                            </li>
                            <li class="link">
                                <a href="injectables/PlatformsService.html" data-type="entity-link">PlatformsService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ProfileEffects.html" data-type="entity-link">ProfileEffects</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ProfileService.html" data-type="entity-link">ProfileService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ProgressEffects.html" data-type="entity-link">ProgressEffects</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ProgressService.html" data-type="entity-link">ProgressService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/StatusEffects.html" data-type="entity-link">StatusEffects</a>
                            </li>
                            <li class="link">
                                <a href="injectables/TimerEffects.html" data-type="entity-link">TimerEffects</a>
                            </li>
                            <li class="link">
                                <a href="injectables/TimerService.html" data-type="entity-link">TimerService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/UserEffects.html" data-type="entity-link">UserEffects</a>
                            </li>
                            <li class="link">
                                <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                 ${ isNormalMode ? 'data-target="#guards-links"' : 'data-target="#xs-guards-links"' }>
            <span class="icon ion-ios-lock"></span>
            <span>Guards</span>
            <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
                ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                <li class="link">
                    <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                </li>
            </ul>
            </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/AddPlaying.html" data-type="entity-link">AddPlaying</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/AddPlayingInfo.html" data-type="entity-link">AddPlayingInfo</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/AddTimerInfo.html" data-type="entity-link">AddTimerInfo</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/AuthState.html" data-type="entity-link">AuthState</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/BarGraphConfig.html" data-type="entity-link">BarGraphConfig</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/CompletedDisplayData.html" data-type="entity-link">CompletedDisplayData</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/CompletedItem.html" data-type="entity-link">CompletedItem</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/CompletionState.html" data-type="entity-link">CompletionState</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/DashboardState.html" data-type="entity-link">DashboardState</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Dictionary.html" data-type="entity-link">Dictionary</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/EmailAuthEvent.html" data-type="entity-link">EmailAuthEvent</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Environment.html" data-type="entity-link">Environment</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Error.html" data-type="entity-link">Error</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/FirebaseConfig.html" data-type="entity-link">FirebaseConfig</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/FirestoreHistoryItem.html" data-type="entity-link">FirestoreHistoryItem</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/FirestorePlatformsItem.html" data-type="entity-link">FirestorePlatformsItem</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/FirestoreProfileItem.html" data-type="entity-link">FirestoreProfileItem</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/FirestoreProgressItem.html" data-type="entity-link">FirestoreProgressItem</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/FirestoreTimerItem.html" data-type="entity-link">FirestoreTimerItem</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/GraphConfig.html" data-type="entity-link">GraphConfig</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/GraphDataItem.html" data-type="entity-link">GraphDataItem</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/HistoryCollection.html" data-type="entity-link">HistoryCollection</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/HistoryEntity.html" data-type="entity-link">HistoryEntity</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/HistoryGrouping.html" data-type="entity-link">HistoryGrouping</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/HistoryListItem.html" data-type="entity-link">HistoryListItem</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/IHasId.html" data-type="entity-link">IHasId</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/LibraryEntry.html" data-type="entity-link">LibraryEntry</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MarkCompleteEntity.html" data-type="entity-link">MarkCompleteEntity</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MarkCompleteItem.html" data-type="entity-link">MarkCompleteItem</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MarkCompletePayload.html" data-type="entity-link">MarkCompletePayload</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/NgSelectValue.html" data-type="entity-link">NgSelectValue</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/PieChartConfig.html" data-type="entity-link">PieChartConfig</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/PlayingDisplayData.html" data-type="entity-link">PlayingDisplayData</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Profile.html" data-type="entity-link">Profile</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ProfileState.html" data-type="entity-link">ProfileState</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ProgressCollection.html" data-type="entity-link">ProgressCollection</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ProgressEntity.html" data-type="entity-link">ProgressEntity</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ProgressItem.html" data-type="entity-link">ProgressItem</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/RouteEntry.html" data-type="entity-link">RouteEntry</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/RouterStateUrl.html" data-type="entity-link">RouterStateUrl</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/SharedState.html" data-type="entity-link">SharedState</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-1.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-2.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-3.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-4.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-5.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-6.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-7.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-8.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-9.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-10.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-11.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-12.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-13.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-14.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-15.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-16.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-17.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-18.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/State-19.html" data-type="entity-link">State</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/TimerInfo.html" data-type="entity-link">TimerInfo</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/TrackerState.html" data-type="entity-link">TrackerState</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/UUIDConfig.html" data-type="entity-link">UUIDConfig</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/UpdateHistoryItemGamePayload.html" data-type="entity-link">UpdateHistoryItemGamePayload</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/UpdateHistoryItemPlatformPayload.html" data-type="entity-link">UpdateHistoryItemPlatformPayload</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/UpdateHistoryItemTimesPayload.html" data-type="entity-link">UpdateHistoryItemTimesPayload</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/User.html" data-type="entity-link">User</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/UserInfo.html" data-type="entity-link">UserInfo</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
            <li class="chapter">
                <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
            </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
