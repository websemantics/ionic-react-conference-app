import { Location as HistoryLocation } from 'history';
export declare class LocationHistory {
    private locationHistory;
    add(location: HistoryLocation): void;
    pop(): void;
    replace(location: HistoryLocation): void;
    clear(): void;
    findLastLocationByUrl(url: string): HistoryLocation<{} | null | undefined> | undefined;
    previous(): HistoryLocation<{} | null | undefined>;
    current(): HistoryLocation<{} | null | undefined>;
}
