import { MemoryHistory } from 'history';
import React from 'react';
import { MemoryRouterProps } from 'react-router';
import { LocationState } from './Router';
interface IonReactMemoryRouterProps extends MemoryRouterProps {
    history: MemoryHistory<LocationState>;
}
export declare class IonReactMemoryRouter extends React.Component<IonReactMemoryRouterProps> {
    render(): JSX.Element;
}
export {};
