import { RouterDirection } from '@ionic/react';
import { Action as HistoryAction, Location as HistoryLocation, UnregisterCallback } from 'history';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { LocationHistory } from '../utils/LocationHistory';
import { IonRouteAction } from './IonRouteAction';
import { RouteManagerContextState } from './RouteManagerContext';
import { ViewItem } from './ViewItem';
import { ViewStack, ViewStacks } from './ViewStacks';
export interface LocationState {
    direction?: RouterDirection;
    action?: IonRouteAction;
}
interface RouteManagerProps extends RouteComponentProps<{}, {}, LocationState> {
    location: HistoryLocation<LocationState>;
}
interface RouteManagerState extends RouteManagerContextState {
    location?: HistoryLocation<LocationState>;
    action?: IonRouteAction;
}
export declare class RouteManager extends React.Component<RouteManagerProps, RouteManagerState> {
    listenUnregisterCallback: UnregisterCallback | undefined;
    activeIonPageId?: string;
    currentIonRouteAction?: IonRouteAction;
    currentRouteDirection?: RouterDirection;
    locationHistory: LocationHistory;
    routes: {
        [key: string]: React.ReactElement<any>;
    };
    ionPageElements: {
        [key: string]: HTMLElement;
    };
    routerOutlets: {
        [key: string]: HTMLIonRouterOutletElement;
    };
    firstRender: boolean;
    constructor(props: RouteManagerProps);
    componentDidUpdate(_prevProps: RouteComponentProps, prevState: RouteManagerState): void;
    componentWillUnmount(): void;
    getRoute(id: string): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
    hideView(viewId: string): void;
    historyChange(location: HistoryLocation<LocationState>, action: HistoryAction): void;
    setActiveView(location: HistoryLocation<LocationState>, action: IonRouteAction, viewStacks: ViewStacks): void;
    removeOrphanedViews(view: ViewItem, viewStack: ViewStack): void;
    setupIonRouter(id: string, children: any, routerOutlet: HTMLIonRouterOutletElement): void;
    registerViewStack(stack: string, activeId: string | undefined, stackItems: ViewItem[], routerOutlet: HTMLIonRouterOutletElement, _location: HistoryLocation): void;
    setupRouterOutlet(routerOutlet: HTMLIonRouterOutletElement): Promise<void>;
    removeViewStack(stack: string): void;
    syncView(page: HTMLElement, viewId: string): void;
    syncRoute(_id: string, routerOutlet: any): void;
    private commitView;
    handleNavigate(ionRouteAction: IonRouteAction, path: string, direction?: RouterDirection): void;
    navigateBack(defaultHref?: string): void;
    render(): JSX.Element;
}
export declare const RouteManagerWithRouter: React.ComponentClass<Pick<RouteManagerProps, never>, any> & import("react-router").WithRouterStatics<typeof RouteManager>;
export {};
