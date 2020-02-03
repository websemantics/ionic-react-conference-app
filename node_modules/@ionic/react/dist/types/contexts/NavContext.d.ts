import { RouterDirection } from '@ionic/core';
import React from 'react';
export interface NavContextState {
    getPageManager: () => any;
    getStackManager: () => any;
    goBack: (defaultHref?: string) => void;
    navigate: (path: string, direction?: RouterDirection | 'none', ionRouteAction?: 'push' | 'replace' | 'pop') => void;
    hasIonicRouter: () => boolean;
    registerIonPage: (page: HTMLElement) => void;
    currentPath: string | undefined;
}
export declare const NavContext: React.Context<NavContextState>;
