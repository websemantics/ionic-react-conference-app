import { JSX as LocalJSX } from '@ionic/core';
import React from 'react';
declare type Props = LocalJSX.IonTabBar & {
    onIonTabsDidChange?: (event: CustomEvent<{
        tab: string;
    }>) => void;
    onIonTabsWillChange?: (event: CustomEvent<{
        tab: string;
    }>) => void;
    currentPath?: string;
    slot?: 'bottom' | 'top';
};
export declare const IonTabBar: React.FC<Props>;
export {};
