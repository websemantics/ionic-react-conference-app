import { __rest } from 'tslib';
import React from 'react';
import { matchPath, withRouter, BrowserRouter, HashRouter } from 'react-router-dom';
import { NavContext, IonLifeCycleContext, DefaultIonLifeCycleContext, getConfig } from '@ionic/react';
import { matchPath as matchPath$1, MemoryRouter } from 'react-router';

let count = 0;
const generateId = () => (count++).toString();

const isDevMode = () => {
    return process && process.env && process.env.NODE_ENV === 'development';
};

const RESTRICT_SIZE = 25;
class LocationHistory {
    constructor() {
        this.locationHistory = [];
    }
    add(location) {
        this.locationHistory.push(location);
        if (this.locationHistory.length > RESTRICT_SIZE) {
            this.locationHistory.splice(0, 10);
        }
    }
    pop() {
        this.locationHistory.pop();
    }
    replace(location) {
        this.locationHistory.pop();
        this.locationHistory.push(location);
    }
    clear() {
        this.locationHistory = [];
    }
    findLastLocationByUrl(url) {
        for (let i = this.locationHistory.length - 1; i >= 0; i--) {
            const location = this.locationHistory[i];
            if (location.pathname.toLocaleLowerCase() === url.toLocaleLowerCase()) {
                return location;
            }
        }
        return undefined;
    }
    previous() {
        return this.locationHistory[this.locationHistory.length - 2];
    }
    current() {
        return this.locationHistory[this.locationHistory.length - 1];
    }
}

/**
 * The holistic view of all the Routes configured for an application inside of an IonRouterOutlet.
 */
class ViewStacks {
    constructor() {
        this.viewStacks = {};
    }
    get(key) {
        return this.viewStacks[key];
    }
    set(key, viewStack) {
        this.viewStacks[key] = viewStack;
    }
    getKeys() {
        return Object.keys(this.viewStacks);
    }
    delete(key) {
        delete this.viewStacks[key];
    }
    findViewInfoByLocation(location, viewKey) {
        let view;
        let match;
        let viewStack;
        viewStack = this.viewStacks[viewKey];
        if (viewStack) {
            viewStack.views.some(matchView);
            if (!view) {
                viewStack.views.some(r => {
                    // try to find a route that doesn't have a path or from prop, that will be our not found route
                    if (!r.routeData.childProps.path && !r.routeData.childProps.from) {
                        match = {
                            path: location.pathname,
                            url: location.pathname,
                            isExact: true,
                            params: {}
                        };
                        view = r;
                        return true;
                    }
                    return false;
                });
            }
        }
        return { view, viewStack, match };
        function matchView(v) {
            const matchProps = {
                exact: v.routeData.childProps.exact,
                path: v.routeData.childProps.path || v.routeData.childProps.from,
                component: v.routeData.childProps.component
            };
            const myMatch = matchPath(location.pathname, matchProps);
            if (myMatch) {
                view = v;
                match = myMatch;
                return true;
            }
            return false;
        }
    }
    findViewInfoById(id = '') {
        let view;
        let viewStack;
        const keys = this.getKeys();
        keys.some(key => {
            const vs = this.viewStacks[key];
            view = vs.views.find(x => x.id === id);
            if (view) {
                viewStack = vs;
                return true;
            }
            else {
                return false;
            }
        });
        return { view, viewStack };
    }
}

const RouteManagerContext = /*@__PURE__*/ React.createContext({
    viewStacks: new ViewStacks(),
    syncView: () => { navContextNotFoundError(); },
    syncRoute: () => { navContextNotFoundError(); },
    hideView: () => { navContextNotFoundError(); },
    setupIonRouter: () => Promise.reject(navContextNotFoundError()),
    removeViewStack: () => { navContextNotFoundError(); },
    getRoute: () => { navContextNotFoundError(); }
});
function navContextNotFoundError() {
    console.error('IonReactRouter not found, did you add it to the app?');
}

/**
 * The View component helps manage the IonPage's lifecycle and registration
 */
class View extends React.Component {
    componentWillUnmount() {
        if (this.ionPage) {
            this.ionPage.removeEventListener('ionViewWillEnter', this.ionViewWillEnterHandler.bind(this));
            this.ionPage.removeEventListener('ionViewDidEnter', this.ionViewDidEnterHandler.bind(this));
            this.ionPage.removeEventListener('ionViewWillLeave', this.ionViewWillLeaveHandler.bind(this));
            this.ionPage.removeEventListener('ionViewDidLeave', this.ionViewDidLeaveHandler.bind(this));
        }
    }
    ionViewWillEnterHandler() {
        this.context.ionViewWillEnter();
    }
    ionViewDidEnterHandler() {
        this.context.ionViewDidEnter();
    }
    ionViewWillLeaveHandler() {
        this.context.ionViewWillLeave();
    }
    ionViewDidLeaveHandler() {
        this.context.ionViewDidLeave();
    }
    registerIonPage(page) {
        this.ionPage = page;
        this.ionPage.addEventListener('ionViewWillEnter', this.ionViewWillEnterHandler.bind(this));
        this.ionPage.addEventListener('ionViewDidEnter', this.ionViewDidEnterHandler.bind(this));
        this.ionPage.addEventListener('ionViewWillLeave', this.ionViewWillLeaveHandler.bind(this));
        this.ionPage.addEventListener('ionViewDidLeave', this.ionViewDidLeaveHandler.bind(this));
        this.ionPage.classList.add('ion-page-invisible');
        if (isDevMode()) {
            this.ionPage.setAttribute('data-view-id', this.props.view.id);
        }
        this.props.onViewSync(page, this.props.view.id);
    }
    render() {
        return (React.createElement(NavContext.Consumer, null, value => {
            const newProvider = Object.assign(Object.assign({}, value), { registerIonPage: this.registerIonPage.bind(this) });
            return (React.createElement(NavContext.Provider, { value: newProvider }, this.props.children));
        }));
    }
    static get contextType() {
        return IonLifeCycleContext;
    }
}

/**
 * Manages the View's DOM lifetime by keeping it around long enough to complete page transitions before removing it.
 */
class ViewTransitionManager extends React.Component {
    constructor(props) {
        super(props);
        this.ionLifeCycleContext = new DefaultIonLifeCycleContext();
        this._isMounted = false;
        this.state = {
            show: true
        };
        this.ionLifeCycleContext.onComponentCanBeDestroyed(() => {
            if (!this.props.mount) {
                if (this._isMounted) {
                    this.setState({
                        show: false
                    }, () => {
                        this.context.hideView(this.props.id);
                    });
                }
            }
        });
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        const { show } = this.state;
        return (React.createElement(IonLifeCycleContext.Provider, { value: this.ionLifeCycleContext }, show && this.props.children));
    }
    static get contextType() {
        return RouteManagerContext;
    }
}

class StackManagerInner extends React.Component {
    constructor(props) {
        super(props);
        this.routerOutletEl = React.createRef();
        this.id = this.props.id || generateId();
        this.handleViewSync = this.handleViewSync.bind(this);
        this.handleHideView = this.handleHideView.bind(this);
        this.state = {};
    }
    componentDidMount() {
        this.props.routeManager.setupIonRouter(this.id, this.props.children, this.routerOutletEl.current);
    }
    static getDerivedStateFromProps(props, state) {
        props.routeManager.syncRoute('', props.children);
        return state;
    }
    componentWillUnmount() {
        this.props.routeManager.removeViewStack(this.id);
    }
    handleViewSync(page, viewId) {
        this.props.routeManager.syncView(page, viewId);
    }
    handleHideView(viewId) {
        this.props.routeManager.hideView(viewId);
    }
    renderChild(item, route) {
        const component = React.cloneElement(route, {
            computedMatch: item.routeData.match
        });
        return component;
    }
    render() {
        const routeManager = this.props.routeManager;
        const viewStack = routeManager.viewStacks.get(this.id);
        const views = (viewStack || { views: [] }).views.filter(x => x.show);
        const ionRouterOutlet = React.Children.only(this.props.children);
        const childElements = views.map(view => {
            const route = routeManager.getRoute(view.routeId);
            return (React.createElement(ViewTransitionManager, { id: view.id, key: view.key, mount: view.mount },
                React.createElement(View, { onViewSync: this.handleViewSync, onHideView: this.handleHideView, view: view, route: route }, this.renderChild(view, route))));
        });
        const elementProps = {
            ref: this.routerOutletEl
        };
        if (ionRouterOutlet.props.forwardedRef) {
            ionRouterOutlet.props.forwardedRef.current = this.routerOutletEl;
        }
        if (isDevMode()) {
            elementProps['data-stack-id'] = this.id;
        }
        const routerOutletChild = React.cloneElement(ionRouterOutlet, elementProps, childElements);
        return routerOutletChild;
    }
}
const withContext = (Component) => {
    return (props) => (React.createElement(RouteManagerContext.Consumer, null, context => React.createElement(Component, Object.assign({}, props, { routeManager: context }))));
};
const StackManager = withContext(StackManagerInner);

class NavManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goBack: this.goBack.bind(this),
            hasIonicRouter: () => true,
            navigate: this.navigate.bind(this),
            getStackManager: this.getStackManager.bind(this),
            getPageManager: this.getPageManager.bind(this),
            currentPath: this.props.location.pathname,
            registerIonPage: () => { return; } // overridden in View for each IonPage
        };
        this.listenUnregisterCallback = this.props.history.listen((location) => {
            this.setState({
                currentPath: location.pathname
            });
        });
        if (document) {
            document.addEventListener('ionBackButton', (e) => {
                e.detail.register(0, () => {
                    this.props.history.goBack();
                });
            });
        }
    }
    componentWillUnmount() {
        if (this.listenUnregisterCallback) {
            this.listenUnregisterCallback();
        }
    }
    goBack(defaultHref) {
        this.props.onNavigateBack(defaultHref);
    }
    navigate(path, direction, ionRouteAction = 'push') {
        this.props.onNavigate(ionRouteAction, path, direction);
    }
    getPageManager() {
        return (children) => children;
    }
    getStackManager() {
        return StackManager;
    }
    render() {
        return (React.createElement(NavContext.Provider, { value: this.state }, this.props.children));
    }
}

class RouteManager extends React.Component {
    constructor(props) {
        super(props);
        this.locationHistory = new LocationHistory();
        this.routes = {};
        this.ionPageElements = {};
        this.routerOutlets = {};
        this.firstRender = true;
        this.listenUnregisterCallback = this.props.history.listen(this.historyChange.bind(this));
        this.handleNavigate = this.handleNavigate.bind(this);
        this.navigateBack = this.navigateBack.bind(this);
        this.state = {
            viewStacks: new ViewStacks(),
            hideView: this.hideView.bind(this),
            setupIonRouter: this.setupIonRouter.bind(this),
            removeViewStack: this.removeViewStack.bind(this),
            syncView: this.syncView.bind(this),
            syncRoute: this.syncRoute.bind(this),
            getRoute: this.getRoute.bind(this)
        };
        this.locationHistory.add({
            hash: window.location.hash,
            key: generateId(),
            pathname: window.location.pathname,
            search: window.location.search,
            state: {}
        });
    }
    componentDidUpdate(_prevProps, prevState) {
        // Trigger a page change if the location or action is different
        if (this.state.location && prevState.location !== this.state.location || prevState.action !== this.state.action) {
            const viewStacks = Object.assign(new ViewStacks(), this.state.viewStacks);
            this.setActiveView(this.state.location, this.state.action, viewStacks);
        }
    }
    componentWillUnmount() {
        if (this.listenUnregisterCallback) {
            this.listenUnregisterCallback();
        }
    }
    getRoute(id) {
        return this.routes[id];
    }
    hideView(viewId) {
        const viewStacks = Object.assign(new ViewStacks(), this.state.viewStacks);
        const { view } = viewStacks.findViewInfoById(viewId);
        if (view) {
            view.show = false;
            view.isIonRoute = false;
            view.prevId = undefined;
            view.key = generateId();
            delete this.ionPageElements[view.id];
            this.setState({
                viewStacks
            });
        }
    }
    historyChange(location, action) {
        const ionRouteAction = this.currentIonRouteAction === 'pop' ? 'pop' : action.toLowerCase();
        let direction = this.currentRouteDirection;
        if (ionRouteAction === 'push') {
            this.locationHistory.add(location);
        }
        else if (ionRouteAction === 'pop') {
            this.locationHistory.pop();
            direction = direction || 'back';
        }
        else if (ionRouteAction === 'replace') {
            this.locationHistory.replace(location);
            direction = 'none';
        }
        if (direction === 'root') {
            this.locationHistory.clear();
            this.locationHistory.add(location);
        }
        location.state = location.state || { direction };
        this.setState({
            location,
            action: ionRouteAction
        });
        this.currentRouteDirection = undefined;
        this.currentIonRouteAction = undefined;
    }
    setActiveView(location, action, viewStacks) {
        let direction = (location.state && location.state.direction) || 'forward';
        let leavingView;
        const viewStackKeys = viewStacks.getKeys();
        let shouldTransitionPage = false;
        let leavingViewHtml;
        viewStackKeys.forEach(key => {
            const { view: enteringView, viewStack: enteringViewStack, match } = viewStacks.findViewInfoByLocation(location, key);
            if (!enteringView || !enteringViewStack) {
                return;
            }
            leavingView = viewStacks.findViewInfoById(this.activeIonPageId).view;
            if (enteringView.isIonRoute) {
                enteringView.show = true;
                enteringView.mount = true;
                enteringView.routeData.match = match;
                shouldTransitionPage = true;
                this.activeIonPageId = enteringView.id;
                if (leavingView) {
                    if (action === 'push' && direction === 'forward') {
                        /**
                         * If the page is being pushed into the stack by another view,
                         * record the view that originally directed to the new view for back button purposes.
                         */
                        enteringView.prevId = leavingView.id;
                    }
                    else {
                        leavingView.mount = false;
                        this.removeOrphanedViews(enteringView, enteringViewStack);
                    }
                    leavingViewHtml = enteringView.id === leavingView.id ? this.ionPageElements[leavingView.id].outerHTML : undefined;
                }
                else {
                    // If there is not a leavingView, then we shouldn't provide a direction
                    direction = undefined;
                }
            }
            else {
                enteringView.show = true;
                enteringView.mount = true;
                enteringView.routeData.match = match;
            }
        });
        if (leavingView) {
            if (!leavingView.isIonRoute) {
                leavingView.mount = false;
                leavingView.show = false;
            }
        }
        this.setState({
            viewStacks
        }, () => {
            if (shouldTransitionPage) {
                const { view: enteringView, viewStack } = this.state.viewStacks.findViewInfoById(this.activeIonPageId);
                if (enteringView && viewStack) {
                    const enteringEl = this.ionPageElements[enteringView.id];
                    const leavingEl = leavingView && this.ionPageElements[leavingView.id];
                    if (enteringEl) {
                        let navDirection;
                        if (leavingEl && leavingEl.innerHTML === '') {
                            // Don't animate from an empty view
                            navDirection = undefined;
                        }
                        else if (direction === 'none' || direction === 'root') {
                            navDirection = undefined;
                        }
                        else {
                            navDirection = direction;
                        }
                        const shouldGoBack = !!enteringView.prevId;
                        const routerOutlet = this.routerOutlets[viewStack.id];
                        this.commitView(enteringEl, leavingEl, routerOutlet, navDirection, shouldGoBack, leavingViewHtml);
                    }
                    else if (leavingEl) {
                        leavingEl.classList.add('ion-page-hidden');
                        leavingEl.setAttribute('aria-hidden', 'true');
                    }
                }
                // Warn if an IonPage was not eventually rendered in Dev Mode
                if (isDevMode()) {
                    if (enteringView && enteringView.routeData.match.url !== location.pathname) {
                        setTimeout(() => {
                            const { view } = this.state.viewStacks.findViewInfoById(this.activeIonPageId);
                            if (view.routeData.match.url !== location.pathname) {
                                console.warn('No IonPage was found to render. Make sure you wrap your page with an IonPage component.');
                            }
                        }, 100);
                    }
                }
            }
        });
    }
    removeOrphanedViews(view, viewStack) {
        // Note: This technique is a bit wonky for views that reference each other and get into a circular loop.
        // It can still remove a view that probably shouldn't be.
        const viewsToRemove = viewStack.views.filter(v => v.prevId === view.id);
        viewsToRemove.forEach(v => {
            // Don't remove if view is currently active
            if (v.id !== this.activeIonPageId) {
                this.removeOrphanedViews(v, viewStack);
                // If view is not currently visible, go ahead and remove it from DOM
                const page = this.ionPageElements[v.id];
                if (page.classList.contains('ion-page-hidden')) {
                    v.show = false;
                    v.isIonRoute = false;
                    v.prevId = undefined;
                    v.key = generateId();
                    delete this.ionPageElements[v.id];
                }
                v.mount = false;
            }
        });
    }
    setupIonRouter(id, children, routerOutlet) {
        const views = [];
        let activeId;
        const ionRouterOutlet = React.Children.only(children);
        let foundMatch = false;
        React.Children.forEach(ionRouterOutlet.props.children, (child) => {
            const routeId = generateId();
            this.routes[routeId] = child;
            views.push(createViewItem(child, routeId, this.props.history.location));
        });
        if (!foundMatch) {
            const notFoundRoute = views.find(r => {
                // try to find a route that doesn't have a path or from prop, that will be our not found route
                return !r.routeData.childProps.path && !r.routeData.childProps.from;
            });
            if (notFoundRoute) {
                notFoundRoute.show = true;
            }
        }
        this.registerViewStack(id, activeId, views, routerOutlet, this.props.location);
        function createViewItem(child, routeId, location) {
            const viewId = generateId();
            const key = generateId();
            // const route = child;
            const matchProps = {
                exact: child.props.exact,
                path: child.props.path || child.props.from,
                component: child.props.component
            };
            const match = matchPath(location.pathname, matchProps);
            const view = {
                id: viewId,
                key,
                routeData: {
                    match,
                    childProps: child.props
                },
                routeId,
                mount: true,
                show: !!match,
                isIonRoute: false
            };
            if (match && view.isIonRoute) {
                activeId = viewId;
            }
            if (!foundMatch && match) {
                foundMatch = true;
            }
            return view;
        }
    }
    registerViewStack(stack, activeId, stackItems, routerOutlet, _location) {
        this.setState(prevState => {
            const prevViewStacks = Object.assign(new ViewStacks(), prevState.viewStacks);
            const newStack = {
                id: stack,
                views: stackItems
            };
            this.routerOutlets[stack] = routerOutlet;
            if (activeId) {
                this.activeIonPageId = activeId;
            }
            prevViewStacks.set(stack, newStack);
            return {
                viewStacks: prevViewStacks
            };
        }, () => {
            this.setupRouterOutlet(routerOutlet);
        });
    }
    async setupRouterOutlet(routerOutlet) {
        const canStart = () => {
            const config = getConfig();
            const swipeEnabled = config && config.get('swipeBackEnabled', routerOutlet.mode === 'ios');
            if (swipeEnabled) {
                const { view } = this.state.viewStacks.findViewInfoById(this.activeIonPageId);
                return !!(view && view.prevId);
            }
            else {
                return false;
            }
        };
        const onStart = () => {
            this.navigateBack();
        };
        routerOutlet.swipeHandler = {
            canStart,
            onStart,
            onEnd: _shouldContinue => true
        };
    }
    removeViewStack(stack) {
        const viewStacks = Object.assign(new ViewStacks(), this.state.viewStacks);
        viewStacks.delete(stack);
        this.setState({
            viewStacks
        });
    }
    syncView(page, viewId) {
        const viewStacks = Object.assign(new ViewStacks(), this.state.viewStacks);
        const { view } = viewStacks.findViewInfoById(viewId);
        if (view) {
            view.isIonRoute = true;
            this.ionPageElements[view.id] = page;
            this.setActiveView(this.state.location || this.props.location, this.state.action, viewStacks);
        }
    }
    syncRoute(_id, routerOutlet) {
        const ionRouterOutlet = React.Children.only(routerOutlet);
        React.Children.forEach(ionRouterOutlet.props.children, (child) => {
            for (const routeKey in this.routes) {
                const route = this.routes[routeKey];
                if (typeof route.props.path !== 'undefined' && route.props.path === (child.props.path || child.props.from)) {
                    this.routes[routeKey] = child;
                }
            }
        });
    }
    async commitView(enteringEl, leavingEl, ionRouterOutlet, direction, showGoBack, leavingViewHtml) {
        if (!this.firstRender) {
            if (!('componentOnReady' in ionRouterOutlet)) {
                await waitUntilRouterOutletReady(ionRouterOutlet);
            }
            if ((enteringEl === leavingEl) && direction && leavingViewHtml) {
                // If a page is transitioning to another version of itself
                // we clone it so we can have an animation to show
                const newLeavingElement = clonePageElement(leavingViewHtml);
                ionRouterOutlet.appendChild(newLeavingElement);
                await ionRouterOutlet.commit(enteringEl, newLeavingElement, {
                    deepWait: true,
                    duration: direction === undefined ? 0 : undefined,
                    direction,
                    showGoBack,
                    progressAnimation: false
                });
                ionRouterOutlet.removeChild(newLeavingElement);
            }
            else {
                await ionRouterOutlet.commit(enteringEl, leavingEl, {
                    deepWait: true,
                    duration: direction === undefined ? 0 : undefined,
                    direction,
                    showGoBack,
                    progressAnimation: false
                });
            }
            if (leavingEl && (enteringEl !== leavingEl)) {
                /** add hidden attributes */
                leavingEl.classList.add('ion-page-hidden');
                leavingEl.setAttribute('aria-hidden', 'true');
            }
        }
        else {
            enteringEl.classList.remove('ion-page-invisible');
            enteringEl.style.zIndex = '101';
            enteringEl.dispatchEvent(new Event('ionViewWillEnter'));
            enteringEl.dispatchEvent(new Event('ionViewDidEnter'));
            this.firstRender = false;
        }
    }
    handleNavigate(ionRouteAction, path, direction) {
        this.currentIonRouteAction = ionRouteAction;
        switch (ionRouteAction) {
            case 'push':
                this.currentRouteDirection = direction;
                this.props.history.push(path);
                break;
            case 'pop':
                this.currentRouteDirection = direction || 'back';
                this.props.history.replace(path);
                break;
            case 'replace':
                this.currentRouteDirection = 'none';
                this.props.history.replace(path);
                break;
        }
    }
    navigateBack(defaultHref) {
        const { view: leavingView } = this.state.viewStacks.findViewInfoById(this.activeIonPageId);
        if (leavingView) {
            if (leavingView.id === leavingView.prevId) {
                const previousLocation = this.locationHistory.previous();
                if (previousLocation) {
                    this.handleNavigate('pop', previousLocation.pathname + previousLocation.search);
                }
                else {
                    defaultHref && this.handleNavigate('pop', defaultHref);
                }
            }
            else {
                const { view: enteringView } = this.state.viewStacks.findViewInfoById(leavingView.prevId);
                if (enteringView) {
                    const lastLocation = this.locationHistory.findLastLocationByUrl(enteringView.routeData.match.url);
                    if (lastLocation) {
                        this.handleNavigate('pop', lastLocation.pathname + lastLocation.search);
                    }
                    else {
                        this.handleNavigate('pop', enteringView.routeData.match.url);
                    }
                }
                else {
                    const currentLocation = this.locationHistory.previous();
                    if (currentLocation) {
                        this.handleNavigate('pop', currentLocation.pathname + currentLocation.search);
                    }
                    else {
                        if (defaultHref) {
                            this.handleNavigate('pop', defaultHref);
                        }
                    }
                }
            }
        }
        else {
            if (defaultHref) {
                this.handleNavigate('replace', defaultHref, 'back');
            }
        }
    }
    render() {
        return (React.createElement(RouteManagerContext.Provider, { value: this.state },
            React.createElement(NavManager, Object.assign({}, this.props, { onNavigateBack: this.navigateBack, onNavigate: this.handleNavigate }), this.props.children)));
    }
}
function clonePageElement(leavingViewHtml) {
    const newEl = document.createElement('div');
    newEl.innerHTML = leavingViewHtml;
    newEl.classList.add('ion-page-hidden');
    newEl.style.zIndex = '';
    // Remove an existing back button so the new element doesn't get two of them
    const ionBackButton = newEl.getElementsByTagName('ion-back-button');
    if (ionBackButton[0]) {
        ionBackButton[0].innerHTML = '';
    }
    return newEl.firstChild;
}
async function waitUntilRouterOutletReady(ionRouterOutlet) {
    if ('componentOnReady' in ionRouterOutlet) {
        return;
    }
    else {
        setTimeout(() => {
            waitUntilRouterOutletReady(ionRouterOutlet);
        }, 0);
    }
}
const RouteManagerWithRouter = withRouter(RouteManager);
RouteManagerWithRouter.displayName = 'RouteManager';

class IonReactRouter extends React.Component {
    render() {
        const _a = this.props, { children } = _a, props = __rest(_a, ["children"]);
        return (React.createElement(BrowserRouter, Object.assign({}, props),
            React.createElement(RouteManagerWithRouter, null, children)));
    }
}

class IonReactHashRouter extends React.Component {
    render() {
        const _a = this.props, { children } = _a, props = __rest(_a, ["children"]);
        return (React.createElement(HashRouter, Object.assign({}, props),
            React.createElement(RouteManagerWithRouter, null, children)));
    }
}

class IonReactMemoryRouter extends React.Component {
    render() {
        const _a = this.props, { children, history } = _a, props = __rest(_a, ["children", "history"]);
        const match = matchPath$1(history.location.pathname, this.props);
        return (React.createElement(MemoryRouter, Object.assign({}, props),
            React.createElement(RouteManager, { history: history, location: history.location, match: match }, children)));
    }
}

export { IonReactHashRouter, IonReactMemoryRouter, IonReactRouter };
//# sourceMappingURL=index.esm.js.map
