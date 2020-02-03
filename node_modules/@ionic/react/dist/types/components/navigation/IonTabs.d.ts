import { JSX as LocalJSX } from '@ionic/core';
import React from 'react';
import { NavContext } from '../../contexts/NavContext';
interface Props extends LocalJSX.IonTabs {
    children: React.ReactNode;
}
export declare class IonTabs extends React.Component<Props> {
    context: React.ContextType<typeof NavContext>;
    routerOutletRef: React.Ref<HTMLIonRouterOutletElement>;
    constructor(props: Props);
    render(): JSX.Element;
    static get contextType(): React.Context<import("../../contexts/NavContext").NavContextState>;
}
export {};
