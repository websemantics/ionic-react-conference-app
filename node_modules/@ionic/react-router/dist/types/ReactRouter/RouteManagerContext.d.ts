import React, { ReactNode } from 'react';
import { ViewStacks } from './ViewStacks';
export interface RouteManagerContextState {
    syncView: (page: HTMLElement, viewId: string) => void;
    syncRoute: (id: string, route: any) => void;
    hideView: (viewId: string) => void;
    viewStacks: ViewStacks;
    setupIonRouter: (id: string, children: ReactNode, routerOutlet: HTMLIonRouterOutletElement) => void;
    removeViewStack: (stack: string) => void;
    getRoute: (id: string) => any;
}
export declare const RouteManagerContext: React.Context<RouteManagerContextState>;
