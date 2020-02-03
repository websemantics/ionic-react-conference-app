import { RouterDirection } from '@ionic/core';
import { NavContextState } from '@ionic/react';
import { UnregisterCallback } from 'history';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IonRouteAction } from './IonRouteAction';
interface NavManagerProps extends RouteComponentProps {
    onNavigateBack: (defaultHref?: string) => void;
    onNavigate: (ionRouteAction: IonRouteAction, path: string, state?: any) => void;
}
export declare class NavManager extends React.Component<NavManagerProps, NavContextState> {
    listenUnregisterCallback: UnregisterCallback | undefined;
    constructor(props: NavManagerProps);
    componentWillUnmount(): void;
    goBack(defaultHref?: string): void;
    navigate(path: string, direction?: RouterDirection | 'none', ionRouteAction?: IonRouteAction): void;
    getPageManager(): (children: any) => any;
    getStackManager(): (props: any) => JSX.Element;
    render(): JSX.Element;
}
export {};
