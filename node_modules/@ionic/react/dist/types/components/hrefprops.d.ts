export declare type RouterDirection = 'forward' | 'back' | 'root' | 'none';
export declare type HrefProps<T> = Omit<T, 'routerDirection'> & {
    routerLink?: string;
    routerDirection?: RouterDirection;
};
