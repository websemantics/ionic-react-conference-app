import React from 'react';
import { RouteManagerContext } from './RouteManagerContext';
interface ViewTransitionManagerProps {
    id: string;
    mount: boolean;
}
interface ViewTransitionManagerState {
    show: boolean;
}
/**
 * Manages the View's DOM lifetime by keeping it around long enough to complete page transitions before removing it.
 */
export declare class ViewTransitionManager extends React.Component<ViewTransitionManagerProps, ViewTransitionManagerState> {
    ionLifeCycleContext: {
        ionViewWillEnterCallbacks: import("@ionic/react").LifeCycleCallback[];
        ionViewDidEnterCallbacks: import("@ionic/react").LifeCycleCallback[];
        ionViewWillLeaveCallbacks: import("@ionic/react").LifeCycleCallback[];
        ionViewDidLeaveCallbacks: import("@ionic/react").LifeCycleCallback[];
        componentCanBeDestroyedCallback?: (() => void) | undefined;
        onIonViewWillEnter(callback: import("@ionic/react").LifeCycleCallback): void;
        ionViewWillEnter(): void;
        onIonViewDidEnter(callback: import("@ionic/react").LifeCycleCallback): void;
        ionViewDidEnter(): void;
        onIonViewWillLeave(callback: import("@ionic/react").LifeCycleCallback): void;
        ionViewWillLeave(): void;
        onIonViewDidLeave(callback: import("@ionic/react").LifeCycleCallback): void;
        ionViewDidLeave(): void;
        onComponentCanBeDestroyed(callback: () => void): void;
        componentCanBeDestroyed(): void;
    };
    _isMounted: boolean;
    context: React.ContextType<typeof RouteManagerContext>;
    constructor(props: ViewTransitionManagerProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    static get contextType(): React.Context<import("./RouteManagerContext").RouteManagerContextState>;
}
export {};
