import { Location as HistoryLocation } from 'history';
import { IonRouteData } from './IonRouteData';
import { ViewItem } from './ViewItem';
export interface ViewStack {
    id: string;
    views: ViewItem[];
}
/**
 * The holistic view of all the Routes configured for an application inside of an IonRouterOutlet.
 */
export declare class ViewStacks {
    private viewStacks;
    get(key: string): ViewStack | undefined;
    set(key: string, viewStack: ViewStack): void;
    getKeys(): string[];
    delete(key: string): void;
    findViewInfoByLocation(location: HistoryLocation, viewKey: string): {
        view: ViewItem<IonRouteData> | undefined;
        viewStack: ViewStack | undefined;
        match: import("react-router").match<{}> | null | undefined;
    };
    findViewInfoById(id?: string): {
        view: ViewItem<IonRouteData> | undefined;
        viewStack: ViewStack | undefined;
    };
}
